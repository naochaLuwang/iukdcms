import NewSubLink from "@/app/components/Submenu/NewSubLink";
import client from "@/app/libs/prismadb";

const NewSubLinkpage = async () => {
  const links = await client.links.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return (
    <div className="w-full h-auto">
      <NewSubLink links={links} />
    </div>
  );
};

export default NewSubLinkpage;
