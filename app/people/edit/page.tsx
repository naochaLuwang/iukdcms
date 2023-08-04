import EditPeople from "@/app/components/Edit/EditPeople";
import client from "@/app/libs/prismadb";

const EditPeoplePage = async ({ searchParams }: any) => {
  const people: any = await client.people.findUnique({
    where: {
      id: searchParams.id,
    },
  });
  const departments: any = await client.department.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return (
    <>
      <EditPeople person={people} department={departments} />
    </>
  );
};

export default EditPeoplePage;
