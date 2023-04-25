import { createContext, useState,Dispatch,SetStateAction, ReactNode } from "react"

interface SearchContextType{
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
    beginSearchFetch:boolean
    setBeginSearchFetch:Dispatch<SetStateAction<boolean>>
}
export const SearchContext = createContext<SearchContextType | null>(null);



export default SearchContext;