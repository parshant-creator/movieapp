export const searchMovies = async (query, page = 1) => {
  const API_KEY = "YOUR_TMDB_API_KEY" // Get from https://www.themoviedb.org/settings/api
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  )
  const data = await res.json()
  return {
    movies: data.results.map(movie => ({
      Title: movie.title,
      Year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      imdbID: movie.id.toString(), // TMDB ID as string
      Poster: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'N/A'
    })),
    totalResults: data.total_results
  }
}
