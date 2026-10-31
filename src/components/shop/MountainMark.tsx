import Image from "next/image";

/** Devonshire stag mark (public/brand/stag-navy.jpg, background matches the #0E2141 tiles). */
export default function MountainMark({ sizes = "160px" }: { sizes?: string }) {
  return <Image src="/brand/stag-navy.jpg" alt="" width={200} height={262} sizes={sizes} className="h-auto w-[34%] select-none" draggable={false} />;
}
