import Image from "next/image";

/** Mountain logo cut from the cap photo (public/shop/mountain-mark.png, 320x163, transparent). */
export default function MountainMark({ sizes = "160px" }: { sizes?: string }) {
  return <Image src="/shop/mountain-mark.png" alt="" width={320} height={163} sizes={sizes} className="h-auto w-[55%] select-none" draggable={false} />;
}
