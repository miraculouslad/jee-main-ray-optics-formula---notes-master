import React from 'react';
import { TrapItem } from '../types';
import { AlertOctagon, CheckCircle2, History, HelpCircle } from 'lucide-react';
import { FormattedMathText } from './FormattedMathText';

interface TrapCardProps {
  trap: TrapItem;
}

export const TrapCard: React.FC<TrapCardProps> = ({ trap }) => {
  const getDangerBadge = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50';
      case 'High':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    }
  };

  const wrongText = trap.wrongThinking || '';
  const pyqText = trap.pyqConnection || '';

  return (
    <div
      id={`trap-${trap.id}`}
      className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4 hover:border-slate-600 transition-colors shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/50 pb-3">
        <h4 className="font-bold text-base text-slate-100 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
          <span><FormattedMathText text={trap.title} /></span>
        </h4>
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${getDangerBadge(trap.dangerLevel)}`}>
          {trap.dangerLevel} Pitfall
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Wrong Thinking / Trap description */}
        <div className="p-3.5 rounded-xl bg-rose-950/25 border border-rose-900/50 space-y-1.5">
          <div className="font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
            <span>Wrong Thinking (-1 Pitfall)</span>
          </div>
          <p className="text-rose-200/90 leading-relaxed">
            <FormattedMathText text={wrongText} />
          </p>
        </div>

        {/* Correct Rule */}
        <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-900/50 space-y-1.5">
          <div className="font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>The Question-Proof Rule (+4)</span>
          </div>
          <div className="text-emerald-200/90 leading-relaxed">
            <FormattedMathText text={trap.correctRule} />
          </div>
        </div>
      </div>

      {/* Why it happens */}
      {trap.why && (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-medium mr-1.5">Why this error occurs:</strong>
            <FormattedMathText text={trap.why} />
          </div>
        </div>
      )}

      {/* PYQ reference */}
      {pyqText && (
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 px-3 py-2 rounded-xl border border-slate-800/80">
          <History className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-slate-300">PYQ Connection: </strong>
            <FormattedMathText text={pyqText} />
          </span>
        </div>
      )}
    </div>
  );
};
