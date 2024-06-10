export default function InputText(params) {
    return(
        <>
            <input
                type="text"
                id={params.nombre}
                name={params.nombre}
                className={params.clase}
                placeholder={params.placeholder}
                defaultValue={params.default || ""}
                required
            />
        </>
    )
}