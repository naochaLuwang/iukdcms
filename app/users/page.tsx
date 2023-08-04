import PageHeader from "@/app/components/PageHeader";
import UserTable from "@/app/components/Table/UserTable";
import client from "@/app/libs/prismadb";

export const revalidate = 0;

const UserPage = async () => {
  const users: any = await client.user.findMany();

  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Users"
        action="Add a new User"
        link="/user/add_new_user"
      />
      <UserTable
        data={users}
        headings={["Serial No", "Name", "Email", "Created At", "Actions"]}
      />
    </div>
  );
};

export default UserPage;
