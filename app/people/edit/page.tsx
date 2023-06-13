import { getAllDepartments } from "@/app/actions/getAllDepartments";

import { getPerson } from "@/app/actions/getPerson";
import EditPeople from "@/app/components/Edit/EditPeople";

const EditPeoplePage = async ({ searchParams }: any) => {
  const people = await getPerson(searchParams.id);
  const departments = await getAllDepartments();

  return (
    <>
      <EditPeople person={people} department={departments} />
    </>
  );
};

export default EditPeoplePage;
