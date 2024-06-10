'use client'
 
import { login } from '@/app/_lib/actions'
import { useState } from 'react'

export default function Page() {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    const [errormessage, seterrormessage] = useState("")
    const [inputs, setInputs] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = login(inputs.email, inputs.password);

        res.then(
            (result) => { 
                if(result?.error){                    
                    seterror(true);
                    seterrormessage(result.message);
                }
            },
            (error) => { 
                console.log(error); // Never executes because the Promise is resolved
            }
        );
    }
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    return (
        <>    
            <div className="w-full h-screen font-sans bg-cover bg-landscape" style={{backgroundImage: `url("/5.svg")`}}>
                <div className="container flex items-center justify-center flex-1 h-full mx-auto">
                    <div className="w-full max-w-lg">
                        <div className="leading-loose">
                            <form className="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25" onSubmit={handleSubmit}>
                                <p className="mb-8 text-2xl font-light text-center text-white">
                                    Iniciar Sesión
                                </p>
                                <div className="mb-2">
                                    <div className=" relative ">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="email"
                                            required 
                                            value={inputs.email || ""}
                                            onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div className=" relative ">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            placeholder="password"
                                            required
                                            value={inputs.password || ""}
                                            onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4">                                    
                                    {error ? <p className="absolute text-sm text-red-500"> {errormessage} </p> : ""}                                                                        
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button type="submit" aria-disabled={loading} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                        Iniciar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}