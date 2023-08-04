import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import PeopleTable from "../components/Table/PeopleTable";

import client from "../libs/prismadb";

export const revalidate = 0;

const PeoplePage = async () => {
  const people = await client.people.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      department: true,
    },
  });

  if (people.length === 0) {
    return (
      <Empty
        imgp="/people.svg"
        label="Oops! it looks like Doctor is empty."
        href="/people/add_new_people"
        title="Add New Doctor"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Doctors"
        action="Add a new Doctor"
        link="/people/add_new_people"
      />
      <PeopleTable
        data={people}
        headings={[
          "Serial No",
          "Name",
          "Designation",
          "Department",
          "Status",

          "Created By",
          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default PeoplePage;
