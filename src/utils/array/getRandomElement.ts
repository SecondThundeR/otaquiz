export function getRandomElement<T>(array: T[]) {
  return array.at(Math.floor(Math.random() * array.length));
}
