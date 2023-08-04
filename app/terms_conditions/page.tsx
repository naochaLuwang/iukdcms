import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import TermTable from "../components/Table/TermTable";
import client from "../libs/prismadb";

export const revalidate = 0;

const TermsPage = async () => {
  const terms: any = await client.termsConditions.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  if (terms.length === 0) {
    return (
      <Empty
        imgp="/menu.svg"
        label="Oops! it looks like Terms & Conditions  is empty."
        href="/terms_conditions/add_new_terms_conditions"
        title="Create New Terms & Conditions"
      />
    );
  }
  return (
    <div className="w-full h-auto">
      <PageHeader
        title="Terms & Conditions"
        action="Add a new Terms & Conditions"
        link="/terms_conditions/add_new_terms_conditions"
      />
      <TermTable
        data={terms}
        headings={["Serial No", "Title", "Status", "Created At", "Actions"]}
      />
    </div>
  );
};

export default TermsPage;
