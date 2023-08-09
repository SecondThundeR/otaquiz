export function getTransformedValues(values: unknown[]) {
  return values.length === 0 ? null : values.join(",");
}
