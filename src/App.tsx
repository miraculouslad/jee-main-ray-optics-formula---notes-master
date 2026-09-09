// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import {
  FORMULA_DATA,
  CATEGORY_LABELS,
} from './data/opticsNotesData';
import { TOP_30_TRAPS } from './data/top30TrapsData';
import { FormulaCard } from './components/FormulaCard';
import { TrapCard } from './components/TrapCard';
import { OpticsCalculator } from './components/OpticsCalculator';
import { StandaloneHtmlExporter } from './components/StandaloneHtmlExporter';
import { QuestionRecognitionView } from './components/QuestionRecognitionView';
import { PyqMatrixView } from './components/PyqMatrixView';
import { GraphKnowledgeView } from './components/GraphKnowledgeView';
import { RevisionSheetView } from './components/RevisionSheetView';
import { SignConventionsView } from './components/SignConventionsView';
import { MathView } from './components/MathView';
import { FormattedMathText } from './components/FormattedMathText';
import {
  Search,
  BookOpen,
  AlertTriangle,
  Calculator,
  Flame,
  CheckCircle2,
  ListFilter,
  BookmarkCheck,
  Compass,
  Sparkles,
  Zap,
  Table,
  LineChart,
  RotateCcw,
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<
    'conventions' | 'formulas' | 'triggers' | 'matrix' | 'traps' | 'graphs' | 'revision' | 'solver'
  >('formulas');

  // Local persistence for mastered formulas
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('jee_optics_mastered');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jee_optics_mastered', JSON.stringify(Array.from(masteredIds)));
    } catch {
      // ignore
    }
  }, [masteredIds]);

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const markAllMastered = () => {
    const allIds = FORMULA_DATA.map((f) => f.id);
    setMasteredIds(new Set(allIds));
  };

  const resetMastered = () => {
    setMasteredIds(new Set());
  };

  // Filtered formulas
  const filteredFormulas = useMemo(() => {
    return FORMULA_DATA.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchPrimary = item.primaryLatex.toLowerCase().includes(q);
      const matchVariations = item.variations.some(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.latex.toLowerCase().includes(q) ||
          v.condition.toLowerCase().includes(q) ||
          (v.note && v.note.toLowerCase().includes(q))
      );
      const matchTraps = item.ntaTraps.some((t) => t.toLowerCase().includes(q));
      const matchClues = (item.questionRecognition || []).some((c) => c.toLowerCase().includes(q));

      return matchTitle || matchDesc || matchPrimary || matchVariations || matchTraps || matchClues;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered traps
  const filteredTraps = useMemo(() => {
    return TOP_30_TRAPS.filter((trap) => {
      const matchCategory = selectedCategory === 'all' || trap.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const wrong = (trap.wrongThinking || '').toLowerCase();
      const pyq = (trap.pyqConnection || '').toLowerCase();
      return (
        trap.title.toLowerCase().includes(q) ||
        wrong.includes(q) ||
        trap.correctRule.toLowerCase().includes(q) ||
        pyq.includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const progressPercent = Math.round((masteredIds.size / FORMULA_DATA.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Banner Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  JEE Main Ray Optics
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold tracking-wide">
                  Question-Proof Handbook
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Master Formulas, Derivations, 2022–2026 PYQ Matrix, Top 30 Traps & Attack Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StandaloneHtmlExporter />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1 w-full">
        {/* Progress & Quick Stats Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Progress Card */}
          <div className="md:col-span-2 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-300">
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                <span>Revision Mastery Tracker</span>
              </div>
              <span className="text-amber-300 font-mono font-bold">
                {masteredIds.size} / {FORMULA_DATA.length} Modules ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <button
                onClick={markAllMastered}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Mark all as mastered
              </button>
              <button
                onClick={resetMastered}
                className="hover:text-slate-200 transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stat 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">5-Year PYQ Pool</div>
              <div className="text-lg font-bold text-slate-100">156 Questions</div>
              <div className="text-[11px] text-rose-300">#3 Most Asked in Physics</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Total Formula Network</div>
              <div className="text-lg font-bold text-slate-100">45+ Variations</div>
              <div className="text-[11px] text-cyan-300">100% NTA Question-Proof</div>
            </div>
          </div>
        </div>

        {/* Search and Navigation Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, variations, traps (e.g., silvered, Bessel, immersion, 4x, TIR, telescope)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0 text-xs overflow-x-auto">
              <button
                onClick={() => setViewMode('conventions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'conventions'
                    ? 'bg-sky-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Sign Conventions</span>
              </button>

              <button
                onClick={() => setViewMode('formulas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'formulas'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>12 Modules</span>
              </button>

              <button
                onClick={() => setViewMode('triggers')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'triggers'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Attack System</span>
              </button>

              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'matrix'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>PYQ Matrix</span>
              </button>

              <button
                onClick={() => setViewMode('traps')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'traps'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Top 30 Traps</span>
              </button>

              <button
                onClick={() => setViewMode('graphs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'graphs'
                    ? 'bg-indigo-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>Graphs</span>
              </button>

              <button
                onClick={() => setViewMode('revision')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'revision'
                    ? 'bg-purple-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>10-Min Sheet</span>
              </button>

              <button
                onClick={() => setViewMode('solver')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'solver'
                    ? 'bg-blue-500 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Verifier</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips for Formula / Traps views */}
          {(viewMode === 'formulas' || viewMode === 'traps') && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 mr-1">
                Modules:
              </span>
              {Object.entries(CATEGORY_LABELS).map(([key, data]) => {
                const isActive = selectedCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1.5 rounded-xl border whitespace-nowrap font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {data.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* View Mode 0: Master Cartesian Sign Conventions & Comparison Tables */}
        {viewMode === 'conventions' && (
          <SignConventionsView />
        )}

        {/* View Mode 1: Main Formulas & Variations */}
        {viewMode === 'formulas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Showing {filteredFormulas.length} of {FORMULA_DATA.length} Modules</span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset category filter</span>
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredFormulas.map((item) => (
                <FormulaCard
                  key={item.id}
                  item={item}
                  isMastered={masteredIds.has(item.id)}
                  onToggleMastered={toggleMastered}
                />
              ))}

              {filteredFormulas.length === 0 && (
                <div className="text-center py-16 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <Search className="w-8 h-8 text-slate-600 mx-auto" />
                  <div className="text-base font-semibold text-slate-300">No formulas match your search "{searchQuery}"</div>
                  <p className="text-xs text-slate-500">Try searching for keywords like "silvered", "displacement", "immersion", or "microscope".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Mode 2: "How to Attack the Question" Recognition Engine */}
        {viewMode === 'triggers' && (
          <QuestionRecognitionView />
        )}

        {/* View Mode 3: 2022–2026 PYQ Pattern Audit Matrix */}
        {viewMode === 'matrix' && (
          <PyqMatrixView />
        )}

        {/* View Mode 4: Top 30 Traps Database */}
        {viewMode === 'traps' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-rose-300">Top 30 Negative-Marking Traps (NTA Pitfall Defense)</h3>
                <p className="text-xs text-rose-200/80 mt-1 leading-relaxed">
                  Every entry breaks down the student's instinctive wrong thinking, the strict mathematical rule, why the misconception happens, and the exact PYQ shifts where NTA tested it.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredTraps.map((trap) => (
                <TrapCard key={trap.id} trap={trap} />
              ))}

              {filteredTraps.length === 0 && (
                <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <p className="text-slate-400 text-sm">No traps found for the selected filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Mode 5: High-Yield Graphs Breakdown */}
        {viewMode === 'graphs' && (
          <GraphKnowledgeView />
        )}

        {/* View Mode 6: 10-Minute Rapid Revision Sheet */}
        {viewMode === 'revision' && (
          <RevisionSheetView />
        )}

        {/* View Mode 7: Interactive Numerical Solver */}
        {viewMode === 'solver' && (
          <div className="space-y-6">
            <OpticsCalculator />
          </div>
        )}

        {/* High-Yield Strategy Guide Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>NTA Ray Optics Mental Decision Map (3-Second Exam Rules)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-amber-300 block mb-1">1. Immersed Lens in Liquid?</strong>
              <span>
                Immediately write multiplier <MathView math="\frac{f_m}{f_a} = \frac{(\mu_L - 1)\mu_m}{\mu_L - \mu_m}" />. If glass in water: instant <strong>4x</strong> focal length.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-amber-300 block mb-1">2. Two Sharp Images with Same Size?</strong>
              <span>
                Convex lens: one is real, one is virtual. Direct formula: focal length <MathView math="f = \frac{u_1 + u_2}{2}" />!
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <strong className="text-amber-300 block mb-1">3. Silvered Lens of Any Type?</strong>
              <span>
                System is a MIRROR! Write <MathView math="P_{eq} = 2P_L + P_M" />, set <MathView math="F_{eq} = -1/P_{eq}" />, and use <MathView math="\frac{1}{v} + \frac{1}{u} = \frac{1}{F_{eq}}" />.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span>JEE Main Ray Optics Question-Proof Master Notes (2022–2026 PYQ Audit Edition)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Audit Base: 2022–2026 PYQ Database</span>
            <span>•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
