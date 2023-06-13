export async function getAllCounters() {
  const response: Response = await fetch(`${process.env.API_URL}/api/counter`, {
    cache: "no-store",
  });
  return response.json();
}
