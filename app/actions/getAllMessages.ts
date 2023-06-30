export async function getAllMessages() {
  const response: Response = await fetch(`${process.env.API_URL}/api/message`, {
    cache: "no-store",
  });
  return response.json();
}
