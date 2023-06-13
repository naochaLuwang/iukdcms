import { getSubLink } from "@/app/actions/getSublink";
import { getAllLinks } from "@/app/actions/getAllLinks";
import EditSubLink from "@/app/components/Edit/EditSubmenu";

const EditSubmenuPage = async ({ searchParams }: any) => {
  const sublink = await getSubLink(searchParams.id);
  const links = await getAllLinks();

  return (
    <>
      <EditSubLink links={links} sublink={sublink} />
    </>
  );
};

export default EditSubmenuPage;
