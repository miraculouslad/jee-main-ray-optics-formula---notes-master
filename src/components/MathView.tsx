import React, { useMemo } from 'react';
import katex from 'katex';
import { renderKaTeXInHtml } from './FormattedMathText';

interface MathViewProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, display = false, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';

    const trimmed = math.trim();

    // 1. If wrapped in $$...$$, render as display math
    const doubleDollarMatch = trimmed.match(/^\$\$([\s\S]+)\$\$$/);
    if (doubleDollarMatch) {
      try {
        return katex.renderToString(doubleDollarMatch[1].trim(), {
          displayMode: true,
          throwOnError: false,
          strict: false,
          output: 'html',
        });
      } catch {
        return `<code>${trimmed}</code>`;
      }
    }

    // 2. If wrapped in a single $...$ (and doesn't contain internal $), strip the dollar signs
    const singleDollarMatch = trimmed.match(/^\$([^\$]+)\$$/);
    if (singleDollarMatch) {
      try {
        return katex.renderToString(singleDollarMatch[1].trim(), {
          displayMode: display,
          throwOnError: false,
          strict: false,
          output: 'html',
        });
      } catch {
        return `<code>${trimmed}</code>`;
      }
    }

    // 3. If it contains $ with other words, parse as mixed math text
    if (trimmed.includes('$')) {
      return renderKaTeXInHtml(trimmed);
    }

    // 4. Raw LaTeX formula
    try {
      return katex.renderToString(trimmed, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        output: 'html',
      });
    } catch {
      return `<code>${trimmed}</code>`;
    }
  }, [math, display]);

  if (display) {
    return (
      <div
        className={`w-full max-w-full overflow-x-auto overflow-y-hidden select-text text-center py-1 px-1 custom-math-scrollbar ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block select-text max-w-full overflow-x-auto align-middle custom-math-scrollbar ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

