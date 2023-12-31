import Empty from "../components/Empty";

import PageHeader from "../components/PageHeader";
import TestimonialTable from "../components/Table/TestimonialTable";
import client from "../libs/prismadb";

const TestimonialPage = async () => {
  const testimonials: any = await client.testimonial.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  if (testimonials.length === 0) {
    return (
      <Empty
        imgp="/subsubmenu.svg"
        label="Oops! it looks like your website Testimonial is empty."
        href="/testimonial/add_new_testimonial"
        title="Create New Testimonial"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Testimonials"
        action="Add New Testimonial"
        link="/testimonial/add_new_testimonial"
      />
      <TestimonialTable
        data={testimonials}
        headings={[
          "Serial No",
          "Name",
          "Testimonial",
          "Status",
          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default TestimonialPage;
