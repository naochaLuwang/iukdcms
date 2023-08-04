import EditTestimonial from "@/app/components/Edit/EditTestimonial";
import client from "@/app/libs/prismadb";

const EditTestimonialPage = async ({ searchParams }: any) => {
  const testimonial: any = await client.testimonial.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditTestimonial testimonial={testimonial} />
    </>
  );
};

export default EditTestimonialPage;
