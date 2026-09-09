import React, { useState } from 'react';
import { RAPID_REVISION_ITEMS } from '../data/revisionSheetData';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';
import { Zap, AlertCircle, Eye, CheckCircle2, Filter } from 'lucide-react';

export const RevisionSheetView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'RED_MEMORIZE' | 'YELLOW_UNDERSTAND' | 'GREEN_RECOGNIZE'>('ALL');

  const filteredItems = RAPID_REVISION_ITEMS.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.mustType === activeFilter;
  });

  const getBadge = (type: string) => {
    switch (type) {
      case 'RED_MEMORIZE':
        return {
          label: '🔴 MUST MEMORIZE',
          classes: 'bg-rose-950 text-rose-300 border-rose-800',
        };
      case 'YELLOW_UNDERSTAND':
        return {
          label: '🟡 MUST UNDERSTAND',
          classes: 'bg-amber-950 text-amber-300 border-amber-800',
        };
      case 'GREEN_RECOGNIZE':
        return {
          label: '🟢 MUST RECOGNIZE',
          classes: 'bg-emerald-950 text-emerald-300 border-emerald-800',
        };
      default:
        return { label: '', classes: '' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>10-Minute Rapid Revision Sheet (Red / Yellow / Green Triage)</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            High-density revision card designed for pre-exam recall: 🔴 formulas you must have memorized cold, 🟡 mechanisms you must understand derivationally, and 🟢 phrasing you must instantly recognize.
          </p>
        </div>

        {/* Triage Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'ALL'
                ? 'bg-slate-200 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveFilter('RED_MEMORIZE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'RED_MEMORIZE'
                ? 'bg-rose-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-rose-400 hover:bg-rose-950/40 border border-rose-900/60'
            }`}
          >
            🔴 Memorize
          </button>
          <button
            onClick={() => setActiveFilter('YELLOW_UNDERSTAND')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'YELLOW_UNDERSTAND'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-amber-400 hover:bg-amber-950/40 border border-amber-900/60'
            }`}
          >
            🟡 Understand
          </button>
          <button
            onClick={() => setActiveFilter('GREEN_RECOGNIZE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'GREEN_RECOGNIZE'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-900/60'
            }`}
          >
            🟢 Recognize
          </button>
        </div>
      </div>

      {/* Grid of Rapid Flash Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => {
          const badge = getBadge(item.mustType);
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.classes}`}>
                    {badge.label}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-100">{item.topic}</h4>

                <div className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-amber-200">
                  <MathView math={item.latex} display={true} />
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                <span className="font-semibold text-amber-300">Rule: </span>
                <FormattedMathText text={item.oneLineRule} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
