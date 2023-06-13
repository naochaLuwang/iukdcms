

export async function getAlbulm(id: string): Promise<AlbumProps> {
  const response :Response = await fetch(`${process.env.API_URL}/api/albulm/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
