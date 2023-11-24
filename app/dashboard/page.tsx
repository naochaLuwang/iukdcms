import Heading from "../components/Heading";

import MessageTable from "../components/Table/MessageTable";
import client from "../libs/prismadb";

const Dashboard = async () => {
  // const messages = await client.message.findMany({
  //   where: {
  //     isRead: "NO",
  //   },
  // });
  // console.log(messages);

  return (
    <div className="flex flex-col w-full max-h-screen px-10 py-10">
      <Heading title="Welcome to IUKD CMS" />

      {/* <div className="w-full mx-auto max-w-7xl">
        <h1>Messages</h1>
        <MessageTable
          data={messages}
          headings={[
            "Serial No",
            "Name",
            "Phone",
            "Message",
            "Status",

            "Created At",
            "Actions",
          ]}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
