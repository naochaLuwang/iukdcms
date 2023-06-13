export async function getCounter(id: string) {
  const response = await fetch(`${process.env.API_URL}/api/counter/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
