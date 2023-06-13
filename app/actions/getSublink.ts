export async function getSubLink(id: string): Promise<SubLinkProps> {
  const response = await fetch(`${process.env.API_URL}/api/sublinks/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
