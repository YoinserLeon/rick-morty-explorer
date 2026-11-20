import Link from "next/link";

/** Renderizo el emblema tipográfico que identifica el explorador. */
export function PixelLogo() {
  return (
    <Link href="/" aria-label="Rick and Morty Explorer, inicio" className="brand-mark">
      <span className="brand-mark__top">RICK <i>&</i> MORTY</span>
      <span className="brand-mark__bottom">EXPLORER // C-137</span>
    </Link>
  );
}
