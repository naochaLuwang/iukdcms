import { getAllPrivacy } from "../actions/getAllPrivacy";
import Empty from "../components/Empty";
import PageHeader from "../components/PageHeader";
import PrivacyTable from "../components/Table/PrivacyTable";

export const revalidate = 0;

const PrivacyPage = async () => {
  const terms = await getAllPrivacy();

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
        title="Privacy Policy"
        action="Add a new Privacy Policy"
        link="/privacy/add-new_privacy_policy"
      />
      <PrivacyTable
        data={terms}
        headings={["Serial No", "Title", "Status", "Created At", "Actions"]}
      />
    </div>
  );
};

export default PrivacyPage;
