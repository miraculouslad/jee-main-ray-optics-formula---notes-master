import React from 'react';
import { Compass, Sparkles, CheckCircle2, Split } from 'lucide-react';
import { MathView } from './MathView';
import { FormattedMathText } from './FormattedMathText';

export const SignConventionsView: React.FC = () => {
  const rules = [
    {
      title: '1. Origin of Coordinates (The Zero Point)',
      desc: 'All axial distances along the principal axis are measured strictly from the **Pole ($P$)** for spherical mirrors and single spherical surfaces, or from the **Optical Center ($O$)** for thin lenses.',
      signRule: 'Pole / Optical Center = Origin $(0, 0)$',
    },
    {
      title: '2. Incident Ray Axis (The $+x$ Direction)',
      desc: 'The direction of propagation of incident light rays is defined as **Positive ($+x$)**. Distances measured against the direction of incident light rays are **Negative ($-x$)**.',
      signRule: 'Rays travel left to right $\\implies$ Right is $+$, Left is $-$',
    },
    {
      title: '3. Transverse Heights (The $\\pm y$ Axis)',
      desc: 'Heights measured perpendicular to and above the principal axis are **Positive ($+y$)** (erect). Heights measured perpendicular to and below the axis are **Negative ($-y$)** (inverted).',
      signRule: 'Above axis = $+$, Below axis = $-$',
    },
    {
      title: '4. Real vs. Virtual Definitions',
      desc: '**Real Object:** Diverging incident rays originate from an actual point $\\implies u < 0$.<br/>**Virtual Object:** Incident rays converge toward a point behind the interface $\\implies u > 0$.<br/>**Real Image:** Actual physical intersection of rays. Mirror: $v < 0$ (front). Lens: $v > 0$ (rear).<br/>**Virtual Image:** Apparent intersection of diverged rays. Mirror: $v > 0$ (rear). Lens: $v < 0$ (front).',
      signRule: 'Real Object: $u < 0$ • Real Image: Mirror $v < 0$, Lens $v > 0$',
    },
  ];

  const signTableRows = [
    {
      device: 'Concave Mirror',
      f: 'f < 0',
      u: '|u| > |f|',
      v: 'v < 0',
      m: 'm < 0',
      char: 'Real, Inverted (Diminished if $|u| > 2|f|$, Magnified if $|f| < |u| < 2|f|$)',
    },
    {
      device: 'Concave Mirror',
      f: 'f < 0',
      u: '|u| < |f|',
      v: 'v > 0',
      m: 'm > +1',
      char: 'Virtual, Erect, Magnified (Behind mirror)',
    },
    {
      device: 'Convex Mirror',
      f: 'f > 0',
      u: '\\text{Any } u < 0',
      v: '0 < v < f',
      m: '0 < m < +1',
      char: 'STRICTLY Virtual, Erect, Diminished for ANY real object!',
    },
    {
      device: 'Convex Lens',
      f: 'f > 0',
      u: '|u| > f',
      v: 'v > 0',
      m: 'm < 0',
      char: 'Real, Inverted (Opposite side; $v = +2f$ when $u = -2f$)',
    },
    {
      device: 'Convex Lens',
      f: 'f > 0',
      u: '|u| < f',
      v: 'v < 0',
      m: 'm > +1',
      char: 'Virtual, Erect, Magnified (Same side as object)',
    },
    {
      device: 'Concave Lens',
      f: 'f < 0',
      u: '\\text{Any } u < 0',
      v: '-|f| < v < 0',
      m: '0 < m < +1',
      char: 'STRICTLY Virtual, Erect, Diminished for ANY real object!',
    },
  ];

  const comparativeRows = [
    {
      prop: 'Gaussian Master Relation',
      mirror: '\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}',
      lens: '\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}',
      reason: 'Reflection reverses light direction back to incident side; refraction transmits light across the interface.',
    },
    {
      prop: 'Transverse Magnification m',
      mirror: 'm = -\\frac{v}{u} = \\frac{f}{f - u}',
      lens: 'm = +\\frac{v}{u} = \\frac{f}{f + u}',
      reason: 'In mirrors, real image has $v < 0, u < 0 \\implies m = -\\frac{(-)}{(-)} < 0$ (inverted). In lenses, real image has $v > 0, u < 0 \\implies m = +\\frac{(+)}{(-)} < 0$ (inverted).',
    },
    {
      prop: 'Longitudinal Velocity (dv/dt)',
      mirror: '\\vec{v}_I = -m^2 \\vec{v}_O',
      lens: '\\vec{v}_I = +m^2 \\vec{v}_O',
      reason: 'Differentiating mirror equation gives $dv/du = -m^2$; differentiating lens equation gives $dv/du = +m^2$.',
    },
    {
      prop: '1/v vs. 1/u Linear Plot Slope',
      mirror: '\\text{Slope } = -1 \\quad (\\theta = 135^\\circ)',
      lens: '\\text{Slope } = +1 \\quad (\\theta = 45^\\circ)',
      reason: 'Mirror: $1/v = -1/u + 1/f$. Lens: $1/v = +1/u + 1/f$.',
    },
    {
      prop: 'Optical Power P',
      mirror: 'P = -\\frac{1}{f}',
      lens: 'P = +\\frac{1}{f}',
      reason: 'A converging mirror (concave) has $f < 0$, so $P = -1/f > 0$. A converging lens (convex) has $f > 0$, so $P = +1/f > 0$.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-800/40 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
          <Compass className="w-5 h-5" />
          <span>Master Cartesian Sign Convention & Universal Real/Virtual Systems</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Every equation, derivation, graph, and numerical value in this system strictly adheres to the standard{' '}
          <strong>New Cartesian Sign Convention</strong> mandated by NCERT and tested by JEE Main.
        </p>
      </div>

      {/* 4 Core Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span><FormattedMathText text={rule.title} /></span>
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed">
              <FormattedMathText text={rule.desc} />
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300">
              <FormattedMathText text={rule.signRule} />
            </div>
          </div>
        ))}
      </div>

      {/* Universal Sign Table for Real Objects */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>The 4 Universal Sign Tables for Real Objects (<MathView math="u < 0" />)</span>
        </div>

        <div className="overflow-x-auto custom-math-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-950/80 text-slate-300">
                <th className="p-3">Optical Device</th>
                <th className="p-3 text-center">Focal Length <MathView math="f" /></th>
                <th className="p-3 text-center">Object Pos. <MathView math="u" /></th>
                <th className="p-3 text-center">Image Pos. <MathView math="v" /></th>
                <th className="p-3 text-center">Magnification <MathView math="m" /></th>
                <th className="p-3">Image Character</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {signTableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-200">{row.device}</td>
                  <td className="p-3 text-center text-amber-300 font-mono"><MathView math={row.f} /></td>
                  <td className="p-3 text-center text-slate-300 font-mono"><MathView math={row.u} /></td>
                  <td className="p-3 text-center text-cyan-300 font-mono"><MathView math={row.v} /></td>
                  <td className="p-3 text-center text-emerald-300 font-mono"><MathView math={row.m} /></td>
                  <td className="p-3 text-slate-300"><FormattedMathText text={row.char} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparative Matrix: Mirror vs. Lens */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
          <Split className="w-4 h-4" />
          <span>Master Analytical Comparison: Spherical Mirror vs. Thin Lens</span>
        </div>

        <div className="overflow-x-auto custom-math-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-950/80 text-slate-300">
                <th className="p-3">Property</th>
                <th className="p-3 text-center">Spherical Mirror (Reflection)</th>
                <th className="p-3 text-center">Thin Lens (Refraction)</th>
                <th className="p-3">Mathematical & Physical Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {comparativeRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-200">
                    <FormattedMathText text={row.prop} />
                  </td>
                  <td className="p-3 text-center text-amber-300 font-mono overflow-x-auto custom-math-scrollbar">
                    <MathView math={row.mirror} display={true} />
                  </td>
                  <td className="p-3 text-center text-cyan-300 font-mono overflow-x-auto custom-math-scrollbar">
                    <MathView math={row.lens} display={true} />
                  </td>
                  <td className="p-3 text-slate-300 text-xs">
                    <FormattedMathText text={row.reason} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
