import ImageTable from "@/app/components/Table/ImageTable";
import PageHeader from "@/app/components/PageHeader";
import client from "@/app/libs/prismadb";

export const revalidate = 0;

const CarousalImages = async () => {
  const carousalimages: any = await client.carousalimage.findMany({
    where: {
      status: "ACTIVE",
    },
  });
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Carousal Images"
        action="Add a new Carousal"
        link="/carousalimage/add_new_carousal_image"
      />
      <ImageTable
        data={carousalimages}
        headings={[
          "Serial No",
          "Image",
          "Title",

          "Status",

          "Created By",
          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default CarousalImages;
