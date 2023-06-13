export async function getPrivacy(id: string) {
  const response = await fetch(`${process.env.API_URL}/api/privacy/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
