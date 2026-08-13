// Klasyczny "grainy noise" recipe: feTurbulence -> odsycenie (saturate 0) ->
// feColorMatrix zerujący RGB i zostawiający tylko alfę (ostatni wiersz macierzy
// "0 0 0 1 0" = A_out = A_in). Efekt: czarny szum o zmiennej przezroczystości,
// który pod mix-blend-soft-light naturalnie przyciemnia tło (czarny w soft-light
// zawsze przyciemnia) — bez potrzeby feSpecular/feDiffuseLighting.
const noiseSvg =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 788.48 788.48' width='788.48' height='788.48'>` +
  `<filter id='n' x='0' y='0' width='100%' height='100%'>` +
  `<feTurbulence type='turbulence' baseFrequency='0.5' numOctaves='5' seed='0' stitchTiles='stitch' result='noise'/>` +
  `<feColorMatrix type='saturate' values='0' in='noise' result='gray'/>` +
  `<feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0' in='gray'/>` +
  `</filter>` +
  `<rect width='788.48' height='788.48' filter='url(#n)'/>` +
  `</svg>`;

export const noiseBackgroundImage =
  `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`;
