export default function InputDate(params) {
    return(
        <>
            <input
                type="date"
                id={params.nombre}
                name={params.nombre}
                className={params.clase}
                defaultValue={params.default || ""}
                required
            />
        </>
    )
}