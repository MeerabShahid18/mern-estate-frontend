import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
    setMenuOpen(false); // mobile menu close after search
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, []);

  return (
    <header className="bg-teal-600 shadow-md relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">

        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl flex">
            <span className="text-white">Maskan</span>
            <span className="text-slate-200">Estates</span>
          </h1>
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-2 rounded-lg hidden sm:flex items-center w-64"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-4">
          <Link to="/">
            <li className="text-white hover:underline">Home</li>
          </Link>

          <Link to="/about">
            <li className="text-white hover:underline">About</li>
          </Link>

          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                src={
                  currentUser?.avatar ||
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
                alt="profile"
                className="rounded-full h-8 w-8 object-cover"
              />
            ) : (
              <li className="text-white hover:underline">Sign in</li>
            )}
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-white text-xl" />
            ) : (
              <FaBars className="text-white text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-teal-700 px-4 py-4 flex flex-col gap-4">

          {/* 🔍 Mobile Search */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-2 rounded-lg flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-500" />
            </button>
          </form>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            <li className="text-white">Home</li>
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <li className="text-white">About</li>
          </Link>

          <Link
            to={currentUser ? "/profile" : "/sign-in"}
            onClick={() => setMenuOpen(false)}
          >
            <li className="text-white">
              {currentUser ? "Profile" : "Sign in"}
            </li>
          </Link>
        </div>
      )}
    </header>
  );
}