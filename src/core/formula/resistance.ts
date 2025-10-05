
export function calcResCoef(res: number) {
  // res 以小数表示，如 0.10 = 10%
  if (res < 0) return 1 - res / 2
  if (res <= 0.75) return 1 - res
  return 1 / (4 * res + 1)
}
