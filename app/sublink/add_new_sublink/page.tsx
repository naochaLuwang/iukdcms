import { getAllLinks } from "@/app/actions/getAllLinks";

import NewSubLink from "@/app/components/Submenu/NewSubLink";

const NewSubLinkpage = async () => {
  const links = await getAllLinks();

  return (
    <div className="w-full h-auto">
      <NewSubLink links={links} />
    </div>
  );
};

export default NewSubLinkpage;
