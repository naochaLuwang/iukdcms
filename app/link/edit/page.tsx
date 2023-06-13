import { getLink } from "@/app/actions/getLink";
import EditLink from "../../components/Edit/EditLink";

const EditPage = async ({ searchParams }: any) => {
  const link = await getLink(searchParams.id);

  return (
    <>
      <EditLink link={link} />
    </>
  );
};

export default EditPage;
