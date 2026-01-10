import { useEffect, useState, useContext } from "react"
import MovieCard from "../components/MovieCard"
import SkeletonCard from "../components/SkeletonCard"
import { searchMovies } from "../services/omdb"
import { SearchContext } from "../context/SearchContext"

const DEFAULT_QUERIES = [
  "batman",
  "spiderman",
  "harry potter",
  "iron man",
  "matrix",
  "star wars",
]

const Movies = () => {
  const { searchText } = useContext(SearchContext)

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // 🔹 search change par page reset
  useEffect(() => {
    setPage(1)
  }, [searchText])

  // 🔹 movies fetch
  useEffect(() => {
    const query =
      searchText === ""
        ? DEFAULT_QUERIES[
            Math.floor(Math.random() * DEFAULT_QUERIES.length)
          ]
        : searchText

    const getMovies = async () => {
      setLoading(true)
      const data = await searchMovies(query, page)
      setMovies(data.movies)
      setTotalResults(data.totalResults)
      setLoading(false)
    }

    getMovies()
  }, [searchText, page])

  return (
    <div className="p-6 pt-24 text-white">

      {/* 🔹 helper text */}
      {!searchText && (
        <p className="text-gray-400 mb-4">
          Start typing in the search box to find movies 🎬
        </p>
      )}

      {/* 🔹 search heading */}
      {searchText && (
        <h1 className="text-3xl font-bold mb-6">
          Search Result: {searchText}
        </h1>
      )}

      {/* 🔹 grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                id={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                year={movie.Year}
              />
            ))}
      </div>

      {/* 🔹 PAGINATION UI */}
      {totalResults > 10 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-gray-300">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * 10 >= totalResults}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

    </div>
  )
}

export default Movies
