import { getAllAlerts } from "../actions/getAllAlerts";
import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import AlertTable from "../components/Table/AlertTable";

export const revalidate = 0;

const AlertsPage = async () => {
  const alerts = await getAllAlerts();

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
        link="/alerts/add_new_alerts"
      />
      <AlertTable
        data={alerts}
        headings={["Serial No", "Title", "Status", "Created At", "Actions"]}
      />
    </div>
  );
};

export default AlertsPage;
