import { useSearchParams, Link } from 'react-router-dom';
import useFetchRecipes from '../hooks/useFetchRecipes';
import RecipeCard from '../components/RecipeCard';
import { SearchX, AlertCircle, RefreshCw } from 'lucide-react';

export default function Results() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  // TheMealDB API endpoint
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(queryParam)}`;

  const { data, isLoading, error } = useFetchRecipes(apiUrl);

  const meals = data?.meals;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-[#1a1a1a]">
      {/* View Header - Editorial Style */}
      <div className="mb-10 border-b border-[#1a1a1a] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/60 font-mono block mb-1">
            Catalogue Discovery
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl italic text-[#1a1a1a] tracking-tight">
            {queryParam ? (
              <>
                Search Results for <span className="underline decoration-[#5a5a40]">"{queryParam}"</span>
              </>
            ) : (
              'Browse All Recipes'
            )}
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#1a1a1a]/60 mt-2">
            {isLoading
              ? 'Querying TheMealDB library...'
              : meals
              ? `Found ${meals.length} recipe${meals.length === 1 ? '' : 's'}`
              : 'No matching recipes'}
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#1a1a1a] hover:text-[#5a5a40] border-b border-[#1a1a1a] pb-0.5 transition-colors self-start sm:self-auto"
        >
          New Search
        </Link>
      </div>

      {/* Loading Skeleton Grid - Editorial Warm Tones */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="skeleton-grid">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="border-t border-[#1a1a1a] pt-4 animate-pulse space-y-4">
              <div className="h-3 bg-[#e5e1da] rounded-2xs w-1/3" />
              <div className="bg-[#e5e1da] h-52 w-full" />
              <div className="h-6 bg-[#e5e1da] rounded-2xs w-3/4" />
              <div className="h-3 bg-[#e5e1da] rounded-2xs w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error State Handling */}
      {!isLoading && error && (
        <div className="border border-rose-900/30 bg-rose-50/50 p-8 text-center max-w-xl mx-auto my-12" role="alert">
          <AlertCircle className="w-10 h-10 text-rose-800 mx-auto mb-3" />
          <h3 className="font-editorial text-2xl italic text-rose-950 mb-1">Failed to Load Recipes</h3>
          <p className="text-xs text-rose-800 mb-6 font-mono">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-xs uppercase font-bold tracking-widest hover:bg-[#5a5a40] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Query
          </button>
        </div>
      )}

      {/* Empty State ("No recipes found") */}
      {!isLoading && !error && (!meals || meals.length === 0) && (
        <div className="border border-[#1a1a1a] bg-[#fbfaf8] p-12 text-center max-w-2xl mx-auto my-12 shadow-2xs">
          <div className="w-12 h-12 bg-[#e5e1da] text-[#1a1a1a] flex items-center justify-center mx-auto mb-4 border border-[#1a1a1a]/20">
            <SearchX className="w-6 h-6" />
          </div>
          <h2 className="font-editorial text-3xl italic text-[#1a1a1a] mb-2">No recipes found</h2>
          <p className="text-xs text-[#1a1a1a]/70 mb-8 max-w-md mx-auto leading-relaxed">
            We couldn't find any recipes matching <span className="font-semibold text-[#1a1a1a]">"{queryParam}"</span>. Try searching for common ingredients or categories like Chicken, Pasta, Pie, or Curry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/results?query=Chicken"
              className="px-4 py-2 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] font-bold text-xs uppercase tracking-widest transition-all"
            >
              Try "Chicken"
            </Link>
            <Link
              to="/results?query=Pasta"
              className="px-4 py-2 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] font-bold text-xs uppercase tracking-widest transition-all"
            >
              Try "Pasta"
            </Link>
            <Link
              to="/"
              className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#5a5a40] text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* Recipe Grid - Editorial Layout */}
      {!isLoading && !error && meals && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12" data-testid="recipe-grid">
          {meals.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
