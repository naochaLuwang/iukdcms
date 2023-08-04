import EditAlert from "@/app/components/Edit/EditAlert";
import client from "@/app/libs/prismadb";

const EditAlertPage = async ({ searchParams }: any) => {
  const alerts: any = await client.alerts.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditAlert alert={alerts} />
    </>
  );
};

export default EditAlertPage;
