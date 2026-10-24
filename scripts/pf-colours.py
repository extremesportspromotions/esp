"""Adds the dark colours of each shop product as extra Printful sync variants, and lists them in merch.ts.

Usage (PRINTFUL_EXTREME_TOKEN in the environment; never printed):
  python3 scripts/pf-colours.py            # collect catalogue data and print the plan (no changes)
  python3 scripts/pf-colours.py --apply    # add the planned colours as new sync variants (only adds, never edits or deletes)
  python3 scripts/pf-colours.py --merch    # write colour, variant ids and swatches into merch.ts
Then run scripts/pf-mockups.py --colours for the per-colour photos.

A colour is added for a size only when it is the same catalogue product as the black one, costs the same
at that size (UK prices, same technique), is in stock for UK delivery, and is dark enough for the
silver-grey (#96A1A8) logo thread: contrast >= 4.0, or 3.9-4.0 for muted charcoal/heather/grey tones, never bright
royal blues, and not the few that looked borderline in their mockups (BORDERLINE).
Each new variant copies the black variant's files (by library file id), options and retail price."""
import collections, json, os, re, sys, time, urllib.error, urllib.request

STORE = "18950600"
TOKEN = os.environ["PRINTFUL_EXTREME_TOKEN"]
CACHE = os.environ.get("PF_CACHE", "/tmp/pfc")
MERCH = os.path.join(os.path.dirname(__file__), "..", "src", "components", "shop", "merch.ts")
THREAD = "#96A1A8"
BRIGHT = re.compile(r"royal", re.I)
# Checked by eye on the mockups: the grey logo is too faint on these mid-grey heathers.
BORDERLINE = {("Zip Hoodie", "Dark Heather")}
MUTED = re.compile(r"charcoal|heather|grey|gray|coal|graphite|maroon|forest|brown|burgundy|chocolate", re.I)


def api(method, path, body=None):
    for _ in range(20):
        req = urllib.request.Request("https://api.printful.com" + path, method=method,
                                     data=json.dumps(body).encode() if body is not None else None,
                                     headers={"Authorization": "Bearer " + TOKEN, "X-PF-Store-Id": STORE,
                                              "Content-Type": "application/json", "User-Agent": "esp-pf-colours"})
        try:
            return json.load(urllib.request.urlopen(req, timeout=60))
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(int(e.headers.get("Retry-After") or 30)); continue
            raise RuntimeError(f"{method} {path}: {e.code} {e.read().decode()[:300]}")
    raise RuntimeError("rate limited")


def pages(path):
    res, off = [], 0
    while True:
        r = api("GET", f"{path}{'&' if '?' in path else '?'}limit=100&offset={off}")
        d = r["data"]; res += d if isinstance(d, list) else [d]
        if not r.get("paging") or off + 100 >= r["paging"]["total"]:
            return res
        off += 100


def collect():
    out_path = os.path.join(CACHE, "colours.json")
    if os.path.exists(out_path):
        return json.load(open(out_path))
    out = {}
    for sp in api("GET", "/store/products?limit=100")["result"]:
        pid = str(sp["id"])
        sv = api("GET", f"/v2/sync-products/{pid}/sync-variants?limit=100")["data"]
        c = api("GET", f"/store/products/{pid}")["result"]["sync_variants"][0]["product"]["product_id"]
        v1 = api("GET", f"/products/{c}")["result"]
        pr, off = {}, 0
        while True:
            r = api("GET", f"/v2/catalog-products/{c}/prices?currency=GBP&selling_region_name=uk&limit=100&offset={off}")
            for v in r["data"]["variants"]:
                for t in v["techniques"]:
                    pr.setdefault(v["id"], {})[t["technique_key"]] = float(t["price"])
            if off + 100 >= (r.get("paging") or {}).get("total", 0): break
            off += 100
        av = {a["catalog_variant_id"]: {t["technique"]: t["selling_regions"][0]["availability"] for t in a["techniques"]}
              for a in pages(f"/v2/catalog-products/{c}/availability?selling_region_name=uk")}
        out[pid] = {"name": sp["name"], "catalog": c, "tech": sv[0]["placements"][0]["technique"],
                    "mine": {str(v["catalog_variant_id"]): {"sync_id": v["id"], "retail": v["retail_price"]} for v in sv},
                    "variants": {str(v["id"]): {"color": v["color"], "hex": v["color_code"], "hex2": v.get("color_code2"), "size": v["size"],
                                                "regions": {x["region"]: x["status"] for x in v.get("availability_status", [])},
                                                "price": pr.get(v["id"], {}), "uk": av.get(v["id"], {})} for v in v1["variants"]}}
    os.makedirs(CACHE, exist_ok=True)
    json.dump(out, open(out_path, "w"))
    return out


def lum(h):
    c = [int(h.lstrip("#")[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def contrast(h):
    a, b = sorted((lum(h), lum(THREAD)), reverse=True)
    return (a + 0.05) / (b + 0.05)


def make_plan(D):
    plan = {}
    for pid, p in D.items():
        V, tech = p["variants"], p["tech"]
        mine = {V[k]["size"]: V[k] | {"vid": int(k)} for k in p["mine"]}
        keys = {k for v in V.values() for k in v["price"]}
        tk = tech if tech in keys else (next(iter(keys)) if len(keys) == 1 else tech.split("-")[0])
        def ukok(v):
            t = tech if tech in v["uk"] else next(iter(v["uk"]), None)
            return v["uk"].get(t) == "in stock"
        blacks = {v["color"] for v in mine.values()}
        bregions = {r for v in mine.values() for r, s in v["regions"].items() if s == "in_stock"}
        bycol = collections.defaultdict(dict)
        for k, v in V.items():
            if v["color"] not in blacks:
                bycol[(v["color"], v["hex"], v["hex2"])][v["size"]] = v | {"vid": int(k)}
        black = next(iter(mine.values()))
        add, skip = [], []
        for (col, hx, hx2), sizes in sorted(bycol.items(), key=lambda x: -min(contrast(x[0][1]), contrast(x[0][2]) if x[0][2] else 99)):
            cr = round(min(contrast(hx), contrast(hx2) if hx2 else 99), 2)
            short = p["name"].replace("ESP Mountain ", "").replace(" – Black", "")
            if BRIGHT.search(col):
                skip.append({"color": col, "why": f"bright royal blue, not a dark colour (contrast {cr})"}); continue
            if (short, col) in BORDERLINE:
                skip.append({"color": col, "why": f"borderline: the logo looks faint on it in the mockup (contrast {cr})"}); continue
            dark = cr >= 4.0 or (cr >= 3.9 and MUTED.search(col))
            if not dark:
                skip.append({"color": col, "why": f"too light or bright for the silver-grey thread (contrast {cr})" if cr < 3.0
                             else f"borderline for the silver-grey thread (contrast {cr})"}); continue
            ok, left, regdiff = {}, [], set()
            for s, bv in mine.items():
                v = sizes.get(s)
                if not v: left.append(f"{s}: not made in this colour"); continue
                if v["price"].get(tk) != bv["price"].get(tk):
                    left.append(f"{s}: base cost £{v['price'].get(tk):.2f} vs black £{bv['price'].get(tk):.2f}"); continue
                if not ukok(v): left.append(f"{s}: not in stock for UK delivery"); continue
                r = {x for x, st in v["regions"].items() if st == "in_stock"}
                if r != bregions:
                    regdiff.add(("+" + "+".join(sorted(r - bregions)) if r - bregions else "") + ("-" + "-".join(sorted(bregions - r)) if bregions - r else ""))
                ok[s] = v["vid"]
            if not ok:
                skip.append({"color": col, "why": "; ".join(sorted(set(re.sub(r"^[^:]+: ", "", x) for x in left)))}); continue
            add.append({"color": col, "hex": hx, "contrast": cr, "vids": ok, "left_out": left, "regdiff": sorted(regdiff),
                        "uk_lost": "UK" in bregions and any("-UK" in d for d in regdiff)})
        plan[pid] = {"name": p["name"], "black": black["color"], "black_hex": black["hex"], "sizes": list(mine),
                     "regions": sorted(bregions), "add": add, "skip": skip}
    return plan


def apply(plan):
    made = 0
    for pid, p in plan.items():
        if not p["add"]: continue
        sp = api("GET", f"/store/products/{pid}")["result"]
        have = {v["variant_id"] for v in sp["sync_variants"]}
        bysize = {v["size"]: v for v in sp["sync_variants"]}
        for a in p["add"]:
            for size, vid in a["vids"].items():
                if vid in have: continue
                b = bysize[size]
                body = {"variant_id": vid, "retail_price": b["retail_price"],
                        "files": [{"type": f["type"], "id": f["id"]} for f in b["files"] if f["type"] != "preview"],
                        "options": [o for o in b.get("options") or [] if o["value"] not in ([], None, "")]}
                r = None
                for _ in range(3):
                    try:
                        r = api("POST", f"/store/products/{pid}/variants", body)["result"]; break
                    except RuntimeError as e:
                        # The store lists embroidered placements as "left", "default" etc.; adding needs the full name.
                        allowed = re.findall(r"embroidery_\w+", str(e).split("Allowed file types")[-1]) if "Incorrect file type" in str(e) else []
                        if "option is missing or incorrect" not in str(e) and not allowed: raise
                        for f in body["files"]:
                            if f["type"].startswith("embroidery_") and f["type"] not in allowed and allowed:
                                f["type"] = allowed[0]
                            elif not f["type"].startswith("embroidery_"):
                                f["type"] = "embroidery_" + f["type"]
                if r is None: raise RuntimeError(f"could not add {a['color']} {size} to {p['name']}")
                made += 1
                print(f"  + {p['name']}: {a['color']} {size} -> sync variant {r['id']} at £{b['retail_price']}", flush=True)
    print("new sync variants:", made)


def write_merch(plan):
    s = open(MERCH).read()
    a = s.index("= [", s.index("export const merch")) + 2
    b = s.index("];", a) + 1
    items = json.loads(s[a:b])
    for m in items:
        p = plan.get(str(m["pid"]))
        if not p or not p["add"]:
            for v in m["variants"]: v.pop("color", None)
            m.pop("colors", None); continue
        sp = api("GET", f"/store/products/{m['pid']}")["result"]["sync_variants"]
        byvid = {v["variant_id"]: v for v in sp}
        old = {c["name"]: c for c in m.get("colors", [])}
        variants = [dict(v, color=p["black"]) for v in m["variants"] if not v.get("color") or v["color"] == p["black"]]
        blacks = {byvid[v["vid"]]["size"]: v for v in variants}
        colors = [{"name": p["black"], "hex": p["black_hex"], "gallery": []}]
        for c in p["add"]:
            vs = [(s_, vid) for s_, vid in c["vids"].items() if vid in byvid]
            vs.sort(key=lambda x: list(blacks).index(x[0]))
            if not vs: continue
            colors.append({"name": c["color"], "hex": c["hex"], "gallery": old.get(c["color"], {}).get("gallery", [])})
            for size, vid in vs:
                sv = byvid[vid]
                black = blacks[size]
                v = {"id": sv["id"], "vid": vid, "label": black["label"], "pence": round(float(sv["retail_price"]) * 100), "color": c["color"]}
                assert v["pence"] == black["pence"], (m["name"], c["color"], size)
                if sv.get("availability_status") not in (None, "active"): v["oos"] = True
                variants.append(v)
        m["variants"], m["colors"] = variants, colors
    open(MERCH, "w").write(s[:a] + json.dumps(items, indent=1, ensure_ascii=False) + s[b:])
    print("merch.ts:", sum(max(len(m.get("colors", [])) - 1, 0) for m in items), "extra colours,", sum(len(m["variants"]) for m in items), "variants")


if __name__ == "__main__":
    plan = make_plan(collect())
    json.dump(plan, open(os.path.join(CACHE, "plan.json"), "w"), indent=1, ensure_ascii=False)
    if "--apply" in sys.argv: apply(plan)
    elif "--merch" in sys.argv: write_merch(plan)
    else:
        for pid, p in plan.items():
            print(f"{p['name']}: +" + (", ".join(f"{a['color']} ({len(a['vids'])}/{len(p['sizes'])})" for a in p["add"]) or "none"))
