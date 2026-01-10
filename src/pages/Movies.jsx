import { useEffect, useState, useContext } from "react"
import MovieCard from "../components/MovieCard"
import SkeletonCard from "../components/SkeletonCard"
import { searchMovies } from "../services/omdb"
import { SearchContext } from "../context/SearchContextValue"

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
      try {
        const data = await searchMovies(query, page)
        setMovies(data.movies)
        setTotalResults(data.totalResults)
      } catch (error) {
        console.error("API failed:", error)
        setMovies([
          { Title: "Inception", Year: "2010", imdbID: "tt1375666", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
          { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
          { Title: "Interstellar", Year: "2014", imdbID: "tt0816692", Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" },
          { Title: "Parasite", Year: "2019", imdbID: "tt6751668", Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjEwZTQtNTY4ZS00Njk4LTg1ZjItNDU4ZDMwNjk2YWY3XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_SX300.jpg" },
          { Title: "Pulp Fiction", Year: "1994", imdbID: "tt0110912", Poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
          { Title: "The Shawshank Redemption", Year: "1994", imdbID: "tt0111161", Poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg" },
          { Title: "Forrest Gump", Year: "1994", imdbID: "tt0109830", Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" },
          { Title: "The Matrix", Year: "1999", imdbID: "tt0133093", Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
          { Title: "Titanic", Year: "1997", imdbID: "tt0120338", Poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg" },
          { Title: "Avatar", Year: "2009", imdbID: "tt0499549", Poster: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzAxXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg" }
        ])
        setTotalResults(10)
      }
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
