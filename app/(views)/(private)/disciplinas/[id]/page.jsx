import { Suspense } from "react";
import { fetchRequest } from "@/app/_lib/actions";
import BotonPrint from "../Botones/botonPrint";

export default async function Page({params}) {
    const id = params.id;

    const data = await fetchRequest("/disciplinas/"+id, "GET", null);

    if(data.error){
        return (
          <div>
            <div>No hay alumnos en disciplina seleccionada</div>
            <div>{data.message}</div>
          </div>
        )
    }

    const alumnos = data.message;

    const disciplina = alumnos[0].nombre;

    return (
        <>
            <Suspense>
                <div className="print:w-full">
                    <BotonPrint/>
                    <table className="table p-4 bg-white rounded-lg shadow print:w-full">
                        <thead>
                            <tr>
                                <th colSpan={"2"} className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap text-gray-900">{disciplina}</th>
                            </tr>
                            <tr>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    Nombre
                                </th>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    Telefono
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alumnos.map(function(item, i){
                                    return (
                                        <>
                                            <tr className="text-gray-700">
                                                <td className="border-b-2 p-4 dark:border-dark-5">
                                                    {item.alumno}
                                                </td>
                                                <td className="border-b-2 p-4 dark:border-dark-5">
                                                    {item.telefono}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Suspense>
        </>
    )
}