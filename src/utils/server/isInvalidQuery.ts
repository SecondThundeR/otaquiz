export function isInvalidQuery(value: unknown): value is string[] | undefined {
  return value === undefined || Array.isArray(value);
}
