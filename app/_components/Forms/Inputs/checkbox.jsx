export default function InputCheckbox(params) {

    const clase = "form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-pink-500 checked:border-transparent focus:outline-none";
    
    return(
        <>
            <label className="flex items-center mb-3 space-x-3">
                <input
                    type="checkbox"
                    name={params.nombre}
                    id={params.nombre}
                    className={clase}
                    value={params.id}
                    defaultChecked={params.checked==0 ? false : true}
                />
                <span className="font-normal text-gray-700 dark:text-white">
                    {params.nombre}
                </span>
            </label>
        </>
    )
}