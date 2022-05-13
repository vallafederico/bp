

/* Functions */

// lerp
export function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}

// clamp
export function clamp(min, max, num) {
  return Math.min(Math.max(num, min), max);
}

// map
function map(value, inLow, inHigh, outLow, outHigh) {
  return outLow + ((outHigh - outLow) * (value - inLow)) / (inHigh - inLow);
}


/* Angles */
export function radToDeg(r) {
  return r * 180 / Math.PI;
}
export function degToRad(d) {
  return d * Math.PI / 180;
}
