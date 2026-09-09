import React, { useState } from 'react';
import { QUESTION_RECOGNITION_TRIGGERS } from '../data/questionRecognitionData';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';
import { Zap, AlertTriangle, Target, History, Search } from 'lucide-react';

export const QuestionRecognitionView: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(QUESTION_RECOGNITION_TRIGGERS.map((t) => t.category)))];

  const filtered = QUESTION_RECOGNITION_TRIGGERS.filter((item) => {
    const matchCat = categoryFilter === 'all' || item.category === categoryFilter;
    if (!matchCat) return false;
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      item.triggerPhrase.toLowerCase().includes(q) ||
      item.underlyingPattern.toLowerCase().includes(q) ||
      item.actionFormula.toLowerCase().includes(q) ||
      item.pitfallToAvoid.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border border-cyan-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>“How to Attack the Question” Recognition Engine</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Train your instincts: map exact NTA question phrasing directly to the mathematical pattern, the 1-step action formula, and the primary pitfall to evade.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-xl bg-cyan-900/40 border border-cyan-700/50 text-cyan-200 font-mono">
          {filtered.length} Recognition Patterns
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trigger phrases, formulas, or patterns..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Triggers' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Recognition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((trigger) => (
          <div
            key={trigger.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-700/50 transition-all space-y-4 shadow-sm"
          >
            {/* Trigger Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  {trigger.category}
                </span>
                <h4 className="font-bold text-sm text-amber-300 mt-1.5 leading-snug">
                  <FormattedMathText text={trigger.triggerPhrase} />
                </h4>
              </div>
            </div>

            {/* Underlying Pattern */}
            <div className="flex items-start gap-2 text-xs">
              <Target className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-medium">Underlying Concept: </span>
                <span className="text-slate-200 font-semibold">
                  <FormattedMathText text={trigger.underlyingPattern} />
                </span>
              </div>
            </div>

            {/* Action Formula */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center text-amber-200 overflow-x-auto max-w-full custom-math-scrollbar">
              <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">
                Direct Action Formula
              </div>
              <div className="text-sm">
                <MathView math={trigger.actionFormula} display={true} />
              </div>
            </div>

            {/* Pitfall to avoid */}
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 font-semibold mr-1">Pitfall to Avoid: </strong>
                <FormattedMathText text={trigger.pitfallToAvoid} />
              </div>
            </div>

            {/* PYQ Evidence */}
            {trigger.pyqEvidence && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                <History className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>
                  <strong className="text-slate-300">PYQ Anchor: </strong>
                  <FormattedMathText text={trigger.pyqEvidence} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
