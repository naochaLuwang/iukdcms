import Empty from "@/app/components/Empty";
import PageHeader from "@/app/components/PageHeader";
import AlertTable from "@/app/components/Table/AlertTable";
import client from "@/app/libs/prismadb";

export const revalidate = 0;

const AlertsPage = async () => {
  const alerts = await client.alerts.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  if (alerts.length === 0) {
    return (
      <Empty
        imgp="/menu.svg"
        label="Oops! it looks like  Marquee Notification is empty."
        href="/alerts/add_new_alert"
        title="Create New Notification"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Notification"
        action="Add a new Notification"
        link="/alerts/add_new_alert"
      />
      <AlertTable
        data={alerts}
        headings={["Serial No", "Title", "Status", "Created At", "Actions"]}
      />
    </div>
  );
};

export default AlertsPage;
