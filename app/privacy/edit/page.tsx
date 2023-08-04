import EditPrivacy from "@/app/components/Edit/EditPrivacy";
import client from "@/app/libs/prismadb";

const EditTermPage = async ({ searchParams }: any) => {
  const privacy = await client.privacypolicies.findUnique({
    where: {
      id: searchParams.id,
    },
  });
  return (
    <>
      <EditPrivacy privacy={privacy} />
    </>
  );
};

export default EditTermPage;
