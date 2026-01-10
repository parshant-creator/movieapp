export const searchMovies = async (query, page = 1) => {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=5761eeda&s=${query}&page=${page}`,
    { mode: 'cors' }
  )
  const data = await res.json()
  return {
    movies: data.Search || [],
    totalResults: Number(data.totalResults || 0),
  }
}
