import EditCarousal from "@/app/components/Edit/EditCarousal";
import client from "@/app/libs/prismadb";

const EditCarousalPage = async ({ searchParams }: any) => {
  const carousal: any = await client.carousalimage.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditCarousal carousalImage={carousal} />
    </>
  );
};

export default EditCarousalPage;
