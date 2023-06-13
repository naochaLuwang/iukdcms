import { getTerm } from "@/app/actions/getTerm";
import EditAlert from "@/app/components/Edit/EditAlert";
import EditTerms from "@/app/components/Edit/EditTerms";

const EditTermPage = async ({ searchParams }: any) => {
  const term = await getTerm(searchParams.id);
  return (
    <>
      <EditTerms terms={term} />
    </>
  );
};

export default EditTermPage;
