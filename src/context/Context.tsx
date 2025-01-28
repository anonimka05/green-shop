import { createContext, ReactNode, useEffect, useState } from "react"
import { ContextType } from "../types/ContextType"

export const Context = createContext<ContextType>({
    token:null,
    setToken:() => null
})

export const AuthContext = ({children}:{children:ReactNode}) => {
    const [token, setToken] = useState<null | string>(localStorage.getItem("token") || null)

    useEffect(() => {
        if(token){
            localStorage.setItem("token", token)
        }
    },[token])
    return (
        <Context.Provider value={{token, setToken}}>{children}</Context.Provider>
    )
}