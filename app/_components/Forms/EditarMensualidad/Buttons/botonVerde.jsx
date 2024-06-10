"use client"

import { fetchRequest, redirectUser } from "@/app/_lib/actions";
import { getCookies } from "@/app/_lib/actions";

const claseBoton = "py-2 px-4 bg-green-700 hover:bg-green-900 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ";

export default async function BotonVerde(params) {

    async function mensualidadSave (e){
        e.preventDefault();
    
        const form = e.target.closest("form");
        const boton = e.target;
    
        const answer = window.confirm("Confirmar guardar?");
        if (answer) {
            const goodInputs="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";
            const badInputs="rounded-lg flex-1 appearance-none border-2 border-red-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent";
                        
            const inputAlumno = form[0];
            const inputInicio = form[1];
            const inputFin = form[2];
            const inputCantidad = form[3];

            const inputs = [inputAlumno, inputInicio, inputFin, inputCantidad];
            let allGood = true;

            inputs.map(input=>{
                input.classList.remove(...input.classList);
                if(input.value == ""){
                    const bads = badInputs.split(" ");
                    input.classList.add(...bads)
                    allGood = false;
                }else{
                    const goods = goodInputs.split(" ");
                    input.classList.add(...goods)
                }
            });

            if(!allGood){
                return
            }

            const url = "/mensualidades";

            const usuario = await getCookies("usuario");
            const usua = JSON.parse(usuario);
    
            boton.disabled = true;
    
            const mensualidad = {
                cantidad: inputCantidad.value,
                descripcion: "Mensualidad de alumno",
                categoria: "1", //categoria mensualidad es 1
                tipo: "1", //tipo ingreso
                usuario: usua.id, //usuario que hizo el registro
                alumno: inputAlumno.value,
                inicio: inputInicio.value,
                fin: inputFin.value
            }
    
            const data = await fetchRequest(url, "POST", mensualidad);
    
            if(!data.error){
                boton.disabled = false;
                redirectUser(url)
            }
    
        } else {
            // Do nothing!
            boton.disabled = false;
            console.log("Thing was not saved to the database.");
        }
    }

    return(
        <>
            <button type="button" onClick={mensualidadSave} className={claseBoton}>
                Guardar
            </button>
        </>
    )
}