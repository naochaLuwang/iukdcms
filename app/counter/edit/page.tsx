import { getCounter } from "@/app/actions/getCounter";
import { getDepartment } from "@/app/actions/getDepartment";
import EditCounter from "@/app/components/Edit/EditCounter";
import EditDepartment from "@/app/components/Edit/EditDepartment";

const EditDepartmentPage = async ({ searchParams }: any) => {
  const counters = await getCounter(searchParams.id);

  return (
    <>
      <EditCounter counter={counters} />
    </>
  );
};

export default EditDepartmentPage;
