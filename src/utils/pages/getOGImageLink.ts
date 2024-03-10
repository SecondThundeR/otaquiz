export function getOGImageLink(
  host: string | null,
  id: string | null,
  name: string | null | undefined,
  correct: number,
  amount: number,
) {
  if (!host || !id || !name) return undefined;

  const link = new URL(`https://${host}/api/results-image`);
  link.searchParams.set("id", id);
  link.searchParams.set("name", name);
  link.searchParams.set("correct", String(correct));
  link.searchParams.set("amount", String(amount));

  return link;
}
