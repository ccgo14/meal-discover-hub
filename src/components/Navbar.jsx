import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, BookOpen, Compass } from 'lucide-react';

export default function Navbar() {
  const [navSearch, setNavSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/results?query=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbfaf8]/95 backdrop-blur-md border-b border-[#1a1a1a]/15 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Brand Logo - Editorial Style */}
          <Link
            to="/"
            className="flex items-baseline gap-2.5 group shrink-0 focus:outline-hidden rounded-sm p-1"
          >
            <div className="flex items-baseline">
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#1a1a1a]">
                FLAVOR<span className="italic font-normal text-[#5a5a40]">FIND.</span>
              </span>
              <span className="ml-2.5 text-[9px] uppercase tracking-widest text-[#1a1a1a]/50 font-mono hidden sm:inline-block border-l border-[#1a1a1a]/20 pl-2.5">
                TheMealDB Discovery
              </span>
            </div>
            {/* Kept hidden text for tests if required */}
            <span className="sr-only">Flavor Find Home</span>
          </Link>

          {/* Quick Search bar in Navbar - Editorial Bottom Border Style */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-sm mx-4 relative"
            role="search"
          >
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              placeholder="Search recipes..."
              className="w-full pr-8 py-1.5 text-xs font-editorial italic bg-transparent border-b border-[#1a1a1a]/30 focus:border-[#1a1a1a] focus:outline-hidden transition-all text-[#1a1a1a] placeholder-[#1a1a1a]/40"
              aria-label="Quick recipe search"
            />
            <button
              type="submit"
              className="absolute right-0 bottom-1.5 text-xs text-[#1a1a1a] hover:text-[#5a5a40] transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Navigation Links - Editorial Caps & Underline */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-medium py-1 border-b transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#1a1a1a] text-[#1a1a1a] font-bold'
                    : 'border-transparent text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40'
                }`
              }
            >
              <Compass className="w-3.5 h-3.5" />
              Home
            </NavLink>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-medium py-1 border-b transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[#1a1a1a] text-[#1a1a1a] font-bold'
                    : 'border-transparent text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/40'
                }`
              }
            >
              <BookOpen className="w-3.5 h-3.5" />
              Browse All
            </NavLink>
          </nav>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1a1a1a] hover:bg-[#1a1a1a]/5 rounded-sm transition-colors focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1a1a1a]/15 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative px-1">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search by ingredient or name..."
                className="w-full py-2 text-sm font-editorial italic bg-transparent border-b border-[#1a1a1a] focus:outline-hidden text-[#1a1a1a]"
              />
              <button type="submit" className="absolute right-2 top-2 text-[#1a1a1a]">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-col gap-2 pt-2">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-xs uppercase tracking-widest font-medium ${
                    isActive ? 'bg-[#1a1a1a] text-white font-bold' : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/results"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-xs uppercase tracking-widest font-medium ${
                    isActive ? 'bg-[#1a1a1a] text-white font-bold' : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                  }`
                }
              >
                Browse All Recipes
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
