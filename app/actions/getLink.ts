export async function getLink(id: string): Promise<LinkProps> {
  const response = await fetch(`${process.env.API_URL}/api/links/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
