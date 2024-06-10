import Datatable from "@/app/_components/Datatable/datatable";
import { alumnoscolumns as columns } from "@/app/_components/Datatable/Columns/alumnos";
import { fetchRequest } from "@/app/_lib/actions";

export default async function Page() {
  const data = await fetchRequest("/alumnos", "GET", null);

  if(data.error){
    return (<>{data.message}</>)
  }

  const alumnos = data.message;

  return (
    <>
      <Datatable
        data={alumnos}
        columns={columns}
        title={"Alumnos"}
        linkNew={"/alumnos/0"}
      />
    </>
  )
}