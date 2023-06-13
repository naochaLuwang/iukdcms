export async function getAllPrivacy() {
  const response: Response = await fetch(`${process.env.API_URL}/api/privacy`, {
    cache: "no-store",
  });
  return response.json();
}
