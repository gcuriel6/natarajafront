import Datatable from "@/app/_components/Datatable/datatable";
import { docentescolumns as columns } from "@/app/_components/Datatable/Columns/docentes";
import { fetchRequest } from "@/app/_lib/actions";

export default async function Page() {
    const data = await fetchRequest("/docentes", "GET", null);
  
    if(data.error){
      return (<>{data.message}</>)
    }
  
    const docentes = data.message;
  
    return (
      <>
        <Datatable
          data={docentes}
          columns={columns}
          title={"Docentes"}
          linkNew={"/docentes/0"}
        />
      </>
    )
  }