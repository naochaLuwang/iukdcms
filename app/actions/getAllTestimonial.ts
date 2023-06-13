export async function getAllTestimonials(): Promise<TestimonialProps[]> {
  const response: Response = await fetch(
    `${process.env.API_URL}/api/testimonial`,
    {
      cache: "no-store",
    }
  );
  return response.json();
}
