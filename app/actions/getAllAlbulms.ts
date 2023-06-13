export async function getAllAlbulms(): Promise<AlbumProps[]> {
  const response: Response = await fetch(`${process.env.API_URL}/api/albulm`, {
    cache: "no-store",
  });
  return response.json();
}
