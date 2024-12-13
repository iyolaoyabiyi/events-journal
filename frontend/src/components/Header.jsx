import { Link } from "react-router-dom";

import CONFIG from "../../CONFIG";

const Header = () => {
  return (
    <header className="bg-green-100 p-4 sticky top-0 z-10 shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-green-600">{CONFIG.appName}</h1>
      </div>
      <nav className="flex justify-center gap-6 mt-4 uppercase text-sm font-medium text-green-700">
        <Link to="/" className="hover:text-green-900 transition">Journal</Link>
        <Link to="/events" className="hover:text-green-900 transition">Events</Link>
        <Link to="/categories" className="hover:text-green-900 transition">Categories</Link>
      </nav>
    </header>
  )
}

export default Header;