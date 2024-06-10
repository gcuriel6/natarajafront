
import { getCookies } from "@/app/_lib/actions";
import Datatable from "@/app/_components/Datatable/datatable";
import { movimientoscolumns as columns } from "@/app/_components/Datatable/Columns/movimientos";
import { fetchRequest } from "@/app/_lib/actions";
import BotonNuevo from "./Botones/botonNuevo";

export default async function Page() {

    const usuario = await getCookies("usuario");
    const usua = JSON.parse(usuario);

    if(usua.perfil == 2){ //perfil 2 (recepcion) no tiene derecho a ver movimientos
        
        console.log("No tiene derecho a ver movimientos")
        return (<></>)
    }

    const data = await fetchRequest("/movimientos", "GET", null);

    if(data.error){
      return (
        <div>  
            <BotonNuevo />
            <div>{data.message}</div>
        </div>
      )
    }
  
    const movimientos = data.message;

    return (
      <>
        <Datatable
            data={movimientos}
            columns={columns}
            title={"Movimientos"}
            linkNew={"/movimientos/0"}
        />
        {/* <BotonNuevo /> */}        
        {/* <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
            <div className="px-4 py-8 sm:px-10">
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div className="relative flex justify-center text-sm leading-5">
                        <span className="px-2 text-gray-500 bg-white">
                            Nuevo Movimiento
                        </span>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="w-full space-y-6">
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="search-form-price" className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your price"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="search-form-location" className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your location"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="search-form-name" className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your name"/>
                            </div>
                        </div>
                        <div>
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Guardar
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
      </>
    )
  }