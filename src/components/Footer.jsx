import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#fbfaf8] text-[#1a1a1a] border-t border-[#1a1a1a]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#e5e1da]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-editorial text-xl font-bold tracking-tight text-[#1a1a1a]">
                FLAVOR<span className="italic font-normal text-[#5a5a40]">FIND.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/50 font-mono">
                Issue No. 01 — Recipe Discovery
              </span>
            </div>
            <p className="text-xs text-[#1a1a1a]/70 leading-relaxed max-w-md">
              A refined culinary discovery experience built with TheMealDB API. Explore curated international recipes, ingredient breakdowns, and step-by-step preparation guides.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/50 block mb-3">
              Navigation
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="text-[#1a1a1a] hover:underline transition-all">
                  Home & Recipe Search
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-[#1a1a1a] hover:underline transition-all">
                  Browse All Recipes
                </Link>
              </li>
              <li>
                <Link to="/results?query=Seafood" className="text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:underline transition-all">
                  Seafood Selection
                </Link>
              </li>
              <li>
                <Link to="/results?query=Vegetarian" className="text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:underline transition-all">
                  Vegetarian Dishes
                </Link>
              </li>
            </ul>
          </div>

          {/* Project Specs */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/50 block mb-3">
              Engineering Specs
            </span>
            <p className="text-xs text-[#1a1a1a]/70 leading-relaxed mb-3">
              Moringa School Phase 1 Capstone Project. Built with React, Vite, React Router v6, Tailwind CSS, and Vitest.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-[#1a1a1a] text-[#fbfaf8] text-[10px] uppercase tracking-wider font-mono px-2.5 py-1">
                API: TheMealDB v1
              </span>
              <span className="inline-block border border-[#1a1a1a]/30 text-[#1a1a1a] text-[10px] uppercase tracking-wider font-mono px-2.5 py-1">
                Conventionally Committed
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 gap-3">
          <div>© {new Date().getFullYear()} FlavorFind Recipe Discovery</div>
          <div className="flex items-center gap-1.5 font-mono">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#5a5a40] fill-[#5a5a40]" />
            <span>for Moringa School Capstone</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
