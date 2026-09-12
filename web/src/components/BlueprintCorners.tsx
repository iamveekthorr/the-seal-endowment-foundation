/*
 * Registration-mark corner ticks (STYLE-GUIDE.md §5 Components — Blueprint
 * frame). The mockup (`Seals Endowment Foundation.dc.html`) references these
 * via a `<i class="corner tl|tr|bl|br">` marker, but its actual visual style
 * lives in an external stylesheet (`_ds/industry-.../styles.css`) that was
 * never exported alongside the mockup — it isn't present anywhere in the
 * project folder, so the real corner-mark design can't be recovered from
 * what we have.
 *
 * A prior best-guess reconstruction (a small crosshair built from CSS
 * pseudo-elements) rendered as a literal "+" glyph poking out of every
 * `.blueprint` box across the site, which read as broken UI rather than a
 * subtle registration mark. Per instruction, this now renders nothing —
 * the plain `.blueprint` hairline border/box stands on its own — until the
 * real corner-mark style is available (e.g. the missing stylesheet, or a
 * fresh screenshot/export of a mockup card showing the marks up close).
 */
export function BlueprintCorners(_props: { reduced?: boolean; top?: boolean; dark?: boolean }) {
  return null
}
