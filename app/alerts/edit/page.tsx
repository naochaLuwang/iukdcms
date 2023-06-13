import { getAlert } from "@/app/actions/getAlert";
import EditAlert from "@/app/components/Edit/EditAlert";

const EditAlertPage = async ({ searchParams }: any) => {
  const alerts = await getAlert(searchParams.id);
  return (
    <>
      <EditAlert alert={alerts} />
    </>
  );
};

export default EditAlertPage;
