export async function getTerm(id: string) {
  const response = await fetch(`${process.env.API_URL}/api/terms/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
