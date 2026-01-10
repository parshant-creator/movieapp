import AppRouter from "./router/AppRouter"
import SearchProvider from "./context/SearchContext"
import FavoritesProvider from "./context/FavoritesContext"

const App = () => {
  return (
    <SearchProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-gray-950">
          <AppRouter />
        </div>
      </FavoritesProvider>
    </SearchProvider>
  )
}

export default App

