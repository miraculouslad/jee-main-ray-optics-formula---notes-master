import React, { useState } from 'react';
import { Download, Printer, Check, ExternalLink } from 'lucide-react';
import { FORMULA_DATA } from '../data/opticsNotesData';
import { TOP_30_TRAPS } from '../data/top30TrapsData';
import { QUESTION_RECOGNITION_TRIGGERS } from '../data/questionRecognitionData';
import { PYQ_COVERAGE_MATRIX } from '../data/pyqMatrixData';
import { GRAPH_KNOWLEDGE } from '../data/graphKnowledgeData';
import { RAPID_REVISION_ITEMS } from '../data/revisionSheetData';
import katex from 'katex';
import { renderKaTeXInHtml } from './FormattedMathText';

function renderSection0(): string {
  const rules = [
    {
      title: '1. Origin of Coordinates (The Zero Point)',
      desc: 'All axial distances along the principal axis are measured strictly from the **Pole ($P$)** for spherical mirrors and single refracting surfaces, or from the **Optical Center ($O$)** for thin lenses.',
    },
    {
      title: '2. Incident Ray Axis (The $+x$ Direction)',
      desc: 'The direction of propagation of incident light rays is defined as **Positive ($+x$)**. Distances measured against the direction of incident light rays are **Negative ($-x$)**.',
    },
    {
      title: '3. Transverse Heights ($\\pm y$)',
      desc: 'Heights measured perpendicular to and above the principal axis are **Positive ($+y$)** (erect). Heights measured perpendicular to and below the axis are **Negative ($-y$)** (inverted).',
    },
    {
      title: '4. Real vs. Virtual Definitions',
      desc: '**Real Object:** Diverging incident rays originate from an actual point $\\implies u < 0$.<br/>**Virtual Object:** Incident rays converge toward a point behind the interface $\\implies u > 0$.<br/>**Real Image:** Actual physical intersection of rays. Mirror: $v < 0$ (front). Lens: $v > 0$ (rear).<br/>**Virtual Image:** Apparent intersection of diverged rays. Mirror: $v > 0$ (rear). Lens: $v < 0$ (front).',
    },
  ];

  const signTableRows = [
    {
      device: 'Concave Mirror',
      f: '$f < 0$',
      u: '$|u| > |f|$',
      v: '$v < 0$',
      m: '$m < 0$',
      char: 'Real, Inverted (Diminished if $|u| > 2|f|$, Magnified if $|f| < |u| < 2|f|$)',
    },
    {
      device: 'Concave Mirror',
      f: '$f < 0$',
      u: '$|u| < |f|$',
      v: '$v > 0$',
      m: '$m > +1$',
      char: 'Virtual, Erect, Magnified (Behind mirror)',
    },
    {
      device: 'Convex Mirror',
      f: '$f > 0$',
      u: 'Any $u < 0$',
      v: '$0 < v < f$',
      m: '$0 < m < +1$',
      char: 'STRICTLY Virtual, Erect, Diminished for ANY real object!',
    },
    {
      device: 'Convex Lens',
      f: '$f > 0$',
      u: '$|u| > f$',
      v: '$v > 0$',
      m: '$m < 0$',
      char: 'Real, Inverted (Opposite side; $v = +2f$ when $u = -2f$)',
    },
    {
      device: 'Convex Lens',
      f: '$f > 0$',
      u: '$|u| < f$',
      v: '$v < 0$',
      m: '$m > +1$',
      char: 'Virtual, Erect, Magnified (Same side as object)',
    },
    {
      device: 'Concave Lens',
      f: '$f < 0$',
      u: 'Any $u < 0$',
      v: '$-|f| < v < 0$',
      m: '$0 < m < +1$',
      char: 'STRICTLY Virtual, Erect, Diminished for ANY real object!',
    },
  ];

  const comparativeRows = [
    {
      prop: 'Gaussian Master Relation',
      mirror: '$\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$',
      lens: '$\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$',
      reason: 'Reflection reverses light direction back to incident side; refraction transmits light across the interface.',
    },
    {
      prop: 'Transverse Magnification $m$',
      mirror: '$m = -\\frac{v}{u} = \\frac{f}{f - u}$',
      lens: '$m = +\\frac{v}{u} = \\frac{f}{f + u}$',
      reason: 'In mirrors, real image has $v < 0, u < 0 \\implies m = -\\frac{(-)}{(-)} < 0$ (inverted). In lenses, real image has $v > 0, u < 0 \\implies m = +\\frac{(+)}{(-)} < 0$ (inverted).',
    },
    {
      prop: 'Longitudinal Velocity $\\vec{v}_I$ ($dv/dt$)',
      mirror: '$\\vec{v}_I = -m^2 \\vec{v}_O$',
      lens: '$\\vec{v}_I = +m^2 \\vec{v}_O$',
      reason: 'Differentiating mirror equation gives $\\frac{dv}{du} = -m^2$; differentiating lens equation gives $\\frac{dv}{du} = +m^2$.',
    },
    {
      prop: '$1/v$ vs. $1/u$ Linear Plot Slope',
      mirror: '$\\text{Slope } = -1 \\quad (\\theta = 135^\\circ)$',
      lens: '$\\text{Slope } = +1 \\quad (\\theta = 45^\\circ)$',
      reason: 'Mirror: $\\frac{1}{v} = -\\frac{1}{u} + \\frac{1}{f}$. Lens: $\\frac{1}{v} = +\\frac{1}{u} + \\frac{1}{f}$.',
    },
    {
      prop: 'Optical Power $P$',
      mirror: '$P = -\\frac{1}{f}$',
      lens: '$P = +\\frac{1}{f}$',
      reason: 'A converging mirror (concave) has $f < 0$, so $P = -1/f > 0$. A converging lens (convex) has $f > 0$, so $P = +1/f > 0$.',
    },
  ];

  return `
  <section id="sec-sign-convention" class="sign-convention-card">
    <div class="section-title" style="margin-top: 0; border-bottom: 2px solid var(--primary);">
      <span>Section 0: Master Cartesian Sign Convention & Consistency Rules</span>
      <span class="badge pyq-tag">MANDATORY EXAM FOUNDATION</span>
    </div>
    <p style="margin: 12px 0; font-size: 0.95rem;">
      Every equation, derivation, graph, and numerical value in this document strictly adheres to the standard <strong>New Cartesian Sign Convention</strong> mandated by NCERT and tested by JEE Main.
    </p>

    <div class="convention-grid">
      ${rules.map((r) => `
        <div class="rule-box">
          <h4>${renderKaTeXInHtml(r.title)}</h4>
          <p>${renderKaTeXInHtml(r.desc)}</p>
        </div>
      `).join('')}
    </div>

    <!-- Sign Tables -->
    <h3 style="margin: 20px 0 10px 0; color: var(--heading);">${renderKaTeXInHtml('The 4 Universal Sign Tables for Real Objects ($u < 0$)')}</h3>
    <div class="sign-table-wrap">
      <table class="sign-table">
        <thead>
          <tr>
            <th>Optical Device</th>
            <th>${renderKaTeXInHtml('Focal Length $f$')}</th>
            <th>${renderKaTeXInHtml('Object Pos. $u$')}</th>
            <th>${renderKaTeXInHtml('Image Pos. $v$')}</th>
            <th>${renderKaTeXInHtml('Magnification $m$')}</th>
            <th>Image Character</th>
          </tr>
        </thead>
        <tbody>
          ${signTableRows.map((r) => `
            <tr>
              <td><strong>${r.device}</strong></td>
              <td>${renderKaTeXInHtml(r.f)}</td>
              <td>${renderKaTeXInHtml(r.u)}</td>
              <td>${renderKaTeXInHtml(r.v)}</td>
              <td>${renderKaTeXInHtml(r.m)}</td>
              <td>${renderKaTeXInHtml(r.char)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Comparative Matrix -->
    <h3 style="margin: 24px 0 10px 0; color: var(--heading);">${renderKaTeXInHtml('Master Analytical Comparison: Spherical Mirror vs. Thin Lens')}</h3>
    <div class="sign-table-wrap">
      <table class="sign-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Spherical Mirror (Reflection)</th>
            <th>Thin Lens (Refraction)</th>
            <th>Mathematical & Physical Reason</th>
          </tr>
        </thead>
        <tbody>
          ${comparativeRows.map((r) => `
            <tr>
              <td><strong>${renderKaTeXInHtml(r.prop)}</strong></td>
              <td>${renderKaTeXInHtml(r.mirror)}</td>
              <td>${renderKaTeXInHtml(r.lens)}</td>
              <td>${renderKaTeXInHtml(r.reason)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </section>
  `;
}

export const generateFullHtmlNotes = (): string => {
  // 0. Render Section 0
  const renderedSection0 = renderSection0();

  // 1. Render All 12 Formula Modules
  const renderedFormulas = FORMULA_DATA.map((item, idx) => {
      let masterMath = '';
      try {
        masterMath = katex.renderToString(item.primaryLatex, { displayMode: true, throwOnError: false, strict: false, output: 'html' });
      } catch {
        masterMath = `<code>${item.primaryLatex}</code>`;
      }

      const derivedHtml = (item.derivedForms || [])
        .map((df) => {
          let dfMath = '';
          try {
            dfMath = katex.renderToString(df.latex, { displayMode: true, throwOnError: false });
          } catch {
            dfMath = `<code>${df.latex}</code>`;
          }
          return `
            <div class="derived-box">
              <div class="derived-title"><strong>${df.title}</strong></div>
              <div class="math-block">${dfMath}</div>
              <p class="explanation">${renderKaTeXInHtml(df.explanation)}</p>
            </div>
          `;
        })
        .join('');

      const variationsHtml = item.variations
        .map((v) => {
          let vMath = '';
          try {
            vMath = katex.renderToString(v.latex, { displayMode: true, throwOnError: false, strict: false, output: 'html' });
          } catch {
            vMath = renderKaTeXInHtml(v.latex);
          }
          return `
            <div class="variation-box">
              <div class="var-header">
                <strong>${renderKaTeXInHtml(v.title)}</strong>
                ${v.status ? `<span class="badge ${v.status === 'Verified PYQ' ? 'pyq-tag' : 'variation-tag'}">${v.status}</span>` : ''}
                ${v.pyqRef ? `<span class="badge pyq-tag">${renderKaTeXInHtml(v.pyqRef)}</span>` : ''}
              </div>
              <div class="math-block">${vMath}</div>
              <p class="condition"><strong>Condition:</strong> ${renderKaTeXInHtml(v.condition)}</p>
              ${v.note ? `<p class="note"><strong>Physics Rule:</strong> ${renderKaTeXInHtml(v.note)}</p>` : ''}
            </div>
          `;
        })
        .join('');

      const variablesHtml = item.variables
        .map((vr) => {
          let sMath = '';
          try {
            sMath = katex.renderToString(vr.symbol, { displayMode: false, throwOnError: false, strict: false, output: 'html' });
          } catch {
            sMath = renderKaTeXInHtml(vr.symbol);
          }
          return `<li><span class="sym">${sMath}</span>: ${renderKaTeXInHtml(vr.meaning)}</li>`;
        })
        .join('');

      const cluesHtml = (item.questionRecognition || [])
        .map((c) => `<li><span class="clue-bullet">▸</span> ${renderKaTeXInHtml(c)}</li>`)
        .join('');

      const trapsHtml = item.ntaTraps
        .map((t) => `<li><span class="trap-bullet">⚠</span> ${renderKaTeXInHtml(t)}</li>`)
        .join('');

      const limitingHtml = (item.limitingCases || [])
        .map((lc) => {
          let lcMath = '';
          try {
            lcMath = katex.renderToString(lc.latex, { displayMode: false, throwOnError: false, strict: false, output: 'html' });
          } catch {
            lcMath = renderKaTeXInHtml(lc.latex);
          }
          return `
            <div class="limiting-item">
              <strong>${renderKaTeXInHtml(lc.caseName)}:</strong>
              <div class="limiting-math">${lcMath}</div>
              <span class="limiting-res">${renderKaTeXInHtml(lc.result)}</span>
            </div>
          `;
        })
        .join('');

      const archetypeHtml = item.archetype
        ? `
          <div class="archetype-box">
            <h4>Worked Archetype Problem & Attack System</h4>
            <p class="archetype-q"><strong>Problem:</strong> ${renderKaTeXInHtml(item.archetype.question)}</p>
            <p class="archetype-given"><strong>Given Data:</strong> ${renderKaTeXInHtml(item.archetype.givenData)}</p>
            <div class="archetype-steps">
              <strong>Step-by-Step Attack:</strong>
              <ol>
                ${item.archetype.solutionSteps.map((s) => `<li>${renderKaTeXInHtml(s)}</li>`).join('')}
              </ol>
            </div>
            <div class="archetype-ans">
              <strong>Final Answer:</strong> ${renderKaTeXInHtml(item.archetype.finalAnswer)}
            </div>
          </div>
        `
        : '';

      return `
        <article class="formula-card">
          <header class="card-header">
            <h2>Module ${idx + 1}: ${item.title}</h2>
            <div class="meta-tags">
              <span class="badge freq-tag">${item.pyqFrequency} Frequency</span>
              ${item.pyqClassification ? `<span class="badge pyq-tag">${item.pyqClassification}</span>` : ''}
              <span class="badge year-tag">PYQs: ${item.recentYears.join(', ')}</span>
            </div>
          </header>
          <p class="desc">${renderKaTeXInHtml(item.description)}</p>
          
          ${item.whenToUse ? `
            <div class="when-box">
              <strong>When to Use It:</strong> ${renderKaTeXInHtml(item.whenToUse)}
            </div>
          ` : ''}

          <div class="master-eq-box">
            <div class="caption">MASTER FORMULA</div>
            <div class="master-math">${masterMath}</div>
            ${item.practicalRule ? `<div class="exam-rule"><strong>Exam Strategy:</strong> ${renderKaTeXInHtml(item.practicalRule)}</div>` : ''}
          </div>

          ${item.variables.length > 0 ? `<div class="vars-section"><h4>Symbol Definitions & Conventions</h4><ul class="vars-list">${variablesHtml}</ul></div>` : ''}

          ${derivedHtml ? `<div class="derived-section"><h4>One-Step Derived Forms</h4><div class="derived-grid">${derivedHtml}</div></div>` : ''}

          ${cluesHtml ? `<div class="clues-box"><h4>Question Recognition Clues</h4><ul>${cluesHtml}</ul></div>` : ''}

          <div class="variations-section">
            <h4>All Important Variations & Edge Conditions</h4>
            ${variationsHtml}
          </div>

          ${limitingHtml ? `<div class="limiting-section"><h4>Extreme-Case Sanity Checks (Limiting Boundaries)</h4><div class="limiting-grid">${limitingHtml}</div></div>` : ''}

          ${item.ntaTraps.length > 0 ? `
            <div class="traps-box">
              <h4>NTA Negative-Marking Traps to Avoid</h4>
              <ul>${trapsHtml}</ul>
            </div>
          ` : ''}

          ${archetypeHtml}
        </article>
      `;
    }).join('\n');

    // 2. Render Recognition Triggers
    const renderedTriggers = QUESTION_RECOGNITION_TRIGGERS.map((t) => {
      let actMath = '';
      try {
        actMath = katex.renderToString(t.actionFormula, { displayMode: true, throwOnError: false, strict: false, output: 'html' });
      } catch {
        actMath = renderKaTeXInHtml(t.actionFormula);
      }
      return `
        <div class="trigger-card">
          <div class="trigger-top">
            <span class="badge trigger-cat">${t.category}</span>
            <div class="trigger-phrase">${renderKaTeXInHtml(t.triggerPhrase)}</div>
          </div>
          <p class="underlying"><strong>Underlying Concept:</strong> ${renderKaTeXInHtml(t.underlyingPattern)}</p>
          <div class="action-math">${actMath}</div>
          <p class="pitfall"><strong>Pitfall to Avoid:</strong> ${renderKaTeXInHtml(t.pitfallToAvoid)}</p>
          ${t.pyqEvidence ? `<p class="pyq-ref"><strong>PYQ Anchor:</strong> ${renderKaTeXInHtml(t.pyqEvidence)}</p>` : ''}
        </div>
      `;
    }).join('\n');

    // 3. Render Top 30 Traps
    const renderedTraps = TOP_30_TRAPS.map((t) => `
      <div class="trap-entry">
        <h3>${renderKaTeXInHtml(t.title)} <span class="danger-level">[${t.dangerLevel} Pitfall]</span></h3>
        <div class="trap-cols">
          <div class="col trap-side">
            <strong>❌ Wrong Thinking (-1):</strong>
            <p>${renderKaTeXInHtml(t.wrongThinking)}</p>
          </div>
          <div class="col rule-side">
            <strong>✓ Question-Proof Rule (+4):</strong>
            <p>${renderKaTeXInHtml(t.correctRule)}</p>
          </div>
        </div>
        ${t.why ? `<p class="why-note"><strong>Why:</strong> ${renderKaTeXInHtml(t.why)}</p>` : ''}
        ${t.pyqConnection ? `<p class="pyq-ref"><strong>PYQ Connection:</strong> ${renderKaTeXInHtml(t.pyqConnection)}</p>` : ''}
      </div>
    `).join('\n');

    // 4. Render PYQ Coverage Matrix
    const renderedMatrix = PYQ_COVERAGE_MATRIX.map((row) => `
      <tr>
        <td><strong>${row.patternId}</strong></td>
        <td>${row.topic}<br/><small>${renderKaTeXInHtml(row.subConcept)}</small></td>
        <td>${renderKaTeXInHtml(row.questionConstruction)}</td>
        <td>${renderKaTeXInHtml(row.typicalData)}</td>
        <td><div class="matrix-math">${katex.renderToString(row.formulaRequired, { displayMode: false, throwOnError: false, strict: false, output: 'html' })}</div></td>
        <td>${renderKaTeXInHtml(row.hiddenClue)}</td>
        <td class="trap-td">${renderKaTeXInHtml(row.commonTrap)}</td>
        <td>${row.yearsObserved}</td>
      </tr>
    `).join('\n');

    // 5. Render Graphs
    const renderedGraphs = GRAPH_KNOWLEDGE.map((g) => {
      let gMath = '';
      try {
        gMath = katex.renderToString(g.latexEquation, { displayMode: true, throwOnError: false, strict: false, output: 'html' });
      } catch {
        gMath = renderKaTeXInHtml(g.latexEquation);
      }
      return `
        <div class="graph-card">
          <h4>${renderKaTeXInHtml(g.title)}</h4>
          <p class="graph-axes"><strong>Axes:</strong> ${renderKaTeXInHtml(g.axes)}</p>
          <div class="math-block">${gMath}</div>
          <div class="graph-points">
            <strong>Key Critical Coordinates:</strong>
            <ul>
              ${g.keyPoints.map((pt) => `<li>${renderKaTeXInHtml(pt)}</li>`).join('')}
            </ul>
          </div>
          <p class="asymptotes"><strong>Asymptotes:</strong> ${renderKaTeXInHtml(g.asymptotes)}</p>
          <p class="nta-q"><strong>What NTA Asks:</strong> ${renderKaTeXInHtml(g.ntaQuestions)}</p>
          <p class="interpretation"><strong>Physical Takeaway:</strong> ${renderKaTeXInHtml(g.interpretation)}</p>
        </div>
      `;
    }).join('\n');

    // 6. Render Rapid Revision Sheet
    const renderedRevision = RAPID_REVISION_ITEMS.map((r) => {
      let rMath = '';
      try {
        rMath = katex.renderToString(r.latex, { displayMode: true, throwOnError: false, strict: false, output: 'html' });
      } catch {
        rMath = renderKaTeXInHtml(r.latex);
      }
      const typeBadge =
        r.mustType === 'RED_MEMORIZE'
          ? '🔴 MUST MEMORIZE'
          : r.mustType === 'YELLOW_UNDERSTAND'
          ? '🟡 MUST UNDERSTAND'
          : '🟢 MUST RECOGNIZE';
      const typeClass =
        r.mustType === 'RED_MEMORIZE'
          ? 'badge-red'
          : r.mustType === 'YELLOW_UNDERSTAND'
          ? 'badge-yellow'
          : 'badge-green';

      return `
        <div class="revision-card">
          <div class="revision-header">
            <span class="badge ${typeClass}">${typeBadge}</span>
            <span class="rev-cat">${r.category}</span>
          </div>
          <h5>${renderKaTeXInHtml(r.topic)}</h5>
          <div class="rev-math">${rMath}</div>
          <p class="rev-rule"><strong>Rule:</strong> ${renderKaTeXInHtml(r.oneLineRule)}</p>
        </div>
      `;
    }).join('\n');

    // Return the full standalone HTML document
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JEE Main Ray Optics Question-Proof Master Notes (2022–2026 Audit)</title>
  <!-- KaTeX CSS for authentic LaTeX mathematical typography -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
  <style>
    :root {
      --bg: #ffffff;
      --text: #1e293b;
      --heading: #0f172a;
      --border: #cbd5e1;
      --primary: #0284c7;
      --danger: #b91c1c;
      --danger-bg: #fef2f2;
      --success: #15803d;
      --success-bg: #f0fdf4;
      --warning: #b45309;
      --warning-bg: #fffbeb;
      --card-bg: #f8fafc;
      --math-bg: #f1f5f9;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0b0f19;
        --text: #cbd5e1;
        --heading: #f8fafc;
        --border: #334155;
        --primary: #38bdf8;
        --danger: #f87171;
        --danger-bg: #450a0a33;
        --success: #4ade80;
        --success-bg: #052e1633;
        --warning: #fbbf24;
        --warning-bg: #451a0333;
        --card-bg: #111827;
        --math-bg: #1e293b;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1, h2, h3, h4, h5 { color: var(--heading); font-weight: 800; line-height: 1.25; }
    h1 { font-size: 2.2rem; text-align: center; margin-bottom: 8px; }
    .subtitle { text-align: center; color: var(--primary); font-size: 1.1rem; font-weight: 600; margin-bottom: 24px; }
    .intro-banner {
      background: var(--math-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 36px;
      font-size: 0.95rem;
    }
    .section-title {
      font-size: 1.6rem;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 8px;
      margin: 48px 0 24px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .formula-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 36px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      page-break-inside: avoid;
    }
    .card-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .meta-tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid currentColor;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .freq-tag { color: var(--danger); }
    .pyq-tag { color: var(--primary); }
    .year-tag { color: var(--text); opacity: 0.8; }
    .variation-tag { color: var(--warning); }
    .badge-red { color: #ef4444; border-color: #ef4444; }
    .badge-yellow { color: #f59e0b; border-color: #f59e0b; }
    .badge-green { color: #10b981; border-color: #10b981; }

    .when-box {
      background: var(--math-bg);
      border-left: 4px solid var(--primary);
      padding: 10px 14px;
      margin-bottom: 16px;
      font-size: 0.9rem;
      border-radius: 4px;
    }
    .master-eq-box {
      background: var(--math-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 16px 0;
    }
    .master-eq-box .caption {
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 1px;
      color: var(--primary);
      margin-bottom: 8px;
    }
    .exam-rule {
      margin-top: 12px;
      font-size: 0.85rem;
      color: var(--warning);
      border-top: 1px dashed var(--border);
      padding-top: 8px;
    }
    .vars-list { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 8px; margin-top: 8px; }
    .vars-list li {
      background: var(--bg);
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid var(--border);
      font-size: 0.85rem;
    }
    .derived-grid, .limiting-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    .derived-box, .limiting-item {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      font-size: 0.85rem;
    }
    .clues-box {
      background: var(--math-bg);
      border: 1px solid var(--primary);
      border-radius: 8px;
      padding: 14px;
      margin: 16px 0;
      font-size: 0.85rem;
    }
    .clues-box ul { list-style: none; margin-top: 6px; }
    .clues-box li { margin-bottom: 4px; }
    .clue-bullet { color: var(--primary); font-weight: bold; margin-right: 6px; }

    .variation-box {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px;
      margin-top: 12px;
      font-size: 0.88rem;
    }
    .var-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .traps-box {
      background: var(--danger-bg);
      border: 1px solid var(--danger);
      border-radius: 8px;
      padding: 14px;
      margin-top: 16px;
      font-size: 0.85rem;
    }
    .traps-box h4 { color: var(--danger); margin-bottom: 8px; }
    .traps-box ul { list-style: none; }
    .traps-box li { margin-bottom: 4px; }
    .trap-bullet { color: var(--danger); font-weight: bold; margin-right: 6px; }

    .archetype-box {
      background: var(--success-bg);
      border: 1px solid var(--success);
      border-radius: 8px;
      padding: 16px;
      margin-top: 16px;
      font-size: 0.88rem;
    }
    .archetype-box h4 { color: var(--success); margin-bottom: 8px; }
    .archetype-steps { margin: 10px 0; }
    .archetype-steps ol { padding-left: 20px; }
    .archetype-steps li { margin-bottom: 4px; }
    .archetype-ans {
      background: var(--bg);
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid var(--success);
      color: var(--success);
      font-weight: bold;
      margin-top: 8px;
    }

    /* Traps Section */
    .trap-entry {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .trap-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 10px 0; font-size: 0.88rem; }
    .col { padding: 12px; border-radius: 8px; }
    .trap-side { background: var(--danger-bg); border: 1px solid var(--danger); }
    .rule-side { background: var(--success-bg); border: 1px solid var(--success); }
    .why-note { font-size: 0.85rem; color: var(--text); opacity: 0.9; margin-top: 6px; }

    /* Triggers Grid */
    .triggers-grid, .graphs-grid, .revision-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 16px;
    }
    .trigger-card, .graph-card, .revision-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
      font-size: 0.88rem;
      page-break-inside: avoid;
    }
    .trigger-phrase { font-weight: 700; color: var(--primary); margin: 6px 0; }
    .action-math, .math-block, .rev-math {
      background: var(--math-bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 10px;
      text-align: center;
      margin: 8px 0;
      overflow-x: auto !important;
      max-width: 100% !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }

    /* KaTeX overflow prevention & containment rules */
    .katex-display {
      overflow-x: auto !important;
      overflow-y: hidden !important;
      max-width: 100% !important;
      padding: 6px 0 !important;
      margin: 0.5em 0 !important;
      text-align: center !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }
    .katex {
      max-width: 100%;
      text-rendering: geometricPrecision;
    }
    .katex .katex-mathml {
      display: none !important;
    }
    .master-math, .matrix-math, .limiting-math, .derived-box, .limiting-item, .master-eq-box {
      overflow-x: auto !important;
      max-width: 100% !important;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
    }
    /* Sleek custom scrollbars */
    ::-webkit-scrollbar {
      height: 4px;
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.08);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--primary);
      opacity: 0.5;
      border-radius: 4px;
    }

    /* Matrix Table */
    .matrix-table-wrap { overflow-x: auto; margin-top: 16px; }
    table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
    th, td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; vertical-align: top; }
    th { background: var(--math-bg); color: var(--heading); font-weight: 700; }
    tr:nth-child(even) { background: var(--card-bg); }
    .trap-td { color: var(--danger); }

    /* Master Sign Convention Section */
    .sign-convention-card {
      background: var(--card-bg);
      border: 2px solid var(--primary);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 36px;
      box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
      page-break-inside: avoid;
    }
    .convention-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 16px;
      margin: 16px 0;
    }
    .rule-box {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px;
      font-size: 0.88rem;
    }
    .rule-box h4 { color: var(--primary); margin-bottom: 6px; }
    .sign-table-wrap { overflow-x: auto; margin-top: 12px; }
    .sign-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .sign-table th { background: var(--math-bg); padding: 8px; border: 1px solid var(--border); }
    .sign-table td { padding: 8px; border: 1px solid var(--border); text-align: center; }

    /* Print styling */
    @media print {
      body { background: #ffffff !important; color: #000000 !important; max-width: 100% !important; padding: 0 !important; }
      .formula-card, .trap-entry, .trigger-card, .graph-card, .revision-card, .sign-convention-card { page-break-inside: avoid; border: 1px solid #94a3b8 !important; }
      .master-eq-box, .action-math, .math-block, .rev-math { background: #f8fafc !important; }
    }
  </style>
</head>
<body>
  <header>
    <h1>JEE Main Ray Optics "Question-Proof" Master Notes</h1>
    <div class="subtitle">Complete 2022–2026 PYQ-Driven Audit & Mathematical Formula Network</div>
    <div class="intro-banner">
      <strong>Core Objective:</strong> Encounter any novel JEE Main Ray Optics question and instantly recognize which known concept, derived form, or variation it belongs to—even when NTA alters the geometry, medium, orientation, or wording.
    </div>
  </header>

  <!-- Table of Contents -->
  <nav style="margin-bottom: 32px; padding: 16px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px;">
    <h3 style="margin-bottom: 8px;">Table of Contents</h3>
    <ol style="padding-left: 20px; font-size: 0.9rem; line-height: 1.8;">
      <li><a href="#sec-sign-convention" style="color: var(--primary); font-weight: bold;">Section 0: Master Cartesian Sign Convention & Universal Real/Virtual Systems</a></li>
      <li><a href="#sec-formulas" style="color: var(--primary);">Section 1: 12 Master Formula Modules with Derivations & Archetypes</a></li>
      <li><a href="#sec-recognition" style="color: var(--primary);">Section 2: “How to Attack the Question” Recognition Triggers</a></li>
      <li><a href="#sec-matrix" style="color: var(--primary);">Section 3: Complete 2022–2026 JEE Main PYQ Pattern Audit Matrix</a></li>
      <li><a href="#sec-traps" style="color: var(--primary);">Section 4: Top 30 Negative-Marking Traps & Pitfall Rules</a></li>
      <li><a href="#sec-graphs" style="color: var(--primary);">Section 5: High-Yield Ray Optics Graphs & Coordinates</a></li>
      <li><a href="#sec-revision" style="color: var(--primary);">Section 6: 10-Minute Rapid Revision Triage (🔴/🟡/🟢)</a></li>
    </ol>
  </nav>

  <!-- SECTION 0: MASTER SIGN CONVENTION -->
  ${renderedSection0}

  <!-- SECTION 1 -->
  <section id="sec-formulas">
    <div class="section-title">
      <span>Section 1: The 12 Master Formula Modules</span>
      <span class="badge pyq-tag">100% Comprehensive</span>
    </div>
    ${renderedFormulas}
  </section>

  <!-- SECTION 2 -->
  <section id="sec-recognition">
    <div class="section-title">
      <span>Section 2: “How to Attack the Question” Recognition Engine</span>
      <span class="badge freq-tag">Instant Pattern Matching</span>
    </div>
    <div class="triggers-grid">
      ${renderedTriggers}
    </div>
  </section>

  <!-- SECTION 3 -->
  <section id="sec-matrix">
    <div class="section-title">
      <span>Section 3: 2022–2026 JEE Main PYQ Pattern Audit Matrix</span>
      <span class="badge pyq-tag">20 Patterns Audited</span>
    </div>
    <div class="matrix-table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Topic & Concept</th>
            <th>Question Construction</th>
            <th>Typical Data</th>
            <th>Required Formula</th>
            <th>Hidden Clue</th>
            <th>Common Trap</th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
          ${renderedMatrix}
        </tbody>
      </table>
    </div>
  </section>

  <!-- SECTION 4 -->
  <section id="sec-traps">
    <div class="section-title">
      <span>Section 4: Top 30 Negative-Marking Traps (NTA Pitfalls)</span>
      <span class="badge freq-tag">Guaranteed Negative-Mark Saver</span>
    </div>
    ${renderedTraps}
  </section>

  <!-- SECTION 5 -->
  <section id="sec-graphs">
    <div class="section-title">
      <span>Section 5: High-Yield Ray Optics Graphs & Critical Coordinates</span>
      <span class="badge pyq-tag">Analytical Geometry</span>
    </div>
    <div class="graphs-grid">
      ${renderedGraphs}
    </div>
  </section>

  <!-- SECTION 6 -->
  <section id="sec-revision">
    <div class="section-title">
      <span>Section 6: 10-Minute Rapid Revision Sheet</span>
      <span class="badge variation-tag">Triage: 🔴 / 🟡 / 🟢</span>
    </div>
    <div class="revision-grid">
      ${renderedRevision}
    </div>
  </section>

  <footer style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); text-align: center; font-size: 0.85rem; color: var(--text); opacity: 0.8;">
    JEE Main Ray Optics Question-Proof Master Notes • Built for Academic Precision & Complete Question Proofing
  </footer>
  <!-- Fallback KaTeX auto-render for any late dynamic expressions -->
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" onload="if (window.renderMathInElement) { renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false}); }"></script>
</body>
</html>`;
};

export const StandaloneHtmlExporter: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const htmlContent = generateFullHtmlNotes();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JEE_Main_Ray_Optics_Formula_Notes_Question_Proof.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    const htmlContent = generateFullHtmlNotes();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href="/JEE_Main_Ray_Optics_Formula_Notes_Question_Proof.html"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
        title="Open standalone Question-Proof HTML Notes in full view"
      >
        <ExternalLink className="w-4 h-4 text-amber-400" />
        <span className="hidden md:inline">Open Master Notes</span>
      </a>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        title="Download complete standalone Question-Proof HTML Notes with KaTeX"
      >
        {downloaded ? <Check className="w-4 h-4 text-slate-950" /> : <Download className="w-4 h-4" />}
        <span>{downloaded ? 'Downloaded HTML!' : 'Download Upgraded HTML'}</span>
      </button>

      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
        title="Print or Save as PDF"
      >
        <Printer className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline">Print / PDF</span>
      </button>
    </div>
  );
};
