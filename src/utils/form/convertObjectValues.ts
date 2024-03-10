interface ObjectValues {
  label: string;
  checked: boolean;
  excluded: boolean;
}

export type ObjectType = Record<string, ObjectValues>;

export function convertObjectValues(obj: ObjectType) {
  return Object.entries(obj)
    .map(([name, { checked, excluded }]) =>
      !checked ? null : `${excluded ? "!" : ""}${name}`,
    )
    .filter((status) => status !== null);
}
