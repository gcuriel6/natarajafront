import FormMovimiento from "@/app/_components/Forms/EditarMovimiento/formMovimiento";
import { Suspense } from "react";

export default async function Page({params}) {
    const id = params.id;

    return (
        <>
            <Suspense>                
                <FormMovimiento id={id}/>
            </Suspense>
        </>
    )
}