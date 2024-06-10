"use client"

import { fetchRequest, redirectUser } from "@/app/_lib/actions";

export default async function BotonGris(params) {

    const alumnoDelete = async (e) => {
        e.preventDefault();
        const boton = e.target;
    
        const answer = window.confirm("Confirmar desactivar?");
        if (answer) {
            boton.disabled = true;
            const url = "/alumnos/"+params.id;
            const data = await fetchRequest(url,"DELETE", null);
    
            if(!data.error){
                redirectUser("/alumnos")
            }
    
        } else {
            // Do nothing!
            boton.disabled = false;
            console.log("Thing was not saved to the database.");
        }
    }

    return(
        <>
            <button type="button" onClick={alumnoDelete} className="py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Desactivar
            </button>
        </>
    )
}