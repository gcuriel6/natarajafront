'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache'

const baseUrl = process.env.API_URL;

export async function login(email, password) {
    const url = baseUrl + "/login";

    let redirectAfterLogin = false;

    const body = JSON.stringify({ email, password })

    const options = {
      method: 'POST',
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      //   'API-Key': process.env.DATA_API_KEY!,
      },
      body,
    };

    try {
      const res = await fetch(url, options)
    
      const data = await res.json()
    
          //if  no error, we set the cookies and redirect at the login screen
      if(!data.error){
        // cookies().set("token", data.token, { expires: 1/48 }); //expires in 30 mins
        const user = data.message;
        cookies().set("token", data.token);

        const logeado = new Date();
        const refresh = new Date();

        const json ={
          nombre: user.nombres,
          apellido: user.apellidos,
          id: user.id,
          perfil: user.id_perfil,
          logeado,
          refresh
        }

        cookies().set("usuario", JSON.stringify(json));

        // redirect("/dashboard");
        redirectAfterLogin = true;
      }
      
      return data;
    } catch (e) {
      console.log("error en: "+url)
      console.log(e)
      const res = {error: true, message: e.message};
    
      return res
    } finally {
      if(redirectAfterLogin){
        redirect("/dashboard");
      }
    }
}

export async function getCookies(name){
  return cookies().get(name).value;
}

export async function redirectUser(url){
  revalidatePath(url) // Update cached info
  redirect(url) // Navigate to the new URL
}

export async function fetchRequest(url, method, params){
  console.log("fetching", url);
  let body = null;
  if(params != null){
    body = JSON.stringify(params);
  }
    
  const token = await getCookies("token");

  const options = {
      method: method,
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'API-Key': token,
      },
      body
    }

    try {
      const res = await fetch(baseUrl+url, options);

      const data = await res.json();
    
      return data
    } catch (e) {
      console.log("error en: "+url)
      console.log(e)
      const res = {error: true, message: e.message};
    
      return res
    }


}

export async function obtenerFecha() {
  // var invdate = new Date(date.toLocaleString('en-US', {
  //   timeZone: ianatz
  // }));

  // // and the diff is 5 hours
  // var diff = date.getTime() - invdate.getTime();

  // // so 12:00 in Toronto is 17:00 UTC
  // return new Date(date.getTime() - diff); // needs to substract

  const thisDate = new Date(); //today (In UTC timezone)
  thisDate.setTime( thisDate.getTime() - thisDate.getTimezoneOffset()*60*1000 ); //Aqui se saca el timezone offset (6 horas) y se le resta
  return thisDate;

}