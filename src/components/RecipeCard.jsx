import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;

  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = recipe;

  return (
    <article className="recipe-card border-t border-[#1a1a1a] pt-4 flex flex-col h-full group">
      {/* Category & Cuisine Label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]/60">
          {strArea || 'International'}
        </span>
        {strCategory && (
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5a5a40] bg-[#e5e1da]/60 px-2 py-0.5 rounded-2xs">
            {strCategory}
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link to={`/recipe/${idMeal}`} className="block relative aspect-4/3 overflow-hidden mb-4 bg-[#e5e1da]">
        <img
          src={strMealThumb || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800'}
          alt={strMeal}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800';
          }}
          className="w-full h-full object-cover filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
        />
      </Link>

      {/* Title */}
      <h3 className="font-editorial text-2xl italic font-normal text-[#1a1a1a] group-hover:text-[#5a5a40] transition-colors leading-tight mb-4">
        <Link to={`/recipe/${idMeal}`}>{strMeal}</Link>
      </h3>

      {/* Action Footer */}
      <div className="mt-auto pt-3 border-t border-[#e5e1da] flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest font-mono text-[#1a1a1a]/50">
          ID: #{idMeal}
        </span>

        <Link
          to={`/recipe/${idMeal}`}
          className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-widest text-[#1a1a1a] group-hover:text-[#5a5a40] border-b border-[#1a1a1a] group-hover:border-[#5a5a40] transition-colors pb-0.5"
          aria-label={`View recipe for ${strMeal}`}
        >
          View Recipe
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
