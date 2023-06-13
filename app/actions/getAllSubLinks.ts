export async function getAllSubLinks(): Promise<SubLinkProps[]> {
  const response: Response = await fetch(
    `${process.env.API_URL}/api/sublinks`,
    {
      cache: "no-store",
    }
  );
  return response.json();
}
