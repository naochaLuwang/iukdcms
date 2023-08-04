import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import LinkTable from "../components/Table/LinkTable";

import client from "../libs/prismadb";

export const metadata = {
  title: "Link | Rely CMS 2",
};

export const revalidate = 0;

const LinkPage = async () => {
  const menus = await client.links.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      sublinks: true,

      user: true,
    },
  });

  if (menus.length === 0) {
    return (
      <Empty
        imgp="/menu.svg"
        label="Oops! it looks like your website Link is empty."
        href="/link/add_new_link"
        title="Create New Menu"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Links"
        action="Add a new Link"
        link="/link/add_new_link"
      />
      <LinkTable
        data={menus}
        headings={[
          "Serial No",
          "Title",
          "Slug",
          "Status",

          "Created By",
          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default LinkPage;
