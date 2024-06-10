'use client'
 
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function MenuLink(params) {
    return(
        <Link key={params.texto} className={linkClass(params.ruta)} href={params.ruta}>
            {params.icono}
            <span className="ml-2 text-sm font-medium">{params.texto}</span>       
        </Link>
    )
}

const linkClass = (ruta) => {
    const pathname = usePathname()

    {/* Aqui se evalua cual menu estara activo */}

    let clase = "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"

    if(ruta == pathname){
        clase = "flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded";
    }

    return clase;
}