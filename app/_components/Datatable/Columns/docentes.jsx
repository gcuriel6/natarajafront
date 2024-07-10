"use client"

import Link from "next/link";
import EditarIcon from "../../Icons/editar";

export const docentescolumns = [
    {
      name: 'Nombres',
      selector: row => row.nombres,
      sortable: true,
    },
    {
      name: 'Apellidos',
      selector: row => row.apellidos,
      sortable: true,
    },
    {
      name: 'Telefono',
      selector: row => row.telefono,
    },
    {
      name: 'Nacimiento',
      selector: row => row.nacimiento,
      sortable: true,
    },
    {
      name: "Editar",
      cell: row => (
        <Link href={"/docentes/"+row.id}>
          <EditarIcon />
        </Link>
      )
      // cell: (<EditarIcon id={row => row.id}/>)
    }
  ];