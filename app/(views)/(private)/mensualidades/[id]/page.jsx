import FormMensualidad from "@/app/_components/Forms/EditarMensualidad/formMensualidad";
import { Suspense } from "react";

export default async function Page({params}) {
    const id = params.id;

    return (
        <>
            <Suspense>                
                <FormMensualidad id={id}/>
            </Suspense>
        </>
    )
}