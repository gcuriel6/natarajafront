"use server"

import { cookies } from "next/headers";
import MenuLink from "./menulink";
import MenuLogo from "./menulogo";
import Link from "next/link";
import { MenuRoutes } from "./menuRoutes";

export default async function Sidebar() {

  // const usuario = cookies().get("usuario");
  // const valores = JSON.parse(usuario.value);

  // console.log(valores.nombre);
  // console.log(valores.apellido);
  // console.log(valores.id);
  // console.log(valores.perfil);

  return (
    <>
        {/* normal sidebar */}
        <div className="flex hidden flex-col items-center w-60 h-full overflow-hidden text-gray-700 bg-gray-100 md:block rounded">
          <div className="flex items-center w-full px-3 mt-3">
            <MenuLogo/>
          </div>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
              {
                MenuRoutes.map(route=>{
                  return (
                      <MenuLink texto={route.texto} ruta={route.ruta} icono={route.icono} />
                  )
                })
              }
            </div>
          </div>
          <Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300" href="/login">
              <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2 text-sm font-medium">Salir</span>
          </Link>
        </div>
    </>
  )
}