import Datatable from "@/app/_components/Datatable/datatable";
import { alumnoscolumns as columns } from "@/app/_components/Datatable/Columns/alumnos";
import { fetchRequest } from "@/app/_lib/actions";
import BotonNuevo from "./Botones/botonNuevo";

export default async function Page() {
  const data = await fetchRequest("/alumnos", "GET", null);

  if(data.error){
    return (
    <>
    <h1>{data.message}</h1>
    <div><BotonNuevo/></div>
    </>
    )
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