'use server'

import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache'

const baseUrl = process.env.API_URL;

export async function login(email, password) {
    const url = baseUrl + "/login";

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

        const router = useRouter()
        router.push("/dashboard")
        // redirect("/dashboard");
      }
      
      return data;
    } catch (e) {
      console.log("error en: "+url)
      console.log(e)
      const res = {error: true, message: e.message};
    
      return res
    }
}

export async function getCookies(name){
  return cookies().get(name).value;
}

export async function redirectUser(url){
  revalidatePath(url) // Update cached info
  const router = useRouter()
  router.push(url)
  // redirect(url) // Navigate to the new URL
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