export function formatScore(score: number) {
  return new Intl.NumberFormat("en-US").format(score);
}
