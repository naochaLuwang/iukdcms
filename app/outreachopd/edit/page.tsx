import EditPeople from "@/app/components/Edit/EditPeople";
import client from "@/app/libs/prismadb";

const EditOutreachOpdPage = async ({ searchParams }: any) => {
  const outreachopds: any = await client.outreachopds.findUnique({
    where: {
      id: searchParams.id,
    },
    include: {
      opdLists: true,
      doctor: {
        select: {
          id: true,
        },
      },
    },
  });

  console.log(outreachopds);

  const departments: any = await client.people.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  return (
    <>
      {/* <EditPeople person={people} department={departments} /> */}
      <h1>Edit outreach opd</h1>
    </>
  );
};

export default EditOutreachOpdPage;
