import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import DepartmentTable from "../components/Table/DepartmentTable";
import client from "../libs/prismadb";

export const revalidate = 0;

const DepartmentPage = async () => {
  const departments: any = await client.department.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  if (departments.length === 0) {
    return (
      <Empty
        imgp="/menu.svg"
        label="Oops! it looks like  Department is empty."
        href="/department/add_new_department"
        title="Create New Department"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Department"
        action="Add a new Department"
        link="/department/add_new_department"
      />
      <DepartmentTable
        data={departments}
        headings={[
          "Serial No",
          "Department Name",
          "Department Code",
          "Status",

          "Created By",
          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default DepartmentPage;
