import EditSubLink from "@/app/components/Edit/EditSubmenu";
import client from "@/app/libs/prismadb";

const EditSubmenuPage = async ({ searchParams }: any) => {
  const sublink = await client.sublinks.findUnique({
    where: {
      id: searchParams.id,
    },
  });
  const links = await client.links.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return (
    <>
      <EditSubLink links={links} sublink={sublink} />
    </>
  );
};

export default EditSubmenuPage;
