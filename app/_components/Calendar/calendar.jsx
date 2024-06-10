"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';

export default async function Calendar(params) {

    const events = [];

    params.bdays.map(alum=>{
        if(alum.nacimiento != null){

            const birthday = new Date(alum.nacimiento);
            const bdayMonth = birthday.getMonth()+1;
            const month = ("0"+bdayMonth).slice(-2);
            const bdayDay = birthday.getDay();
            const day = ("0"+bdayDay).slice(-2);
            const year = new Date().getFullYear();

            const date = year+"-"+month+"-"+day;

            events.push({
                title: alum.nombres + " " + alum.apellidos,
                date,
                color: "purple"
            })
        }
    })

    params.vigs.map(vig=>{
        if(vig.fin != null){

            //3 days in milliseconds
            const threeDays = (1000 * 60 * 60 * 24 * 3);

            let color = "green";
            let textColor = "white";

            const today = new Date();
            const vigencia = new Date(vig.fin);
            
            const diferencia = vigencia-today;

            if(diferencia < 0){
                color = "red";
            }else{
                if(diferencia < threeDays){
                    color = "yellow";
                    textColor = "black";
                }
            }

            events.push({
                title: vig.nombres + " " + vig.apellidos,
                date: vig.fin,
                color,
                textColor
            })
        }
    })
    
    return (
        <>
            <div className="w-full h-screen">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    weekends={true}
                    contentHeight={"auto"}
                    events={events}
                    locale={esLocale}
                />
            </div>
        </>
    )
}