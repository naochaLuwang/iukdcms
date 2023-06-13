export async function getTestimonial(id: string): Promise<TestimonialProps> {
  const response = await fetch(`${process.env.API_URL}/api/testimonial/${id}`, {
    cache: "no-store",
  });
  return response.json();
}
