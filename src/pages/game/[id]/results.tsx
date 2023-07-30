import { useRouter } from "next/router";

export default function GameResults() {
  const router = useRouter();
  return <h1>Game results for ID: {router.query.id}</h1>;
}
