import Calendar from "@/app/_components/Calendar/calendar";
import { fetchRequest } from "@/app/_lib/actions";

export default async function Page() {

  const data = await fetchRequest("/birthdays", "GET", null);
  const data2 = await fetchRequest("/vigencias", "GET", null);

  if(data.error){
    return (<>{data.message}</>)
  }

  if(data2.error){
    return (<>{data2.message}</>)
  }

  const bdays = data.message;
  const vigs = data2.message;

  return (
    <>
      <Calendar bdays={bdays} vigs={vigs}/>
    </>        
  )
}