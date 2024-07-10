import FormDocente from "@/app/_components/Forms/EditarDocente/formDocente";
import { Suspense } from "react";

export default async function Page({params}) {
    const id = params.id;

    return (
        <>
            <Suspense>                
                <FormDocente id={id}/>
            </Suspense>
        </>
    )
}