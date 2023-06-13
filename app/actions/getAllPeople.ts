export async function getAllPeople(): Promise<PeopleProps[]> {
  const response: Response = await fetch(`${process.env.API_URL}/api/people`, {
    cache: "no-store",
  });
  return response.json();
}
