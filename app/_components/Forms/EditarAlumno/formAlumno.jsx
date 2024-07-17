"use server"

import BotonGris from "@/app/_components/Forms/EditarAlumno/Buttons/botonGris";
import BotonMorado from "@/app/_components/Forms/EditarAlumno/Buttons/botonMorado";
import BotonVerde from "@/app/_components/Forms/EditarAlumno/Buttons/botonVerde";
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

function toDateInputValue(dateObject){
    return new Date(dateObject).toISOString().split('T')[0];
};

export default async function FormAlumno(params) {

    const id = params.id

    const thisDate = new Date(); //today (In UTC timezone)
    thisDate.setTime( thisDate.getTime() - thisDate.getTimezoneOffset()*60*1000 ); //Aqui se saca el timezone offset (6 horas) y se le resta
    const thisYear = thisDate.getFullYear();  // returns the current year
    const thisMonth = thisDate.getMonth(); //returns current month

    const thisMonthDays = new Date(thisYear, thisMonth+1, 0).getDate(); //if we have 0 for the day it takes the previous months last day

    let alumno = {};

    if(params.id!=0){
        const data = await fetchRequest("/alumnos/"+id, "GET", null);

        // document.getElementById("divInscripcion").style.display = "none";

        if(data.error){
            return (
                <>
                    <h1>Hubo error</h1>
                    <h2>{data.message}</h2>
                </>
            )
        }

        alumno = data.message;
    }
    
    const dataDisc = await fetchRequest("/disciplinas/alumnos/"+id, "GET", null);
    const dataMuestras = await fetchRequest("/disciplinas/muestras/"+id, "GET", null);
    const disciplinas = dataDisc.message;
    const muestras = dataMuestras.message;
    
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
                        {/* <h2 className="max-w-sm mx-auto md:w-1/4">
                            Información Personal
                        </h2> */}
                        <div className="max-w-sm mx-auto space-y-5 md:w-3/4">
                            <div>
                                <div className=" relative ">
                                    <h6>Nombres</h6>
                                    <InputText nombre={"user-nombres"} clase={inputsClass} placeholder={"Nombres"} default={alumno.nombres}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <h6>Apellidos</h6>
                                    <InputText nombre={"user-apellidos"} clase={inputsClass} placeholder={"Apellidos"} default={alumno.apellidos}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <h6>Fecha de Nacimiento</h6>
                                    <InputDate nombre={"user-nacimiento"} clase={inputsClass} default={alumno.nacimiento}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <h6>Telefono</h6>
                                    <InputText nombre={"user-telefono"} clase={inputsClass} placeholder={"Telefono"} default={alumno.telefono}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0" id="divInscripcion" style={{ display: id!=0 ? "none":"block" }}>
                        {/* <h2 className="max-w-sm mx-auto md:w-1/4">
                            Inscripción
                        </h2> */}
                        <div className="max-w-sm mx-auto space-y-5 md:w-3/4">
                            <div>
                                <div className=" relative ">
                                    <h6>Fecha de Inicio (desde)</h6>
                                    <InputDate nombre={"user-inicio"} clase={inputsClass} default={toDateInputValue(thisDate)}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <h6>Fecha Fin (hasta)</h6>
                                    <InputDate nombre={"user-fin"} clase={inputsClass} default={toDateInputValue(thisDate.setDate(thisDate.getDate() + thisMonthDays))}/>
                                </div>
                            </div>
                            <div>
                                <div className=" relative ">
                                    <h6>Cantidad (sin inscripcion)</h6>
                                    <InputText nombre={"user-cantidad"} clase={inputsClass} placeholder={"Cantidad"} default={""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <div className="items-center w-1/2 p-4 space-y-4 text-gray-500" id="divCheckboxes">
                            <h1>Disciplinas</h1>
                            {
                                disciplinas.map(disc=>{
                                    return <InputCheckbox nombre={disc.nombre} clase={inputsClass} id={disc.id} checked={disc.checked==null ? 0 : 1}/>
                                })
                            }
                        </div>
                        <div className="items-center w-1/2 p-4 space-y-4 text-gray-500" id="divCheckboxes2">
                            <h1>Muestras</h1>
                            {
                                muestras.map(disc=>{
                                    return <InputCheckbox nombre={disc.nombre} clase={inputsClass} id={disc.id} checked={disc.checked==null ? 0 : 1}/>
                                })
                            }
                        </div>
                    </div>
                    <div className="flex w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        {/* Botones para desactivar o actualizar alumno existente */}
                        {params.id != 0 ? <BotonGris id={id}/> : <></>}
                        {params.id != 0 ? <BotonMorado id={id}/> : <></>}
                        {/* Boton para crear alumno nuevo */}
                        {params.id == 0 ? <BotonVerde id={id}/> : <></>}
                    </div>
                </div>
            </form>
        </>
    )
}