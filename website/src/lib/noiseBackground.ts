const noiseSvg =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 700 700' width='700' height='700'>` +
  `<filter id='n' x='-20%' y='-20%' width='140%' height='140%' color-interpolation-filters='linearRGB'>` +
  `<feTurbulence type='fractalNoise' baseFrequency='0.08' numOctaves='4' seed='15' stitchTiles='stitch' result='t'/>` +
  `<feSpecularLighting surfaceScale='8' specularConstant='0.35' specularExponent='20' lighting-color='#ffffff' in='t'>` +
  `<feDistantLight azimuth='3' elevation='74'/>` +
  `</feSpecularLighting>` +
  `</filter>` +
  `<rect width='700' height='700' filter='url(#n)'/>` +
  `</svg>`;

export const noiseBackgroundImage =
  `url("data:image/svg+xml,${encodeURIComponent(noiseSvg)}")`;