import { getTestimonial } from "@/app/actions/getTestimonial";

import EditTestimonial from "@/app/components/Edit/EditTestimonial";

const EditTestimonialPage = async ({ searchParams }: any) => {
  const testimonial = await getTestimonial(searchParams.id);

  return (
    <>
      <EditTestimonial testimonial={testimonial} />
    </>
  );
};

export default EditTestimonialPage;
