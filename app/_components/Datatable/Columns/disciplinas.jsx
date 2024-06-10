"use client"

import Link from "next/link";
import EditarIcon from "../../Icons/editar";

export const disciplinascolumns = [
    {
      name: 'Nombres',
      selector: row => row.nombres,
      sortable: true,
    },
    {
      name: 'Alumnos',
      selector: row => row.alumnos,
      sortable: true,
    },
    {
      name: "Informacion",
      cell: row => (
        <Link href={"/disciplinas/"+row.id}>
          <EditarIcon />
        </Link>
      )
      // cell: (<EditarIcon id={row => row.id}/>)
    }
  ];