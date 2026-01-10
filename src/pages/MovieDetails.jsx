import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const API_KEY = "5761eeda"

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        )
        const data = await res.json()

        if (data.Response === "False") {
          setError(data.Error)
        } else {
          setMovie(data)
        }
      } catch {
        setError("Failed to load movie")
      } finally {
        setLoading(false)
      }
    }

    getMovieDetails()
  }, [id])

  if (loading) return <p className="p-6 text-white">Loading...</p>
  if (error) return <p className="p-6 text-red-400">{error}</p>

  return (
    <div className="p-6 pt-24 text-white">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-red-500 px-4 py-1 rounded hover:bg-red-600"
      >
        ← Back
      </button>

      <div className="flex gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
          className="w-300px rounded"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">{movie.Title}</h1>
          <p>Year: {movie.Year}</p>
          <p>Genre: {movie.Genre}</p>
          <p>IMDB Rating: ⭐ {movie.imdbRating}</p>
          <p className="mt-4 text-gray-300">{movie.Plot}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
