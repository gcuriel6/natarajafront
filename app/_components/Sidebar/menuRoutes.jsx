// "use client"

import AlumnosIcon from "../Icons/alumnos";
import DashboardIcon from "../Icons/dashboard";
import DisciplinasIcon from "../Icons/disciplinas";
import MensualidadesIcon from "../Icons/mensualidades";
import MovimientosIcon from "../Icons/movimientos";

export const MenuRoutes = [
    {
        texto: 'Home',
        ruta:"/dashboard",
        icono: <DashboardIcon/>,
    },
    {
        texto: 'Alumnos',
        ruta:"/alumnos",
        icono: <AlumnosIcon/>,
    },
    {
        texto: 'Disciplinas',
        ruta:"/disciplinas",
        icono: <DisciplinasIcon/>,
    },
    {
        texto: 'Movimientos',
        ruta:"/movimientos",
        icono: <MovimientosIcon/>,
    },
    {
        texto: 'Mensualidades',
        ruta:"/mensualidades",
        icono: <MensualidadesIcon/>,
    },
  ];