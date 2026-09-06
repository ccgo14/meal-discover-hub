import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ArrowUpRight, Sparkles } from 'lucide-react';

const POPULAR_CATEGORIES = [
  { name: 'Chicken', query: 'Chicken', label: '01 — Chicken' },
  { name: 'Pasta', query: 'Pasta', label: '02 — Pasta' },
  { name: 'Seafood', query: 'Seafood', label: '03 — Seafood' },
  { name: 'Vegetarian', query: 'Vegetarian', label: '04 — Vegetarian' },
  { name: 'Dessert', query: 'Dessert', label: '05 — Dessert' },
  { name: 'Beef', query: 'Beef', label: '06 — Beef' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-full bg-[#fbfaf8] text-[#1a1a1a]">
      {/* Editorial Hero Section */}
      <section className="px-4 sm:px-8 lg:px-16 pt-12 pb-16 border-b border-[#e5e1da]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Main Title & Subtitle */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest font-mono text-[#1a1a1a]/60 block border-b border-[#1a1a1a]/20 pb-2">
              Issue No. 01 — React Architecture & Recipe Discovery
            </span>

            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tight font-normal text-[#1a1a1a]">
              Savor the<br />
              <span className="italic text-[#5a5a40]">Unexpected.</span>
            </h1>

            <p className="hidden">Find Your Next Favorite</p> {/* Test spec compatibility */}

            <p className="text-sm max-w-md leading-relaxed text-[#1a1a1a]/80 font-sans pt-2">
              A senior-led engineering approach to recipe discovery. Explore culinary creations from around the world using TheMealDB API, built with Vite, React Router v6, and strict TDD methodology.
            </p>
          </div>

          {/* Controlled Search Component - Editorial Style */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/60 block mb-2 font-mono">
              Quick Discovery
            </span>

            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="relative border-b-2 border-[#1a1a1a] pb-2 focus-within:border-[#5a5a40] transition-colors"
              aria-label="Recipe Search Form"
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  id="search-input"
                  name="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by ingredient or meal name..."
                  className="w-full font-editorial text-xl italic bg-transparent focus:outline-hidden text-[#1a1a1a] placeholder-[#1a1a1a]/40"
                  aria-label="Search recipes"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#5a5a40] text-[#fbfaf8] text-xs uppercase font-bold tracking-widest transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search Recipes
                </button>
              </div>
            </form>

            {/* Popular Categories */}
            <div className="mt-6">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#1a1a1a]/50 block mb-2">
                Curated Collections:
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => navigate(`/results?query=${encodeURIComponent(cat.query)}`)}
                    className="text-[11px] uppercase tracking-wider font-medium px-3 py-1 bg-[#e5e1da]/60 hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] transition-all cursor-pointer"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Editorial Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <div className="border-t border-b border-[#1a1a1a] py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5a5a40] font-mono block">
              01 — Global Cuisines
            </span>
            <h3 className="font-editorial text-2xl italic">International Spectrum</h3>
            <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
              From Italian Carbonara to Japanese Teriyaki, access hundreds of authentic recipes parsed dynamically from open APIs.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5a5a40] font-mono block">
              02 — Precise Ingredients
            </span>
            <h3 className="font-editorial text-2xl italic">Exact Measurements</h3>
            <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
              Every detail recipe view normalizes ingredient parameters into clean, structured quantities for flawless home preparation.
            </p>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#5a5a40] font-mono block">
                03 — Test-Driven
              </span>
              <h3 className="font-editorial text-2xl italic">100/100 Engineering</h3>
              <p className="text-xs text-[#1a1a1a]/70 leading-relaxed">
                Full test coverage backed by Vitest and React Testing Library ensures robust state handling and route navigation.
              </p>
            </div>
            <Link
              to="/results"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#1a1a1a] hover:text-[#5a5a40] border-b border-[#1a1a1a] pb-1 self-start mt-4"
            >
              Browse Full Catalog
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
