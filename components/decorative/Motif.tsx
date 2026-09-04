import Image from "next/image";
import clsx from "clsx";

export function Motif({
  src,
  size = 80,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={clsx("pointer-events-none select-none", className)}
      style={{ width: size, height: "auto" }}
    />
  );
}
