"use client"

import Link from "next/link";
import EditarIcon from "../../Icons/editar";

export const mensualidadescolumns = [
    {
      name: 'Alumno',
      selector: row => row.nombres+" "+row.apellidos,
      sortable: true,
    },
    {
      name: 'Inicio',
      selector: row => row.inicio,
      sortable: true,
    },
    {
      name: 'Fin',
      selector: row => row.fin,
      sortable: true,
    },
    {
        name: 'Cantidad',
        selector: row => row.cantidad,
        sortable: true,
    },
    // {
    //   name: 'Tipo',
    //   selector: row => row.tipo,
    //   sortable: true,
    //   style: {backgroundColor: "#ff9999"},
    //   conditionalCellStyles: [
    //     {
    //       when: row => row.tipo == "Ingreso",
    //       style: {backgroundColor: "#9eff99"},
    //     }
    //   ],
    // },
    // {
    //   name: "Detalle",
    //   cell: row => (
    //     <Link href={"/alumnos/"+row.id}>
    //       <EditarIcon />
    //     </Link>
    //   )
    //   // cell: (<EditarIcon id={row => row.id}/>)
    // }
  ];