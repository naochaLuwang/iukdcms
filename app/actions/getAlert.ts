export async function getAlert(id: string) {
  const response = await fetch(`${process.env.API_URL}/api/alert/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
