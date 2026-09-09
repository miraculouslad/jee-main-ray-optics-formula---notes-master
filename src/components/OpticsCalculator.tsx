import React, { useState } from 'react';
import { Calculator, CheckCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { MathView } from './MathView';

export const OpticsCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'immersion' | 'separated' | 'silvered' | 'prism' | 'liquids'>('immersion');

  // Solver 1: Immersion
  const [muL, setMuL] = useState<number>(1.5);
  const [muM, setMuM] = useState<number>(1.3333);
  const [fAir, setFAir] = useState<number>(24);

  // Immersion calculations
  const immersionRatio = (muL - 1) / (muL / muM - 1);
  const fMed = fAir * immersionRatio;
  const pAir = 100 / fAir; // in Diopters
  const pMed = 100 / fMed;
  const isNatureReversed = (muM > muL);
  const isGlassPlate = (Math.abs(muM - muL) < 0.001);

  // Solver 2: Separated Lenses
  const [f1, setF1] = useState<number>(30); // cm
  const [f2, setF2] = useState<number>(10); // cm
  const [sepD, setSepD] = useState<number>(10); // cm

  // Separated calculations
  // 1/F = 1/f1 + 1/f2 - d/(f1*f2)
  const invF = (1 / f1) + (1 / f2) - (sepD / (f1 * f2));
  const fEq = Math.abs(invF) > 0.00001 ? 1 / invF : Infinity;
  const p1 = 100 / f1;
  const p2 = 100 / f2;
  const dMeter = sepD / 100;
  const pEq = p1 + p2 - (dMeter * p1 * p2);
  const isAfocal = Math.abs(sepD - (f1 + f2)) < 0.01;

  // Solver 3: Silvered Lens
  const [silverType, setSilverType] = useState<'plano_curved' | 'plano_flat' | 'equiconvex'>('plano_curved');
  const [silvR, setSilvR] = useState<number>(20); // cm
  const [silvMu, setSilvMu] = useState<number>(1.5);

  let silvFeq = 0;
  let silvPeq = 0;
  let silvNature = 'Concave Mirror';

  if (silverType === 'plano_curved') {
    // F_eq = -R / (2*mu)
    silvFeq = -silvR / (2 * silvMu);
    silvPeq = (2 * silvMu) / (silvR / 100);
  } else if (silverType === 'plano_flat') {
    // F_eq = -R / (2*(mu - 1))
    silvFeq = -silvR / (2 * (silvMu - 1));
    silvPeq = (2 * (silvMu - 1)) / (silvR / 100);
  } else {
    // equiconvex: F_eq = -R / (4*mu - 2)
    silvFeq = -silvR / (4 * silvMu - 2);
    silvPeq = (4 * silvMu - 2) / (silvR / 100);
  }

  // Solver 4: Prism
  const [prismA, setPrismA] = useState<number>(60); // deg
  const [prismMu, setPrismMu] = useState<number>(1.732); // sqrt(3)

  // Minimum deviation: mu = sin((A + delta_m)/2) / sin(A/2)
  // sin((A + delta_m)/2) = mu * sin(A/2)
  const halfA_rad = (prismA / 2) * (Math.PI / 180);
  const sinVal = prismMu * Math.sin(halfA_rad);
  const isTirAtBase = sinVal > 1.0;
  let deltaM = 0;
  let angleI = 0;
  let criticalAngleDeg = 0;
  if (!isTirAtBase) {
    const angleDevRad = Math.asin(sinVal);
    const angleDevDeg = angleDevRad * (180 / Math.PI);
    deltaM = (angleDevDeg * 2) - prismA;
    angleI = (prismA + deltaM) / 2;
    criticalAngleDeg = Math.asin(1 / prismMu) * (180 / Math.PI);
  }

  // Solver 5: Immiscible Liquids
  const [layers, setLayers] = useState<{ id: number; depth: number; mu: number; name: string }[]>([
    { id: 1, depth: 6, mu: 1.5, name: 'Liquid 1 (Glycerol)' },
    { id: 2, depth: 8, mu: 1.3333, name: 'Liquid 2 (Water)' },
    { id: 3, depth: 5, mu: 1.6, name: 'Liquid 3 (CS2 / Oil)' },
  ]);

  const totalRealDepth = layers.reduce((acc, l) => acc + (Number(l.depth) || 0), 0);
  const totalApparentDepth = layers.reduce((acc, l) => {
    const d = Number(l.depth) || 0;
    const m = Number(l.mu) || 1;
    return acc + (m > 0 ? d / m : 0);
  }, 0);
  const totalShift = totalRealDepth - totalApparentDepth;

  const addLayer = () => {
    const nextId = Date.now();
    setLayers([...layers, { id: nextId, depth: 4, mu: 1.4, name: `Liquid ${layers.length + 1}` }]);
  };

  const removeLayer = (id: number) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter((l) => l.id !== id));
  };

  const updateLayer = (id: number, field: 'depth' | 'mu', val: number) => {
    setLayers(layers.map((l) => (l.id === id ? { ...l, [field]: val } : l)));
  };

  return (
    <div id="optics-calculator" className="rounded-2xl bg-slate-800/90 border border-slate-700/80 p-6 space-y-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>Interactive NTA Verification Lab & Numerical Solver</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test and cross-verify any JEE Main question variation with instant step-by-step formula execution.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-700/60 text-xs">
          {[
            { id: 'immersion', label: '1. Lens in Medium' },
            { id: 'separated', label: '2. Separated Lenses' },
            { id: 'silvered', label: '3. Silvered Lens Mirror' },
            { id: 'prism', label: '4. Prism Min Deviation' },
            { id: 'liquids', label: '5. Immiscible Liquids' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Solver 1: Lens Immersion */}
      {activeTab === 'immersion' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lens Refractive Index (<MathView math="\mu_L" />)
              </label>
              <input
                type="number"
                step="0.01"
                value={muL}
                onChange={(e) => setMuL(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">E.g. Crown glass = 1.5, Flint = 1.62</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Medium Refractive Index (<MathView math="\mu_M" />)
              </label>
              <input
                type="number"
                step="0.01"
                value={muM}
                onChange={(e) => setMuM(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">E.g. Water = 1.333, CS2 = 1.63</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Focal Length in Air (<MathView math="f_{air}" /> in cm)
              </label>
              <input
                type="number"
                step="1"
                value={fAir}
                onChange={(e) => setFAir(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">+ve for convex, -ve for concave</span>
            </div>
          </div>

          {/* Results card */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Multiplier Ratio (fm / fa)</div>
              <div className="text-xl font-bold text-amber-300 font-mono mt-1">{immersionRatio.toFixed(3)}x</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Ratio of focal lengths</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">New Focal Length (f_medium)</div>
              <div className="text-xl font-bold text-cyan-300 font-mono mt-1">
                {isGlassPlate ? 'Infinity (Flat Plate)' : `${fMed.toFixed(2)} cm`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">In surrounding liquid</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Power in Medium (P_medium)</div>
              <div className="text-xl font-bold text-emerald-300 font-mono mt-1">
                {isGlassPlate ? '0.00 D' : `${pMed.toFixed(2)} D`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Air power was {pAir.toFixed(2)} D</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Optical Behavior Status</div>
              <div
                className={`text-sm font-bold mt-1 px-2 py-1 rounded inline-block ${
                  isGlassPlate
                    ? 'bg-slate-700 text-slate-200'
                    : isNatureReversed
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}
              >
                {isGlassPlate
                  ? 'Invisible Glass Plate'
                  : isNatureReversed
                  ? 'Nature REVERSED!'
                  : 'Same Nature (Weaker)'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isNatureReversed
                  ? 'Convex acts as Diverging'
                  : isGlassPlate
                  ? 'Zero deviation'
                  : 'Focal length increased'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solver 2: Separated Lenses */}
      {activeTab === 'separated' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lens 1 Focal Length (<MathView math="f_1" /> in cm)
              </label>
              <input
                type="number"
                value={f1}
                onChange={(e) => setF1(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lens 2 Focal Length (<MathView math="f_2" /> in cm)
              </label>
              <input
                type="number"
                value={f2}
                onChange={(e) => setF2(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Separation Distance (<MathView math="d" /> in cm)
              </label>
              <input
                type="number"
                min="0"
                value={sepD}
                onChange={(e) => setSepD(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Converted to {dMeter.toFixed(3)} m for power formula</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Equivalent Power (P_eq)</div>
              <div className="text-2xl font-bold text-amber-300 font-mono mt-1">{pEq.toFixed(2)} D</div>
              <div className="text-[11px] text-slate-500 mt-0.5">P1 + P2 - d*P1*P2</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Equivalent Focal Length (F_eq)</div>
              <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">
                {isAfocal ? 'Infinity (Afocal)' : `${fEq.toFixed(2)} cm`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">1/f1 + 1/f2 - d/(f1*f2)</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Afocal Condition (d = f1 + f2)</div>
              <div
                className={`text-sm font-bold mt-1 px-2 py-1 rounded inline-block ${
                  isAfocal ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isAfocal ? 'Afocal System (Telescope)' : `Afocal at d = ${(f1 + f2).toFixed(1)} cm`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Parallel beam emerges parallel</div>
            </div>
          </div>
        </div>
      )}

      {/* Solver 3: Silvered Lens */}
      {activeTab === 'silvered' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Silvering Configuration</label>
              <select
                value={silverType}
                onChange={(e) => setSilverType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              >
                <option value="plano_curved">Plano-Convex silvered on Curved face</option>
                <option value="plano_flat">Plano-Convex silvered on Flat Plane face</option>
                <option value="equiconvex">Equiconvex silvered on One face</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Radius of Curvature (<MathView math="R" /> in cm)
              </label>
              <input
                type="number"
                value={silvR}
                onChange={(e) => setSilvR(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Glass Refractive Index (<MathView math="\mu" />)
              </label>
              <input
                type="number"
                step="0.05"
                value={silvMu}
                onChange={(e) => setSilvMu(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Equivalent Mirror Type</div>
              <div className="text-lg font-bold text-emerald-300 mt-1">{silvNature}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Concave mirror (converging)</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Equivalent Focal Length (F_eq)</div>
              <div className="text-2xl font-bold text-amber-300 font-mono mt-1">{silvFeq.toFixed(2)} cm</div>
              <div className="text-[11px] text-slate-500 mt-0.5">F_eq = -1 / P_eq</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Equivalent Power (P_eq)</div>
              <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">+{silvPeq.toFixed(2)} D</div>
              <div className="text-[11px] text-slate-500 mt-0.5">P_eq = 2*P_L + P_M</div>
            </div>
          </div>
        </div>
      )}

      {/* Solver 4: Prism Minimum Deviation */}
      {activeTab === 'prism' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Prism Angle (<MathView math="A" /> in degrees)
              </label>
              <input
                type="number"
                value={prismA}
                onChange={(e) => setPrismA(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Equilateral = 60°, Right-angled = 90° or 45°</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Prism Refractive Index (<MathView math="\mu" />)
              </label>
              <input
                type="number"
                step="0.01"
                value={prismMu}
                onChange={(e) => setPrismMu(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Glass = 1.5, sqrt(2) = 1.414, sqrt(3) = 1.732</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Minimum Deviation (delta_m)</div>
              <div className="text-2xl font-bold text-amber-300 font-mono mt-1">
                {isTirAtBase ? 'TIR inside Prism' : `${deltaM.toFixed(2)}°`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">mu = sin((A+delta_m)/2)/sin(A/2)</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Angle of Incidence at Min Dev (i)</div>
              <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">
                {isTirAtBase ? 'N/A' : `${angleI.toFixed(2)}°`}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">i = e = (A + delta_m) / 2</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Critical Angle (C)</div>
              <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">{criticalAngleDeg.toFixed(2)}°</div>
              <div className="text-[11px] text-slate-500 mt-0.5">sin C = 1 / mu</div>
            </div>
          </div>
        </div>
      )}

      {/* Solver 5: Immiscible Liquids */}
      {activeTab === 'liquids' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 font-semibold">Liquid Layers (Top to Bottom)</span>
            <button
              onClick={addLayer}
              className="flex items-center gap-1 text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Liquid Layer</span>
            </button>
          </div>

          <div className="space-y-2">
            {layers.map((layer, idx) => (
              <div
                key={layer.id}
                className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-700/80"
              >
                <span className="text-xs font-bold text-slate-400 w-6">#{idx + 1}</span>
                <div className="flex-1 min-w-[140px]">
                  <span className="text-xs text-slate-300 block mb-1 font-medium">{layer.name}</span>
                </div>
                <div className="w-28">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Depth d (cm)</label>
                  <input
                    type="number"
                    value={layer.depth}
                    onChange={(e) => updateLayer(layer.id, 'depth', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none"
                  />
                </div>
                <div className="w-28">
                  <label className="text-[10px] text-slate-400 block mb-0.5">Index mu</label>
                  <input
                    type="number"
                    step="0.05"
                    value={layer.mu}
                    onChange={(e) => updateLayer(layer.id, 'mu', parseFloat(e.target.value) || 1)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-100 text-xs focus:outline-none"
                  />
                </div>
                <div className="w-24 text-right">
                  <span className="text-[10px] text-slate-400 block mb-0.5">d / mu</span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {(layer.depth / (layer.mu || 1)).toFixed(2)} cm
                  </span>
                </div>
                {layers.length > 1 && (
                  <button
                    onClick={() => removeLayer(layer.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Total Real Depth (H)</div>
              <div className="text-2xl font-bold text-slate-200 font-mono mt-1">{totalRealDepth.toFixed(2)} cm</div>
              <div className="text-[11px] text-slate-500 mt-0.5">sum of physical layer depths</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Total Apparent Depth (H_app)</div>
              <div className="text-2xl font-bold text-amber-300 font-mono mt-1">{totalApparentDepth.toFixed(2)} cm</div>
              <div className="text-[11px] text-slate-500 mt-0.5">d_app = sum(d_i / mu_i)</div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Apparent Shift (Delta H)</div>
              <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">+{totalShift.toFixed(2)} cm</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Bottom appears raised by this amount</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
