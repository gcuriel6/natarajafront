import FormAlumno from "@/app/_components/Forms/EditarAlumno/formAlumno";
import { Suspense } from "react";

export default async function Page({params}) {
    const id = params.id;

    return (
        <>
            <Suspense>                
                <FormAlumno id={id}/>
            </Suspense>
        </>
    )
}