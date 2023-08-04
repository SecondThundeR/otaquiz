export function getGraphQLFetchOptions(query: string, variables: object) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };
}
