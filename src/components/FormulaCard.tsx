import React, { useState } from 'react';
import { FormulaItem } from '../types';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';
import {
  CheckCircle,
  Circle,
  Copy,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  History,
  Target,
  Sparkles,
  BookOpen,
  CheckCheck,
  Zap,
} from 'lucide-react';

interface FormulaCardProps {
  item: FormulaItem;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({
  item,
  isMastered,
  onToggleMastered,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAllVariations, setShowAllVariations] = useState(true);
  const [showArchetype, setShowArchetype] = useState(false);

  const handleCopyLatex = (latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFreqBadge = (freq: string) => {
    switch (freq) {
      case 'Extreme':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
      case 'Very High':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
      case 'High':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/40';
      default:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div
      id={`formula-${item.id}`}
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isMastered
          ? 'bg-slate-900/60 border-emerald-500/30 shadow-sm'
          : 'bg-slate-800/80 border-slate-700/80 hover:border-slate-600 shadow-md'
      }`}
    >
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-700/50 bg-slate-800/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleMastered(item.id)}
            className="flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer group"
            title={isMastered ? 'Mark as not mastered' : 'Mark as mastered'}
          >
            {isMastered ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5 text-slate-500 group-hover:text-slate-300" />
            )}
            <span className={isMastered ? 'text-emerald-400 font-semibold' : 'text-slate-400 group-hover:text-slate-200'}>
              {isMastered ? 'Mastered' : 'Mark Mastered'}
            </span>
          </button>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold tracking-wide ${getFreqBadge(item.pyqFrequency)}`}>
            {item.pyqFrequency} Frequency
          </span>
          {item.pyqClassification && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
              {item.pyqClassification}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-700/60">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>PYQs: {item.recentYears.join(', ')}</span>
          </div>
          <button
            onClick={() => handleCopyLatex(item.primaryLatex)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-100 bg-slate-900/60 hover:bg-slate-700/60 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
            title="Copy LaTeX formula"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'LaTeX'}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Title and Description */}
        <div>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight">{item.title}</h3>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            <FormattedMathText text={item.description} />
          </p>
        </div>

        {/* When to Use It (Mandatory Hierarchy Element) */}
        {item.whenToUse && (
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200 flex items-start gap-2.5">
            <Target className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-300 uppercase tracking-wider font-mono mr-1.5">When to Use:</strong>
              <FormattedMathText text={item.whenToUse} />
            </div>
          </div>
        )}

        {/* Primary Master Equation Display */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 flex flex-col items-center justify-center text-center shadow-inner relative group max-w-full overflow-hidden">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">Master Formula</div>
          <div className="text-xl sm:text-2xl text-amber-300 font-serif w-full max-w-full overflow-x-auto custom-math-scrollbar">
            <MathView math={item.primaryLatex} display={true} />
          </div>
          {item.practicalRule && (
            <div className="mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-2 w-full text-center italic">
              <span className="text-amber-400/90 font-medium">Exam Speed Rule: </span>{' '}
              <FormattedMathText text={item.practicalRule} />
            </div>
          )}
        </div>

        {/* What each symbol means (Glossary) */}
        {item.variables.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Symbol Definitions & Signs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.variables.map((v, i) => (
                <div key={i} className="flex items-start gap-2 text-xs bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-amber-300 font-mono font-semibold min-w-[32px]">
                    <MathView math={v.symbol} />
                  </span>
                  <span className="text-slate-300 leading-snug">
                    <FormattedMathText text={v.meaning} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Derived Forms */}
        {item.derivedForms && item.derivedForms.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Step Derived Forms</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.derivedForms.map((df, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1.5">
                  <div className="font-semibold text-xs text-purple-200">{df.title}</div>
                  <div className="py-1 px-2 rounded bg-slate-950 border border-slate-800 text-center text-amber-200 text-sm">
                    <MathView math={df.latex} display={true} />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    <FormattedMathText text={df.explanation} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Recognition Triggers */}
        {item.questionRecognition && item.questionRecognition.length > 0 && (
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/40 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Question Recognition Clues (Instant Pattern Triggers)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-cyan-200/90">
              {item.questionRecognition.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">▸</span>
                  <span><FormattedMathText text={clue} /></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* All Important Variations */}
        {item.variations.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>All Variations & Special Conditions ({item.variations.length})</span>
              </h4>
              <button
                onClick={() => setShowAllVariations(!showAllVariations)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <span>{showAllVariations ? 'Collapse' : 'Expand All'}</span>
                {showAllVariations ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showAllVariations && (
              <div className="grid grid-cols-1 gap-3">
                {item.variations.map((variation) => (
                  <div
                    key={variation.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-slate-600 transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold text-sm text-slate-200">{variation.title}</div>
                      <div className="flex items-center gap-1.5">
                        {variation.status && (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium border ${
                            variation.status === 'Verified PYQ'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                              : 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                          }`}>
                            {variation.status}
                          </span>
                        )}
                        {variation.pyqRef && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
                            {variation.pyqRef}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-2 px-3 rounded-lg bg-slate-950 border border-slate-800/90 text-center overflow-x-auto text-amber-200">
                      <MathView math={variation.latex} display={true} />
                    </div>

                    <div className="text-xs space-y-1 text-slate-400">
                      <div>
                        <strong className="text-slate-300">Condition: </strong>
                        <FormattedMathText text={variation.condition} />
                      </div>
                      {variation.note && (
                        <div>
                          <strong className="text-amber-400/90">Physics Rule: </strong>
                          <FormattedMathText text={variation.note} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Common Traps Section */}
        {item.ntaTraps.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>NTA Negative-Marking Traps to Avoid</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-200/90">
              {item.ntaTraps.map((trap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <FormattedMathText text={trap} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Limiting & Boundary Cases */}
        {item.limitingCases && item.limitingCases.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Extreme-Case Sanity Checks (Limiting Boundaries)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.limitingCases.map((lc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-950/15 border border-amber-900/30 text-xs space-y-1">
                  <div className="font-semibold text-amber-300">{lc.caseName}</div>
                  <div className="text-slate-300 font-mono text-[11px] py-1">
                    <MathView math={lc.latex} />
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <FormattedMathText text={lc.result} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mini Archetype Section (Collapsible) */}
        {item.archetype && (
          <div className="border border-slate-700/70 rounded-xl overflow-hidden bg-slate-900/50">
            <button
              onClick={() => setShowArchetype(!showArchetype)}
              className="w-full p-3.5 text-left flex items-center justify-between bg-slate-800/40 hover:bg-slate-800/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Mini Archetype Problem & Step-by-Step Attack</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span>{showArchetype ? 'Hide Solution' : 'View Worked Example'}</span>
                {showArchetype ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </button>

            {showArchetype && (
              <div className="p-4 space-y-3 text-xs border-t border-slate-700/50 bg-slate-950/40">
                <div>
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Problem Statement:</span>
                  <p className="mt-1 text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    <FormattedMathText text={item.archetype.question} />
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 text-[11px]">Given Data: </span>
                  <span className="font-mono text-cyan-300">
                    <MathView math={item.archetype.givenData} />
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Step-by-Step Solution:</span>
                  <ol className="mt-1 space-y-1.5 pl-4 list-decimal text-slate-300">
                    {item.archetype.solutionSteps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        <FormattedMathText text={step} />
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 font-semibold flex items-center justify-between">
                  <span>Final Answer:</span>
                  <span className="font-mono text-sm text-emerald-300">
                    <MathView math={item.archetype.finalAnswer} />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
