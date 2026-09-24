import React from 'react';
import { ArrowUpRight, Flame, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';

interface CategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  selectedCategory: string | null;
}

export const Categories: React.FC<CategoriesProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section id="categories-section" className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intuitive Discovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Curated collections engineered for modern digital lifestyle and fluid expression.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer self-start md:self-auto"
          >
            <span>View all 24 departments</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 8 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected
                    ? 'ring-3 ring-blue-600 shadow-xl'
                    : 'shadow-sm hover:shadow-xl hover:shadow-slate-900/10'
                }`}
              >
                {/* Background Image with Fallback */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Wash */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent transition-opacity duration-300 group-hover:from-slate-950/95`}
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1">
                  {cat.isSpecial ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-extrabold shadow-sm">
                      <Flame className="w-3 h-3" />
                      {cat.tag}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                      {cat.count}
                    </span>
                  )}
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium">
                      {cat.isSpecial ? cat.count : cat.tag}
                    </p>
                  </div>

                  {/* Circle Arrow Action */}
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-slate-900 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
