#!/usr/bin/env python3
"""Product-page photos for the ESP shop, made with Printful's mockup generator.

Companion to pf-sync.py. For every product in src/components/shop/merch.ts it
reads the store product's own print files and options (same file, placement,
thread colour, stitch colour), asks the mockup generator for a plain view and
a model/lifestyle view where the catalogue has one, then saves a small WebP
gallery to public/shop/pf/{pid}-{n}.webp and writes `gallery` and `details`
(from scripts/merch-details.json) into merch.ts. Designs and prices are never
changed and no order is created.

  PRINTFUL_EXTREME_TOKEN=... python3 scripts/pf-mockups.py            # generate + build
  python3 scripts/pf-mockups.py --build-only                          # reuse cached tasks

Env: PRINTFUL_EXTREME_TOKEN (or PRINTFUL_API_TOKEN), PF_STORE_ID (default 18950600).
The token is only ever sent in the Authorization header; it is never printed.
Task results are cached in $PF_CACHE (default /tmp/pf-mockups) so reruns only
fetch what is missing. 429s are waited out using Retry-After.
"""
import io, json, os, re, sys, time, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MERCH = os.path.join(ROOT, "src/components/shop/merch.ts")
OUT = os.path.join(ROOT, "public/shop/pf")
DETAILS = os.path.join(ROOT, "scripts/merch-details.json")
CACHE = os.environ.get("PF_CACHE", "/tmp/pf-mockups")
STORE = os.environ.get("PF_STORE_ID", "18950600")
MAX_PHOTOS = 5
LAYERS_NOT_LIFESTYLE = {"iPhone Tough Case", "Samsung Tough Case"}

PLAIN = ["Ghost", "Flat", "Default", "Flat 2"]
MODEL = ["Men's", "Women's", "Boy's", "Girl's", "Men's ", "Men's Lifestyle", "Women's Lifestyle", "Boy's Lifestyle",
         "Girl's Lifestyle", "Lifestyle", "Flat Lifestyle", "Folded Lifestyle", "Beach"]
VIEWS = ["Front", "Back", "Left", "Right", "Left Front", "Right Front", "Left Side", "Front 2", "Default", "Lifestyle", "Lifestyle 1", "Lifestyle 2", "Lifestyle 3", "Handle on Left", "Handle on Right", "default", "Beach", "Flat"]


def api(method, path, body=None):
    tok = os.environ.get("PRINTFUL_EXTREME_TOKEN") or os.environ.get("PRINTFUL_API_TOKEN")
    if not tok:
        sys.exit("Set PRINTFUL_EXTREME_TOKEN (or use --build-only).")
    for _ in range(30):
        req = urllib.request.Request(
            "https://api.printful.com" + path, method=method,
            data=json.dumps(body).encode() if body is not None else None,
            headers={"Authorization": "Bearer " + tok, "X-PF-Store-Id": STORE,
                     "Content-Type": "application/json", "User-Agent": "esp-pf-mockups"})
        try:
            return json.load(urllib.request.urlopen(req, timeout=60))["result"]
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = int(e.headers.get("Retry-After") or 30)
                print(f"  rate limited, waiting {wait}s", flush=True)
                time.sleep(wait)
                continue
            raise RuntimeError(f"{e.code} {e.read().decode()[:300]}")
    raise RuntimeError("gave up after repeated 429s")


def load_merch():
    s = open(MERCH).read()
    a = s.index("= [", s.index("export const merch")) + 2
    b = s.index("];", a) + 1
    return s, a, b, json.loads(s[a:b])


def meta_for(pid):
    r = api("GET", f"/store/products/{pid}")
    sv = r["sync_variants"][0]
    files = {f["type"]: {"url": f["url"], "w": f["width"], "h": f["height"]} for f in sv["files"] if f["type"] != "preview"}
    return {"name": r["sync_product"]["name"], "product_id": sv["product"]["product_id"],
            "variant_ids": [sv["variant_id"]], "files": files, "options": sv.get("options") or []}


def solid(url):
    from PIL import Image
    raw = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "esp-pf-mockups"}), timeout=60).read()
    im = Image.open(io.BytesIO(raw))
    return im.mode in ("RGB", "L", "P") and len(im.convert("RGB").resize((64, 64)).getcolors(4096) or [0, 0]) == 1


def plan(m):
    c = m["product_id"]
    emb = any(k.startswith("embroidery") for k in m["files"]) or any(o["id"] == "embroidery_type" for o in m["options"])
    tech = "EMBROIDERY" if emb else None
    pf = api("GET", f"/mockup-generator/printfiles/{c}" + (f"?technique={tech}" if tech else ""))
    need = [t if t in pf["available_placements"] else ("front" if t == "default" else t) for t in m["files"]]
    if not tech and any(n not in pf["available_placements"] for n in need):
        tech = "EMBROIDERY"
        pf = api("GET", f"/mockup-generator/printfiles/{c}?technique=EMBROIDERY")
    groups, opts = pf.get("option_groups") or [], pf.get("options") or []
    plain = next((g for g in PLAIN if g in groups), None)
    model = next((g for g in MODEL if g in groups), None)
    files, po = [], {}
    vp = next(x for x in pf["variant_printfiles"] if x["variant_id"] == m["variant_ids"][0])["placements"]
    pfd = {x["printfile_id"]: x for x in pf["printfiles"]}
    for t, f in m["files"].items():
        pl = t if t in pf["available_placements"] else ("front" if t == "default" else t)
        if pl not in pf["available_placements"]:
            for alt in ("embroidery_" + pl, "embroidery_front", "embroidery_apparel_front"):
                if alt in pf["available_placements"]:
                    pl = alt
                    break
        if pl not in vp:
            raise RuntimeError(f"placement {pl} not available")
        aw, ah = pfd[vp[pl]]["width"], pfd[vp[pl]]["height"]
        # The store keeps no explicit position, so use Printful's default: the file is fitted and
        # centred in its area. Plain one-colour panel fills (bag sides, straps) cover the whole panel.
        fit = max if (f["w"], f["h"]) != (aw, ah) and solid(f["url"]) else min
        sc = fit(aw / f["w"], ah / f["h"])
        w, h = round(f["w"] * sc), round(f["h"] * sc)
        files.append({"placement": pl, "image_url": f["url"],
                      "position": {"area_width": aw, "area_height": ah, "width": w, "height": h, "top": (ah - h) // 2, "left": (aw - w) // 2}})
    for o in m["options"]:
        if o["value"] and (o["id"].startswith("thread_colors") or o["id"] in ("stitch_color", "custom_border_color")):
            po[o["id"]] = o["value"]
    body = {"variant_ids": m["variant_ids"], "format": "jpg", "width": 1200, "files": files,
            "option_groups": [g for g in (plain, model) if g], "options": [o for o in VIEWS if o in opts]}
    if tech:
        body["technique"] = tech
    if po:
        body["product_options"] = po
    return body, (plain, model)


def generate(pid):
    out = os.path.join(CACHE, f"mock-{pid}.json")
    if os.path.exists(out):
        return json.load(open(out))
    m = meta_for(pid)
    body, info = plan(m)
    key = api("POST", f"/mockup-generator/create-task/{m['product_id']}", body)["task_key"]
    for _ in range(60):
        time.sleep(6)
        r = api("GET", f"/mockup-generator/task?task_key={key}")
        if r["status"] != "pending":
            break
    if r["status"] != "completed":
        raise RuntimeError(f"task {r['status']}: {r.get('error')}")
    r["_info"] = info
    json.dump(r, open(out, "w"))
    return r


def pick(r):
    """Main design view first, then model shots, then back/side views. Returns [(url, kind, view)]."""
    mk = r["mockups"][0]
    extra = [e for x in r["mockups"] for e in x.get("extra", [])]
    if "_info" not in r:
        gs = {e["option_group"] for e in extra}
        r["_info"] = (next((g for g in PLAIN if g in gs), None), next((g for g in MODEL if g in gs), None))
    plain, model = r["_info"]
    design = "Left" if "left" in mk["placement"] and "chest" not in mk["placement"] else "Front"
    got, seen = [(mk["mockup_url"], "plain", design)], set()
    def add(g, view, kind):
        for e in extra:
            if e["option_group"] == g and e["option"] == view and (g, view) not in seen:
                seen.add((g, view)); got.append((e["url"], kind, view)); return True
        return False
    seen.add((plain, design))
    if model:
        for v in [design, "Left Front", "Right Front", "Front", "Back"]:
            if sum(k == "model" for _, k, _ in got) >= 2: break
            add(model, v, "model")
        for e in extra:  # lifestyle groups whose views have other names ("Lifestyle 1", ...)
            if sum(k == "model" for _, k, _ in got) >= 2: break
            if e["option_group"] == model: add(model, e["option"], "model")
    for v in ["Back", "Left Front", "Right Front", "Left", "Right", "Left Side", "Front 2", "Handle on Left", "Handle on Right", "Front"]:
        if len(got) >= MAX_PHOTOS: break
        add(plain, v, "plain")
    return got[:MAX_PHOTOS]


def webp(url, dest):
    from PIL import Image
    raw = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "esp-pf-mockups"}), timeout=60).read()
    im = Image.open(io.BytesIO(raw)).convert("RGB")
    im.thumbnail((1000, 1000), Image.LANCZOS)
    im.save(dest, "WEBP", quality=78, method=6)


def alt_for(name, kind, view, group):
    v = {"Front": "front", "Back": "back", "Left": "left side", "Right": "right side", "Left Front": "three-quarter view",
         "Right Front": "three-quarter view", "Left Side": "side", "Front 2": "front", "Handle on Left": "handle on the left",
         "Handle on Right": "handle on the right", "default": "front", "Default": "front"}.get(view, "")
    if kind == "layers":
        return f"ESP {name} in black with the mountain logo, showing the case's layers"
    how = ("worn" if group and "Lifestyle" not in group and group not in ("Beach",) else "in use") if kind == "model" else ""
    bits = ", ".join(x for x in (how, v) if x) or "front"
    return f"ESP {name} in black with the mountain logo, {bits}"


def main():
    build_only = "--build-only" in sys.argv
    os.makedirs(CACHE, exist_ok=True)
    s, a, b, items = load_merch()
    details = json.load(open(DETAILS))
    report = []
    for p in items:
        pid = p["pid"]
        try:
            r = json.load(open(os.path.join(CACHE, f"mock-{pid}.json"))) if build_only else generate(pid)
        except Exception as e:
            print(f"{pid} {p['name']}: {e}", flush=True)
            continue
        photos = pick(r)
        if p["name"] in LAYERS_NOT_LIFESTYLE:  # this "Lifestyle" template only shows the case's layers
            photos = [(u, "layers" if k == "model" else k, v) for u, k, v in photos]
        gal = []
        for n, (url, kind, view) in enumerate(photos, 1):
            dest = os.path.join(OUT, f"{pid}-{n}.webp")
            if not os.path.exists(dest):
                webp(url, dest)
            gal.append({"src": f"/shop/pf/{pid}-{n}.webp", "alt": alt_for(p["name"], kind, view, r["_info"][1])})
        p["gallery"] = gal
        if p["name"] in details:
            p["details"] = details[p["name"]]
        kinds = [k for _, k, _ in photos]
        report.append((p["name"], r["_info"], len(gal), "model" in kinds))
        print(f"{pid} {p['name']}: {len(gal)} photos, model={'model' in kinds} groups={r['_info']}", flush=True)
    body = json.dumps(items, indent=1, ensure_ascii=False)
    open(MERCH, "w").write(s[:a] + body + s[b:])
    print(f"\n{sum(x[3] for x in report)}/{len(items)} with a model or lifestyle photo")
    for name, info, n, has in report:
        if not has:
            print(f"  no model: {name} ({n} photos, plain group {info[0]!r})")


if __name__ == "__main__":
    main()
