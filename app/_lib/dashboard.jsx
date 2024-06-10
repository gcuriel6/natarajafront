'use server'

import { cookies } from "next/headers";

// export async function birthdays(){

//     const token = cookies().get("token");

//     if(token.value == ""){
//         return null
//     }

//     const baseUrl = process.env.API_URL;
//     const url = baseUrl + "/birthdays";
  
//     const body = JSON.stringify()
  
//     const options = {
//       method: 'POST',
//     //   cache: "no-store",
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Key': token.value,
//       },
//     //   body,
//     };

//     // console.log(options)
//     // console.log(token)
//     // console.log(baseUrl)
//     // console.log(url)

//     return {options, token, baseUrl, url};
  
//     // const res = await fetch(url, options)
      
//     // const data = await res.json()
  
//     // return data
// }

export async function birthdays() {
    const baseUrl = process.env.API_URL;
    const url = baseUrl + "/birthdays";

    const res = await fetch(url, {
        method: 'GET',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        //   'API-Key': process.env.DATA_API_KEY!,
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    const users = await res.json()
   
    // return users
    console.log(users)
  }