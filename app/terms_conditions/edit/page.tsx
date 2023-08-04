import EditAlert from "@/app/components/Edit/EditAlert";
import EditTerms from "@/app/components/Edit/EditTerms";
import client from "@/app/libs/prismadb";

const EditTermPage = async ({ searchParams }: any) => {
  const term: any = await client.termsConditions.findUnique({
    where: {
      id: searchParams.id,
    },
  });
  return (
    <>
      <EditTerms terms={term} />
    </>
  );
};

export default EditTermPage;
