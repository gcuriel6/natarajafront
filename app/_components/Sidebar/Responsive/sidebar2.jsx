"use server"

import { cookies } from "next/headers";
import MenuLink from "./menulink2";
import MenuLogo from "./menulogo2";
import Link from "next/link";
import { MenuRoutes } from "../menuRoutes";

export default async function Sidebar2() {

    // const usuario = cookies().get("usuario");
    // const valores = JSON.parse(usuario.value);

    // console.log(valores.nombre);
    // console.log(valores.apellido);
    // console.log(valores.id);
    // console.log(valores.perfil);

    return(
        <>
        {/* small sidebar */}
        <div className="flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gray-100 md:hidden rounded print:hidden">
            <a className="flex items-center justify-center mt-3" href="#">
                <MenuLogo/>
            </a>
            <div className="flex flex-col items-center mt-3 border-t border-gray-300">
                {
                    MenuRoutes.map(route=>{
                        return (
                            <MenuLink texto={route.texto} ruta={route.ruta} icono={route.icono} />
                        )
                    })
                }
            </div>
            <Link className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 hover:bg-gray-300" href="/login">
                <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </Link>
        </div>
        </>
    )
}