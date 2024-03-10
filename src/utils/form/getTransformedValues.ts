export function getTransformedValues<T>(values: T[]) {
  return values.length === 0 ? null : values.join(",");
}
