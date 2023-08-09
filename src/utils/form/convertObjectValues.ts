export type ObjectType = Record<
  string,
  {
    label: string;
    checked: boolean;
    excluded: boolean;
  }
>;

export function convertObjectValues(obj: ObjectType) {
  return Object.entries(obj)
    .map((value) => {
      const [name, params] = value;
      if (!params.checked) return null;
      return `${params.excluded ? "!" : ""}${name}`;
    })
    .filter((status) => status !== null);
}
