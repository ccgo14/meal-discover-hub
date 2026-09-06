import { useParams, Link } from 'react-router-dom';
import useFetchRecipes from '../hooks/useFetchRecipes';
import {
  ArrowLeft,
  ChefHat,
  MapPin,
  Tag,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Youtube,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { useState } from 'react';

export default function RecipeDetail() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const apiUrl = id ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : null;
  const { data, isLoading, error } = useFetchRecipes(apiUrl);

  const recipe = data?.meals?.[0];

  // Helper to extract non-empty ingredients and measurements safely
  const getIngredients = (item) => {
    if (!item) return [];
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = item[`strIngredient${i}`];
      const meas = item[`strMeasure${i}`];
      if (ing && ing.trim()) {
        const cleanIng = ing.trim();
        const lowerIng = cleanIng.toLowerCase();
        if (lowerIng !== 'null' && lowerIng !== 'none' && lowerIng !== '') {
          const cleanMeas = meas && meas.trim() && meas.trim().toLowerCase() !== 'null' ? meas.trim() : 'To taste';
          list.push({
            ingredient: cleanIng,
            measure: cleanMeas,
          });
        }
      }
    }
    return list;
  };

  const ingredientsList = getIngredients(recipe);

  // Helper to split instructions into steps
  const formatInstructions = (instructionsText) => {
    if (!instructionsText) return [];
    return instructionsText
      .split(/\r?\n/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#1a1a1a]">
      {/* Back Button & Share - Editorial Navbar Bar */}
      <div className="mb-8 pb-4 border-b border-[#1a1a1a] flex items-center justify-between">
        <Link
          to="/results"
          className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#1a1a1a] hover:text-[#5a5a40] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search Results
        </Link>

        {recipe && (
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#1a1a1a] border border-[#1a1a1a] px-3 py-1.5 hover:bg-[#1a1a1a] hover:text-white transition-all cursor-pointer"
            aria-label="Share recipe link"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link Copied!' : 'Share Recipe'}
          </button>
        )}
      </div>

      {/* Loading Skeleton - Editorial Style */}
      {isLoading && (
        <div className="border-t-2 border-[#1a1a1a] pt-6 animate-pulse space-y-8" data-testid="detail-skeleton">
          <div className="h-10 bg-[#e5e1da] rounded-2xs w-2/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-[#e5e1da] w-full" />
            <div className="space-y-4">
              <div className="h-6 bg-[#e5e1da] rounded-2xs w-1/3" />
              <div className="h-4 bg-[#e5e1da] rounded-2xs w-full" />
              <div className="h-4 bg-[#e5e1da] rounded-2xs w-5/6" />
              <div className="h-4 bg-[#e5e1da] rounded-2xs w-4/6" />
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="border border-rose-900/30 bg-rose-50/50 p-10 text-center my-10 max-w-xl mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-800 mx-auto mb-3" />
          <h2 className="font-editorial text-2xl italic text-rose-950 mb-2">Error Loading Recipe</h2>
          <p className="text-xs text-rose-800 font-mono mb-6">{error}</p>
          <Link
            to="/results"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-xs uppercase font-bold tracking-widest hover:bg-[#5a5a40] transition-colors"
          >
            Return to Recipe Search
          </Link>
        </div>
      )}

      {/* Not Found State */}
      {!isLoading && !error && (!data?.meals || data.meals.length === 0) && (
        <div className="border border-[#1a1a1a] p-12 text-center my-10 bg-[#fbfaf8]">
          <ChefHat className="w-10 h-10 text-[#5a5a40] mx-auto mb-3" />
          <h2 className="font-editorial text-3xl italic text-[#1a1a1a] mb-2">Recipe Not Found</h2>
          <p className="text-xs text-[#1a1a1a]/70 mb-6 font-mono">
            We couldn't find a recipe matching ID "{id}". It may have been removed or updated.
          </p>
          <Link
            to="/results"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-xs uppercase font-bold tracking-widest hover:bg-[#5a5a40] transition-colors"
          >
            Browse Other Recipes
          </Link>
        </div>
      )}

      {/* Main Recipe Content - Editorial Layout */}
      {!isLoading && !error && recipe && (
        <article className="space-y-10">
          {/* Header Banner */}
          <div className="border-b-2 border-[#1a1a1a] pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-widest">
              {recipe.strCategory && (
                <span className="bg-[#1a1a1a] text-white px-3 py-1 font-bold">
                  {recipe.strCategory}
                </span>
              )}
              {recipe.strArea && (
                <span className="border border-[#1a1a1a] text-[#1a1a1a] px-3 py-1 font-semibold">
                  {recipe.strArea} Cuisine
                </span>
              )}
              <span className="text-[#1a1a1a]/50 ml-auto">
                Catalog Ref: #{recipe.idMeal}
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal italic leading-tight text-[#1a1a1a]">
              {recipe.strMeal}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Image & Source External Links */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-[#1a1a1a] p-2 bg-[#fbfaf8]">
                <div className="aspect-4/3 overflow-hidden bg-[#e5e1da]">
                  <img
                    src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800'}
                    alt={recipe.strMeal}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800';
                    }}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-3 font-mono text-[11px] uppercase tracking-wider">
                {recipe.strYoutube && (
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-3 bg-[#1a1a1a] hover:bg-[#5a5a40] text-white font-bold transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" />
                      Video Preparation Guide
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {recipe.strSource && (
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white font-semibold transition-all"
                  >
                    <span>Original Recipe Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Col: Ingredients & Instructions */}
            <div className="lg:col-span-7 space-y-10">
              {/* Ingredients List */}
              <section className="border-t border-b border-[#1a1a1a] py-6">
                <h2 className="font-editorial text-2xl italic text-[#1a1a1a] flex items-center justify-between mb-6">
                  <span>Ingredients & Quantities</span>
                  <span className="text-xs font-mono font-normal tracking-widest uppercase text-[#1a1a1a]/50">
                    [{ingredientsList.length} Items]
                  </span>
                </h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {ingredientsList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-baseline justify-between border-b border-[#e5e1da] pb-1.5 text-xs"
                    >
                      <span className="font-semibold text-[#1a1a1a]">{item.ingredient}</span>
                      <span className="font-mono text-[11px] text-[#5a5a40] font-medium">{item.measure}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Cooking Instructions */}
              <section>
                <h2 className="font-editorial text-2xl italic text-[#1a1a1a] mb-6">
                  Preparation Instructions
                </h2>

                <div className="space-y-6 text-sm text-[#1a1a1a]/90 leading-relaxed font-sans">
                  {formatInstructions(recipe.strInstructions).map((paragraph, index) => (
                    <div key={index} className="flex items-start gap-4 border-l-2 border-[#1a1a1a] pl-4 py-1">
                      <span className="font-editorial text-lg italic text-[#5a5a40] font-bold shrink-0">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <p className="flex-1 text-xs sm:text-sm leading-relaxed text-[#1a1a1a]">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
