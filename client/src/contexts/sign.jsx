import { createContext, useContext } from "react";

export const SignContext = createContext({
    currComp: 'menu',
    changeCurrComp: ()=>{}
})

export const SignProvider = SignContext.Provider

export default function useSign(){
    return useContext(SignContext)
}