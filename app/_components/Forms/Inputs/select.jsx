export default async function InputSelect(params) {

    return(
        <>
            <select 
                id={params.nombre}
                name={params.nombre}
                className={params.clase}
                required
                defaultValue={params.default || ""}
                >
                    <option disabled value={""}>...</option>
                    {
                        params.datos.map(dato=>{
                            const dat = Object.values(dato);
                            return (
                                <option
                                    key={dat[0]}
                                    value={dat[0]}
                                >
                                    {dat[1]}
                                </option>
                            )
                        })
                    }
            </select>
        </>
    )
}