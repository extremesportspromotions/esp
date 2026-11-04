/**
 * Shared page scroll lock for the product view and the photo viewer.
 * Counted, so the page unlocks only when the last open layer closes, whatever order they close in.
 * (Each layer used to save and restore body overflow itself. Closing the product view with the
 * phone back button while a photo was enlarged restored them in the wrong order and left the
 * page stuck unscrollable.)
 */
let count = 0;
let saved = { overflow: "", paddingRight: "" };

export function lockScroll(): () => void {
  if (count === 0) {
    const b = document.body.style;
    saved = { overflow: b.overflow, paddingRight: b.paddingRight };
    const bar = window.innerWidth - document.documentElement.clientWidth;
    b.overflow = "hidden";
    if (bar > 0) b.paddingRight = `${bar}px`; // no layout shift on desktop
  }
  count++;
  let done = false;
  return () => {
    if (done) return;
    done = true;
    count = Math.max(0, count - 1);
    if (count === 0) {
      document.body.style.overflow = saved.overflow;
      document.body.style.paddingRight = saved.paddingRight;
    }
  };
}
