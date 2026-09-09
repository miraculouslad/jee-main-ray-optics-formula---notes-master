import React from 'react';
import { GRAPH_KNOWLEDGE } from '../data/graphKnowledgeData';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';
import { LineChart, Compass, Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export const GraphKnowledgeView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 to-slate-900 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <LineChart className="w-5 h-5 text-indigo-400" />
            <span>High-Yield Ray Optics Graphs & Analytical Geometry</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Direct breakdown of the four graphs repeatedly tested by NTA: mathematical curves, asymptotic boundaries, slope interpretations, and exact question formats.
          </p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-xl bg-indigo-900/40 border border-indigo-700/50 text-indigo-200 font-mono">
          4 Essential Graphs
        </div>
      </div>

      {/* Grid of Graph Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GRAPH_KNOWLEDGE.map((g) => (
          <div
            key={g.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-800/60 transition-all space-y-4 shadow-sm"
          >
            {/* Title */}
            <div className="border-b border-slate-800 pb-3">
              <h4 className="font-bold text-base text-slate-100">{g.title}</h4>
              <div className="text-xs text-indigo-300 mt-1 font-mono">
                <FormattedMathText text={g.axes} />
              </div>
            </div>

            {/* LaTeX Equation */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-amber-200">
              <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">Governing Equation</div>
              <MathView math={g.latexEquation} display={true} />
            </div>

            {/* Key Critical Points */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Critical Coordinate Points</span>
              </span>
              <ul className="space-y-1 pl-2 text-slate-300">
                {g.keyPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><FormattedMathText text={pt} /></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Asymptotes */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 space-y-1">
              <strong className="text-amber-300 font-mono text-[11px] block">Asymptotes & Boundaries:</strong>
              <FormattedMathText text={g.asymptotes} />
            </div>

            {/* What NTA Asks */}
            <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200 space-y-1">
              <strong className="text-indigo-300 font-bold uppercase text-[10px] block">What NTA Tests From This Graph:</strong>
              <FormattedMathText text={g.ntaQuestions} />
            </div>

            {/* Physical Interpretation */}
            <div className="text-xs text-slate-400 italic border-t border-slate-800 pt-2">
              <span className="text-slate-300 font-semibold not-italic">Physical Takeaway: </span>
              <FormattedMathText text={g.interpretation} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
