import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function customHeadersMiddleware(request) {
  let response = NextResponse.next();
  // response.headers.set("X-Custom-Header", "Hello, Middleware!");
  // response.cookies.set("myCookie", "1234");
  // revalidatePath("/(public)", "page");

  const noLogin = ["/about", "/"];
  const publicRoutes = ["/login"];
  const privateRoutes = [
    "/dashboard",
    "/alumnos",
    "/alumnos/:id",
    "/disciplinas",
    "/disciplinas/:id",
    "/movimientos",
    "/movimientos/:id",
    "/mensualidades",
    "/mensualidades/:id",
    "/docentes",
    "/docentes/:id",
  ];

  //evaluando rutas publicas
  for (let i = 0; i < publicRoutes.length; i++) {
    const ruta = publicRoutes[i];
    if (request.nextUrl.pathname.startsWith(ruta)) {
      console.log("estamos en: " + ruta);
      const allCookies = request.cookies.getAll();
      const size = Object.keys(allCookies).length;

      if (size > 0) {
        console.log("se encontraron cookies: " + size);

        allCookies.map((cookie) => {
          console.log("borrando: " + cookie.name);
          response.cookies.delete(cookie.name);
        });
      }
    }
  }

  //evaluando rutas privadas
  for (let i = 0; i < privateRoutes.length; i++) {
    const ruta = privateRoutes[i];

    if (request.nextUrl.pathname.startsWith(ruta)) {
      console.log("estamos en: " + ruta);

      if (request.cookies.has("token")) {
        console.log("si tiene token");

        const usuario = JSON.parse(request.cookies.get("usuario").value);
        const rightnow = new Date();

        const start = new Date(usuario.logeado);
        const end = new Date(rightnow);

        const oneDay = 24 * 60 * 60 * 1000;

        var diff = end.getTime() - start.getTime();

        if (diff / oneDay >= 1) {
          console.log("inactivo mas de 1 dia");
          response = NextResponse.redirect(new URL("/login", request.url));
        }

        // if (diff > 15) {
        //   console.log("inactivo mas de 15 mins");
        //   response = NextResponse.redirect(new URL("/login", request.url));
        // } else {
        //   const json = {
        //     nombre: usuario.nombre,
        //     apellido: usuario.apellido,
        //     id: usuario.id,
        //     perfil: usuario.perfil,
        //     logeado: usuario.logeado,
        //     refresh: rightnow,
        //   };
        //   const token = request.cookies.get("token").value;
        //   response.cookies.set("usuario", JSON.stringify(json));
        //   response.cookies.set("token", token);
        // }
      } else {
        console.log("no tiene token");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return response;

  // publicRoutes.map((val) => {
  //   if (request.nextUrl.pathname.startsWith(val)) {
  //     console.log("we are at " + val);
  //     const allCookies = request.cookies.getAll();
  //     const size = Object.keys(allCookies).length;
  //     if (size > 0) {
  //       console.log("deleting cookies");
  //       allCookies.map((cookie) => {
  //         console.log("borrando: " + cookie.name);
  //         request.cookies.delete(cookie.name);
  //         response.cookies.delete(cookie.name);
  //       });
  //     }
  //   }
  // });

  // let result;

  // for (let i = 0; i < privateRoutes.length; i++) {
  //   const element = privateRoutes[i];

  //   if (request.nextUrl.pathname.startsWith(element)) {
  //     console.log("we are at " + element);
  //     const allCookies = request.cookies.getAll();
  //     const size = Object.keys(allCookies).length;
  //     if (request.cookies.has("token")) {
  //       console.log("si tiene token");

  //       const usuario = JSON.parse(request.cookies.get("usuario").value);
  //       const rightnow = new Date();

  //       const start = new Date(usuario.refresh);
  //       const end = new Date(rightnow);

  //       var diff = (end.getTime() - start.getTime()) / (1000 * 60);
  //       console.log(diff);

  //       if (diff > 15) {
  //         console.log("inactivo mas de 15 mins");
  //         return NextResponse.redirect(new URL("/login", request.url));
  //       } else {
  //         const json = {
  //           nombre: usuario.nombre,
  //           apellido: usuario.apellido,
  //           id: usuario.id,
  //           perfil: usuario.perfil,
  //           logeado: usuario.logeado,
  //           refresh: new Date(),
  //         };

  //         // console.log(json);

  //         response.cookies.set("usuario", JSON.stringify(json));

  //         // console.log(diff);
  //       }

  //       return response;
  //     } else {
  //       console.log("no tiene token");
  //       return NextResponse.redirect(new URL("/login", request.url));
  //     }
  //     // return response;
  //   }
  // }

  // return response;
}
