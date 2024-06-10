"use server"

import { fetchRequest, getCookies, redirectUser } from "@/app/_lib/actions";
import InputText from "../Inputs/text";
import InputSelect from "../Inputs/select";
import BotonVerde from "./Buttons/botonVerde";

async function handleChange(e){
    const value = e.target.value
    console.log(value)
    e.target.value = value
}

export default async function FormMovimiento(params) {

    const id = params.id
    let movimiento = {}
    let title = "Nuevo Movimiento";
    if(params.id!=0){
        const dataMov = await fetchRequest("/movimientos/"+id, "GET", null);

        if(dataMov.error){
            return (<><h1>{dataMov.message}</h1></>)
        }

        movimiento = dataMov.message;
        title = "Detalles Movimiento";
    }

    
    const dataCate = await fetchRequest("/categorias", "GET", null);
    const dataTipo = await fetchRequest("/tipos", "GET", null);

    const categorias = dataCate.message;
    const tipos = dataTipo.message;
    
    const inputsClass="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";

    return (
        <>
        <form className="container w-full mx-auto shadow-md md:w-1/2">
            <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300">
                            </div>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5">
                            <span className="px-2 text-gray-500 bg-white">
                                {title}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="w-full space-y-6">
                            <div className="w-full">
                                <div className="relative ">
                                    <InputText nombre={"cantidad"} clase={inputsClass} placeholder={"Cantidad"} default={movimiento.cantidad}/>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="relative ">
                                    <InputText nombre={"descripcion"} clase={inputsClass} placeholder={"Descripción"} default={movimiento.descripcion}/>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="relative ">
                                    <InputSelect nombre="categorias" clase={inputsClass} datos={categorias} default={movimiento.categoria}/>
                                </div>
                            </div>
                            
                            <div className="w-full">
                                <div className="relative ">
                                    <InputSelect nombre="tipos" clase={inputsClass} datos={tipos} default={movimiento.tipo}/>
                                </div>
                            </div>
                            <div>
                                <span className="block w-full rounded-md shadow-sm">
                                    {params.id == 0 ? <BotonVerde id={id}/> : <></>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>            
            {/* <form className="container w-full mx-auto shadow-md md:w-1/2">
                <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                        <div className="inline-flex items-center space-x-4">
                            <UsuarioIcon />
                            <h1 className="text-gray-600">
                                Editar Información
                            </h1>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="space-y-6 bg-white">
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/4">
                            Información Personal
                        </h2>
                        <div className="max-w-sm mx-auto space-y-5 md:w-3/4">
                            <div>
                                <div className=" relative ">
                                    <input
                                        type="text"
                                        id="user-nombres"
                                        name="user-nombres"
                                        className={inputsClass}
                                        placeholder="Nombres"
                                        defaultValue={alumno.nombres || ""}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input
                                        type="text"
                                        id="user-apellidos"
                                        name="user-apellidos"
                                        className={inputsClass}
                                        placeholder="Apellidos"
                                        defaultValue={alumno.apellidos || ""}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input
                                        type="date"
                                        id="user-nacimiento"
                                        name="user-nacimiento"
                                        className={inputsClass}
                                        placeholder="Fecha de Nacimiento"
                                        defaultValue={alumno.nacimiento || ""}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <input
                                        type="text"
                                        id="user-telefono"
                                        name="user-telefono"
                                        className={inputsClass}
                                        placeholder="Telefono"
                                        defaultValue={alumno.telefono || ""}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="flex w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        {params.id != 0 ? <BotonGris id={id}/> : <></>}
                        {params.id != 0 ? <BotonMorado id={id}/> : <></>}
                        {params.id == 0 ? <BotonVerde id={id}/> : <></>}
                    </div>
                </div>
            </form> */}
        </>
    )
}