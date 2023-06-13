export async function getAllDepartments():Promise<DepartmentProps[]> {
  const response:Response = await fetch(`${process.env.API_URL}/api/department`, {
    cache: "no-store",
  });
  return response.json();
}
