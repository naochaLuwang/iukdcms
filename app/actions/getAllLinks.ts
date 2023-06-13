export async function getAllLinks(): Promise<LinkProps[]> {
  const response: Response = await fetch(`${process.env.API_URL}/api/links`, {
    cache: "no-store",
  });
  return response.json();
}
