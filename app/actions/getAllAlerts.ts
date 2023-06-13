export async function getAllAlerts() {
  const response: Response = await fetch(`${process.env.API_URL}/api/alert`, {
    cache: "no-store",
  });
  return response.json();
}
