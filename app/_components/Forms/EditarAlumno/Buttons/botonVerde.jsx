"use client"

import { fetchRequest, redirectUser } from "@/app/_lib/actions";

export default async function BotonVerde(params) {

    async function alumnoSave (e){
        e.preventDefault();
    
        const form = e.target.closest("form");
        const boton = e.target;
    
        const answer = window.confirm("Confirmar guardar?");
        if (answer) {
            const goodInputs="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent";
            const badInputs="rounded-lg flex-1 appearance-none border-2 border-red-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent";
            
            const inputNombres = form[0];
            const inputApelidos = form[1];
            const inputNacimiento = form[2];
            const inputTelefono = form[3];
            
            //checkboxes Disciplinas
            const divCheckboxes = document.getElementById("divCheckboxes");
            const checkBoxesSelected = divCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
            const checkboxValues = [];

            for (let i = 0; i < checkBoxesSelected.length; i++) {
                const checkbox = checkBoxesSelected[i];
                checkboxValues.push(checkbox.value)
            }

            //checkboxes clases muestra
            const divCheckboxes2 = document.getElementById("divCheckboxes2");
            const checkBoxesSelected2 = divCheckboxes2.querySelectorAll('input[type="checkbox"]:checked');
            const checkboxValues2 = [];

            for (let i = 0; i < checkBoxesSelected2.length; i++) {
                const checkbox = checkBoxesSelected2[i];
                checkboxValues2.push(checkbox.value)
            }

            const inputs = [inputNombres, inputApelidos, inputNacimiento, inputTelefono];
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

            const url = "/alumnos";
    
            boton.disabled = true;
    
            const alumno = {
                nombres: inputNombres.value,
                apellidos: inputApelidos.value,
                nacimiento: inputNacimiento.value,
                telefono: inputTelefono.value,
                disciplinas: checkboxValues,
                muestras: checkboxValues2
            }
    
            const data = await fetchRequest(url, "POST", alumno);
    
            if(!data.error){
                boton.disabled = false;
                redirectUser("/alumnos/"+data.message.id)
            }
    
        } else {
            // Do nothing!
            boton.disabled = false;
            console.log("Thing was not saved to the database.");
        }
    }

    return(
        <>
            <button type="button" onClick={alumnoSave} className="py-2 px-4 bg-green-700 hover:bg-green-900 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                Crear
            </button>
        </>
    )
}