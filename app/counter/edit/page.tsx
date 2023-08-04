import EditCounter from "@/app/components/Edit/EditCounter";
import client from "@/app/libs/prismadb";

const EditCounterPage = async ({ searchParams }: any) => {
  const counters = await client.counters.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditCounter counter={counters} />
    </>
  );
};

export default EditCounterPage;
