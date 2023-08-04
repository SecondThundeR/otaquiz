export function getOGImageLink(
  host: string | null,
  id: string | null,
  name: string | null | undefined,
  correct: number,
  amount: number,
) {
  if (!host || !id || !name) return undefined;

  const link = `https://${host}/api/results-image`;
  const params = `?id=${id}&name=${name}&correct=${correct}&amount=${amount}`;

  return `${link}${params}`;
}
