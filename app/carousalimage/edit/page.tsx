import { getCarousal } from "@/app/actions/getCarousal";
import EditCarousal from "@/app/components/Edit/EditCarousal";

const EditCarousalPage = async ({ searchParams }: any) => {
  const carousal = await getCarousal(searchParams.id);

  return (
    <>
      <EditCarousal carousalImage={carousal} />
    </>
  );
};

export default EditCarousalPage;
