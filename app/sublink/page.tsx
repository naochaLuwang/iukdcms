import { getAllSubLinks } from "../actions/getAllSubLinks";
import Empty from "../components/Empty";

import PageHeader from "../components/PageHeader";
import SubLinkTable from "../components/Table/SubLinkTable";

const SubLinkPage = async () => {
  const sublinks = await getAllSubLinks();

  if (sublinks.length === 0) {
    return (
      <Empty
        imgp="/subsubmenu.svg"
        label="Oops! it looks like your website Sub Link is empty."
        href="/sublink/add_new_sublink"
        title="Create New Sub Link"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Sub Links"
        action="Add New Sub Link"
        link="/sublink/add_new_sublink"
      />
      <SubLinkTable
        data={sublinks}
        headings={[
          "Serial No",
          "Title",
          "Slug",
          "Parent Link",
          "Status",

          "Created By",
          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default SubLinkPage;

export const revalidate = 0;
