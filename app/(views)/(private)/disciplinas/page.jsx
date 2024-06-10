import Datatable from "@/app/_components/Datatable/datatable";
import { disciplinascolumns as columns } from "@/app/_components/Datatable/Columns/disciplinas";
import { fetchRequest } from "@/app/_lib/actions";

export default async function Page() {
  const data = await fetchRequest("/disciplinas", "GET", null);

  if(data.error){
    return (<>{data.message}</>)
  }

  const disciplinas = data.message;

  return (
    <>
      <Datatable
        data={disciplinas}
        columns={columns}
        title={"Disciplinas"}
        linkNew={""}
      />
    </>
  )
}