import NewPeople from "../../components/NewPeople";

async function getDepartment() {
  const res = await fetch(`${process.env.API_URL}/api/department`, {
    cache: "no-store",
  });
  return res.json();
}

const NewPeoplepage = async () => {
  const department: DepartmentProps[] = await getDepartment();

  return (
    <div className="w-full h-auto">
      <NewPeople department={department} />
    </div>
  );
};

export default NewPeoplepage;
