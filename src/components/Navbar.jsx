import { useContext, useEffect, useState } from "react"
import { SearchContext } from "../context/SearchContext"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { setSearchText } = useContext(SearchContext)
  const [text, setText] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // 🔍 search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim()) setSearchText(text)
    }, 500)

    return () => clearTimeout(timer)
  }, [text, setSearchText])

  // ⭐ scroll blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50
      px-6 py-4 text-white transition-all duration-300
      ${scrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-black"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* 🔴 Logo */}
        <h1 className="text-red-600 font-extrabold text-3xl md:text-4xl tracking-wider">
          Movie<span className="text-white">App</span>
        </h1>

        {/* 🖥 Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-64 px-4 py-2 rounded bg-gray-800 text-white
                       outline-none focus:ring-2 focus:ring-red-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Link
            to="/favorites"
            className="hover:text-red-400 font-medium"
          >
            ❤️ Favorites
          </Link>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-6 pb-4 space-y-4">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded bg-gray-800 text-white
                       outline-none focus:ring-2 focus:ring-red-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-red-400"
          >
            ❤️ Favorites
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
