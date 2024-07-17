"use client"

import { redirectUser } from "@/app/_lib/actions"

export default function BotonNuevo() {
    return(
        <>
            <button
                type="button"
                onClick={e => redirectUser("/alumnos/0")}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                Nuevo Alumno
            </button>
        </>
    )
}