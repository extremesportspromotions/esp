import glob, os, numpy as np
from PIL import Image
from scipy import ndimage
SRC='/home/box/agent-data/shared/esp/smart-casual-2026-10/'
OUT='/tmp/espsc/public/shop/sc/'
names={'henbury-oxford':'oxford-shirt','premier-quarterzip':'quarter-zip-knit','cardigan':'cardigan','gilet':'softshell-gilet','chinos':'chinos'}
for f in sorted(glob.glob(SRC+'mockup-*.png')):
    if 'v2' in f: continue
    b=os.path.basename(f)[7:-4]
    g=next(k for k in names if b.startswith(k)); col=b[len(g)+1:]
    im=Image.open(f).convert('RGBA'); bg=Image.new('RGBA',im.size,'white'); bg.alpha_composite(im); im=bg.convert('RGB')
    a=np.asarray(im).astype(int); H,W,_=a.shape
    shot = W>=1000
    x0,x1,y0,y1 = (int(.12*W),int(.45*W),int(.3*H),int(.8*H)) if shot else (int(.1*W),int(.995*W),int(.08*H),int(.9*H))
    sub=a[y0:y1,x0:x1]
    mask=(255-sub.min(axis=2))>35
    mask=ndimage.binary_closing(mask,iterations=2)
    lab,n=ndimage.label(mask)
    sizes=ndimage.sum(mask,lab,range(1,n+1))
    k=int(np.argmax(sizes))+1
    ys,xs=np.where(lab==k)
    bx0,bx1,by0,by1=xs.min()+x0,xs.max()+x0,ys.min()+y0,ys.max()+y0
    crop=im.crop((bx0,by0,bx1+1,by1+1))
    # mask out anything not in the component (UI bits inside the box)
    m=Image.fromarray(((lab[by0-y0:by1-y0+1,bx0-x0:bx1-x0+1]==k)*255).astype('uint8'))
    m=Image.fromarray(ndimage.binary_fill_holes(np.asarray(m)>0).astype('uint8')*255)
    white=Image.new('RGB',crop.size,'white'); crop=Image.composite(crop,white,m)
    side=int(max(crop.size)*1.12)
    sq=Image.new('RGB',(side,side),'white'); sq.paste(crop,((side-crop.size[0])//2,(side-crop.size[1])//2))
    tgt=min(800,max(side,600)); sq=sq.resize((tgt,tgt),Image.LANCZOS)
    out=f"{OUT}{names[g]}-{col}.webp"; sq.save(out,'WEBP',quality=84)
    print(out, crop.size, '->', tgt)
