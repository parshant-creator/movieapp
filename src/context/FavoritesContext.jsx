import { useEffect, useState } from "react"
import { FavoritesContext } from "./FavoritesContextValue.jsx"

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  // 🔹 load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  // 🔹 save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.imdbID === movie.imdbID)
      if (exists) return prev
      return [...prev, movie]
    })
  }

  const removeFavorite = (id) => {
    setFavorites((prev) =>
      prev.filter((movie) => movie.imdbID !== id)
    )
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
