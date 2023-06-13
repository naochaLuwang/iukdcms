export async function getAllCarousalImages():Promise<carousalimageProps[]> {
  const response:Response = await fetch(`${process.env.API_URL}/api/carousalimage`, {
    cache: "no-store",
  });
  return response.json();
}
