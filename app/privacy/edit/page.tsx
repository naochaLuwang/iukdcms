import { getPrivacy } from "@/app/actions/getPrivacy";
import EditAlert from "@/app/components/Edit/EditAlert";
import EditPrivacy from "@/app/components/Edit/EditPrivacy";
import EditTerms from "@/app/components/Edit/EditTerms";

const EditTermPage = async ({ searchParams }: any) => {
  const privacy = await getPrivacy(searchParams.id);
  return (
    <>
      <EditPrivacy privacy={privacy} />
    </>
  );
};

export default EditTermPage;
