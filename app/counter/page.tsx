import { getAllCounters } from "../actions/getAllCounters";
import { getAllDepartments } from "../actions/getAllDepartments";
import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import CounterTable from "../components/Table/CounterTable";
import DepartmentTable from "../components/Table/DepartmentTable";

export const revalidate = 0;

const CounterPage = async () => {
  const counters = await getAllCounters();

  if (counters.length === 0) {
    return (
      <Empty
        imgp="/menu.svg"
        label="Oops! it looks like  Counter is empty."
        href="/counter/add_new_counter"
        title="Create New Counter"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Counter"
        action="Add a new Counter"
        link="/counter/add_counter"
      />
      <CounterTable
        data={counters}
        headings={[
          "Serial No",
          "Title",
          "Value",
          "Status",

          "Created At",
          "Actions",
        ]}
      />
    </div>
  );
};

export default CounterPage;
