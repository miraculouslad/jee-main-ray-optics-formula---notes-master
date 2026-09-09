import React, { useMemo } from 'react';
import katex from 'katex';

interface FormattedMathTextProps {
  text: string;
  className?: string;
}

/**
 * Converts a string with $...$ (inline) and $$...$$ (display) LaTeX blocks into KaTeX HTML.
 * Also handles basic bold **text** for emphasis.
 */
export function renderKaTeXInHtml(text: string): string {
  if (!text) return '';

  // Match $$...$$ or $...$
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g;
  const parts = text.split(regex);

  return parts
    .map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        try {
          return `<div class="katex-display-wrapper my-2 overflow-x-auto overflow-y-hidden max-w-full text-center custom-math-scrollbar">${katex.renderToString(math, {
            displayMode: true,
            throwOnError: false,
            strict: false,
            output: 'html',
          })}</div>`;
        } catch {
          return `<code>${math}</code>`;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        try {
          return `<span class="katex-inline-wrapper mx-0.5 inline-block align-baseline max-w-full overflow-x-auto custom-math-scrollbar">${katex.renderToString(math, {
            displayMode: false,
            throwOnError: false,
            strict: false,
            output: 'html',
          })}</span>`;
        } catch {
          return `<code>${math}</code>`;
        }
      } else {
        // Escape standard HTML characters, but support **bold**
        let escaped = part
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        
        // Convert **bold** to <strong>bold</strong>
        escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return escaped;
      }
    })
    .join('');
}

export const FormattedMathText: React.FC<FormattedMathTextProps> = ({ text, className = '' }) => {
  const html = useMemo(() => renderKaTeXInHtml(text), [text]);

  return (
    <span
      className={`select-text leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
