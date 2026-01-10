import { useState } from "react"
import { SearchContext } from "./SearchContextValue.jsx"

const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("")

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
