export function getNounReviews(number) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return 'оценок';
  }
  n %= 10;
  if (n === 1) {
    return 'оценка';
  }
  if (n >= 2 && n <= 4) {
    return 'оценки';
  }
  return 'оценок';
}
