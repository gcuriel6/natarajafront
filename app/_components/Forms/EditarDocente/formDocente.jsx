"use server"

import BotonGris from "@/app/_components/Forms/EditarDocente/Buttons/botonGris";
import BotonMorado from "@/app/_components/Forms/EditarDocente/Buttons/botonMorado";
import BotonVerde from "@/app/_components/Forms/EditarDocente/Buttons/botonVerde";
import UsuarioIcon from "@/app/_components/Icons/usuario";
import { fetchRequest, getCookies, redirectUser } from "@/app/_lib/actions";
import InputText from "../Inputs/text";
import InputDate from "../Inputs/date";
import InputCheckbox from "../Inputs/checkbox";

async function handleChange(e){
    const value = e.target.value
    console.log(value)
    e.target.value = value
}

export default async function FormDocente(params) {

    const id = params.id
    let docente = {};
    // const dataDisc = await fetchRequest("/disciplinas/alumnos/"+id, "GET", null);
    // const disciplinas = dataDisc.message;
    if(params.id!=0){
        const data = await fetchRequest("/docentes/"+id, "GET", null);

        if(data.error){
            return (
                <>
                    <h1>Hubo error</h1>
                    <h2>{data.message}</h2>
                </>
            )
        }

        docente = data.message;
    }
    
    const inputsClass="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";

    return (
        <>
            <form className="container w-full mx-auto shadow-md md:w-1/2">
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
                                    <InputText nombre={"user-nombres"} clase={inputsClass} placeholder={"Nombres"} default={docente.nombres}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <InputText nombre={"user-apellidos"} clase={inputsClass} placeholder={"Apellidos"} default={docente.apellidos}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <InputDate nombre={"user-nacimiento"} clase={inputsClass} default={docente.nacimiento}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <InputText nombre={"user-telefono"} clase={inputsClass} placeholder={"Telefono"} default={docente.telefono}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <hr/>
                        <div className="items-center w-full p-4 space-y-4 text-gray-500" id="divCheckboxes">
                            {
                                disciplinas.map(disc=>{
                                    return <InputCheckbox nombre={disc.nombre} clase={inputsClass} id={disc.id} checked={disc.checked==null ? 0 : 1}/>
                                })
                            }
                        </div> */}
                    <hr />
                    <div className="flex w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        {/* Botones para desactivar o actualizar docente existente */}
                        {params.id != 0 ? <BotonGris id={id}/> : <></>}
                        {params.id != 0 ? <BotonMorado id={id}/> : <></>}
                        {/* Boton para crear docente nuevo */}
                        {params.id == 0 ? <BotonVerde id={id}/> : <></>}
                    </div>
                </div>
            </form>
        </>
    )
}