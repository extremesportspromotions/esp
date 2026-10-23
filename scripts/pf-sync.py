"""Rebuilds src/components/shop/merch.ts ids and prices from the shop store.
Usage: PF_STORE_ID=18950600 python3 scripts/pf-sync.py  (then set PRINTFUL_STORE_ID=18950600 in Vercel)
Keeps the names, categories and images already in merch.ts; matches products by
store product name and variants by catalogue variant id. Never prints the token."""
import json,os,re,sys,time,urllib.request,urllib.error
T=os.environ.get('PRINTFUL_EXTREME_TOKEN') or os.environ['PRINTFUL_API_TOKEN']; S=os.environ.get('PF_STORE_ID','18943759')
def g(p):
    for _ in range(10):
        try:
            r=urllib.request.Request('https://api.printful.com'+p,headers={'Authorization':'Bearer '+T,'X-PF-Store-Id':S,'User-Agent':'esp-sync'})
            return json.load(urllib.request.urlopen(r))['result']
        except urllib.error.HTTPError as e:
            if e.code==429: time.sleep(15); continue
            raise
def full(store):
    global S; old=S; S=store
    out={}
    for p in g('/store/products?limit=100'):
        d=g(f"/store/products/{p['id']}"); out[p['name']]=d
    S=old; return out
path='src/components/shop/merch.ts'; src=open(path).read()
a=src.index('= [',src.index('export const merch'))+2; b=src.rindex(']')+1
cur=json.loads(src[a:b])
src_store=os.environ.get('PF_FROM_STORE','18943759')
oldnames={d['sync_product']['id']:n for n,d in full(src_store).items()}
new=full(S); changes=0
for m in cur:
    name=oldnames.get(m['pid']) or next(n for n,d in new.items() if d['sync_product']['id']==m['pid'])
    d=new[name]; byvid={v['variant_id']:v for v in d['sync_variants']}
    assert len(byvid)==len(m['variants']),name
    m['pid']=d['sync_product']['id']
    for v in m['variants']:
        sv=byvid[v['vid']]; p=round(float(sv['retail_price'])*100)
        if p!=v['pence']: changes+=1
        v['id']=sv['id']; v['pence']=p
        if sv.get('availability_status') not in (None,'active'): v['oos']=True
        else: v.pop('oos',None)
assert len(cur)==37==len(new)
open(path,'w').write(src[:a]+json.dumps(cur,indent=1,ensure_ascii=False)+src[b:])
print('store',S,'products',len(cur),'price changes',changes)
