import { useEffect } from "react"
import { useState } from "react"

export const useDebounceSearch=(search,delay=500)=>{
    const [debounceSearch,setDebounceSearch]= useState("")
    useEffect(()=>{
        let timeout= setTimeout(()=>{setDebounceSearch(search)},delay)
        return ()=>clearTimeout(timeout)
    },[search,delay])
    return debounceSearch
}