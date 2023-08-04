import Empty from "@/app/components/Empty";
import PageHeader from "@/app/components/PageHeader";
import CounterTable from "@/app/components/Table/CounterTable";
import client from "@/app/libs/prismadb";

export const revalidate = 0;

const CounterPage = async () => {
  const counters = await client.counters.findMany({
    where: {
      status: "ACTIVE",
    },
  });

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
