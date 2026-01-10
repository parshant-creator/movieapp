import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import MovieCard from "../components/MovieCard"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext)

  if (favorites.length === 0) {
    return (
      <p className="text-gray-400 p-6">
        No favorite movies yet ❤️
      </p>
    )
  }

  return (
    <div className="p-6 pt:24 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Your Favorites
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
