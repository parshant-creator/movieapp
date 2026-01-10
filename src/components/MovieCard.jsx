import { Link } from "react-router-dom"
import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"

const MovieCard = ({ id, title, poster, year }) => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext)

  const isFav = favorites.some((m) => m.imdbID === id)

  const movieObj = {
    imdbID: id,
    Title: title,
    Poster: poster,
    Year: year,
  }

  return (
    <div className="relative w-full">
      {/* ❤️ button */}
      <button
        onClick={() =>
          isFav ? removeFavorite(id) : addFavorite(movieObj)
        }
        className="absolute top-2  right-2 z-10 text-xl"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <Link to={`/movie/${id}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden
                h-full flex flex-col 
                transform transition duration-300 hover:scale-105">

          <img
            src={poster !== "N/A" ? poster : "/no-image.png"}
            alt={title}
            className="w-full h-72 object-cover"
          />

          <div className="p-3 flex-1 flex flex-col justify-between">
            <h2 className="text-sm font-semibold">
              {title}
            </h2>
            <p className="text-gray-400">
              {year}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
