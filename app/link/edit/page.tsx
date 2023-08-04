import client from "@/app/libs/prismadb";
import EditLink from "../../components/Edit/EditLink";

const EditPage = async ({ searchParams }: any) => {
  const link: any = await client.links.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditLink link={link} />
    </>
  );
};

export default EditPage;
