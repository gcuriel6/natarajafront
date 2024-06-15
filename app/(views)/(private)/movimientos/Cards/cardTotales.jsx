import { fetchRequest } from "@/app/_lib/actions";

export default async function CardTotales() {

    const data = await fetchRequest("/movimientosSuma", "GET", null);

    if(data.error){
        return (
          <div>
            <div>No se pueden mostrar los totales</div>
            <div>{data.message}</div>
          </div>
        )
    }

    const totales = data.message[0];

    return(
        <>
            <div className="mb-4">
                <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                    <p className="font-bold text-black text-md dark:text-white">
                        Totales
                    </p>
                    <ul>
                        <li className="flex items-center my-6 space-x-2">
                            <div className="flex flex-col">
                                <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Hoy
                                </span>
                                <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                    {totales.totalHoy}
                                </span>
                            </div>
                        </li>
                        <li className="flex items-center my-6 space-x-2">
                            <div className="flex flex-col">
                                <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Mes
                                </span>
                                <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                    {totales.totalMes}
                                </span>
                            </div>
                        </li>
                        <li className="flex items-center my-6 space-x-2">
                            <div className="flex flex-col">
                                <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Ultimos 30 dias
                                </span>
                                <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                                    {totales.total30}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}