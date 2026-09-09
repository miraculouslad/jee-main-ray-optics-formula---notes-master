import React, { useState, useMemo } from 'react';
import { PYQ_COVERAGE_MATRIX } from '../data/pyqMatrixData';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';
import { Table, Search, CheckCircle2, Filter, Sparkles } from 'lucide-react';

export const PyqMatrixView: React.FC = () => {
  const [topicFilter, setTopicFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = ['all', ...Array.from(new Set(PYQ_COVERAGE_MATRIX.map((r) => r.topic)))];

  const filteredRows = useMemo(() => {
    return PYQ_COVERAGE_MATRIX.filter((row) => {
      const matchTopic = topicFilter === 'all' || row.topic === topicFilter;
      if (!matchTopic) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        row.patternId.toLowerCase().includes(q) ||
        row.subConcept.toLowerCase().includes(q) ||
        row.questionConstruction.toLowerCase().includes(q) ||
        row.formulaRequired.toLowerCase().includes(q) ||
        row.commonTrap.toLowerCase().includes(q)
      );
    });
  }, [topicFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Matrix Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-slate-900 border border-emerald-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <Table className="w-5 h-5 text-emerald-400" />
            <span>Complete 2022–2026 JEE Main PYQ Pattern Audit Matrix</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Every distinct question pattern tested by NTA across 2022, 2023, 2024, 2025, and 2026, matched with required formulas, hidden clues, and negative-marking traps.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-200 font-mono">
            {filteredRows.length} Patterns Audited
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pattern ID, sub-concept, formula, or trap..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {topics.map((top) => (
            <button
              key={top}
              onClick={() => setTopicFilter(top)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                topicFilter === top
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {top === 'all' ? 'All Topics' : top}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Table / Cards */}
      <div className="space-y-4">
        {filteredRows.map((row) => (
          <div
            key={row.patternId}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {row.patternId}
                </span>
                <span className="text-xs font-semibold text-slate-300">{row.topic}</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-amber-300 font-medium">{row.subConcept}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {row.yearsObserved}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  row.frequency === 'Extreme'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}>
                  {row.frequency}
                </span>
              </div>
            </div>

            {/* Question Construction & Given Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Exact Question Construction:</div>
                <div className="text-slate-200 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <FormattedMathText text={row.questionConstruction} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Typical Given Data:</div>
                <div className="text-cyan-300 font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full custom-math-scrollbar">
                  <FormattedMathText text={row.typicalData} />
                </div>
              </div>
            </div>

            {/* Formula & Hidden Clue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-amber-200 overflow-x-auto max-w-full custom-math-scrollbar">
                <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">Required Formula</div>
                <MathView math={row.formulaRequired} display={true} />
              </div>

              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-blue-200 space-y-1">
                <div className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Hidden Clue / Insight</div>
                <FormattedMathText text={row.hiddenClue} />
              </div>
            </div>

            {/* Common Trap */}
            <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 flex items-start gap-2">
              <span className="text-rose-400 font-bold uppercase text-[10px] shrink-0 mt-0.5">Common Trap:</span>
              <FormattedMathText text={row.commonTrap} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
