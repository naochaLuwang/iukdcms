import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import PeopleTable from "../components/Table/PeopleTable";

import client from "../libs/prismadb";

export const revalidate = 0;

const OutreachOpd = async () => {
  const outreachopd: any = await client.outreachopds.findMany({
    include: {
      opdLists: true,
      doctor: {
        include: {
          department: true,
        },
      },
    },
  });

  console.log(outreachopd);

  if (outreachopd.length === 0) {
    return (
      <Empty
        imgp="/people.svg"
        label="Oops! it looks like it is empty."
        href="/outreachopd/add_new_outreach_opd"
        title="Add New OPD"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Outreach OPDs"
        action="Add a new OPD"
        link="/outreachopd/add_new_outreach_opd"
      />
      <PeopleTable
        data={outreachopd}
        headings={["Serial No", "Name", "OPD Date", "Actions"]}
      />
    </div>
  );
};

export default OutreachOpd;
