import EditDepartment from "@/app/components/Edit/EditDepartment";
import client from "@/app/libs/prismadb";

const EditDepartmentPage = async ({ searchParams }: any) => {
  const department: any = await client.department.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditDepartment department={department} />
    </>
  );
};

export default EditDepartmentPage;
