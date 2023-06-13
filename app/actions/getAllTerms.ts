export async function getAllTerms() {
  const response: Response = await fetch(`${process.env.API_URL}/api/terms`, {
    cache: "no-store",
  });
  return response.json();
}
