import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const API_KEY = "YOUR_TMDB_API_KEY" // Get from https://www.themoviedb.org/settings/api

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
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
        )
        const data = await res.json()

        if (data.success === false) {
          setError(data.status_message)
        } else {
          setMovie({
            Title: data.title,
            Year: data.release_date ? data.release_date.split('-')[0] : 'N/A',
            Rated: 'N/A', // TMDB doesn't have rating like OMDB
            Runtime: data.runtime ? `${data.runtime} min` : 'N/A',
            Genre: data.genres.map(g => g.name).join(', '),
            Director: data.credits?.crew.find(c => c.job === 'Director')?.name || 'N/A',
            Writer: 'N/A',
            Actors: data.credits?.cast.slice(0, 5).map(a => a.name).join(', ') || 'N/A',
            Plot: data.overview,
            Language: data.original_language,
            Country: 'N/A',
            Awards: 'N/A',
            Poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'N/A',
            Ratings: [],
            Metascore: 'N/A',
            imdbRating: data.vote_average,
            imdbVotes: data.vote_count,
            imdbID: data.imdb_id || id,
            Type: 'movie',
            DVD: 'N/A',
            BoxOffice: 'N/A',
            Production: 'N/A',
            Website: 'N/A',
            Response: 'True'
          })
        }
      } catch (err) {
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
