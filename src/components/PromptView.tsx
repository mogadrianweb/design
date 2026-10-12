import React, { useState } from 'react';
import { FULL_PROMPT_TEXT } from '../mockData';
import { IconCopy, IconCheck, IconFileText, IconDownload } from './Icons';

interface PromptViewProps {
  onShowToast: (msg: string) => void;
}

export const PromptView: React.FC<PromptViewProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(FULL_PROMPT_TEXT);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = FULL_PROMPT_TEXT;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      onShowToast('¡Prompt completo copiado al portapapeles!');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      onShowToast('Error al copiar al portapapeles');
    }
  };

  const handleDownloadHtml = () => {
    try {
      const link = document.createElement('a');
      link.href = '/adyp-diseno-premium/diseno.html';
      link.download = 'diseno.html';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onShowToast('Descargando diseno.html de referencia');
    } catch {
      onShowToast('Error al descargar archivo');
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 pb-24 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <IconFileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-white">Módulo «Prompt Maestro Glass iOS»</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Especificación oficial con estética Glassmorphism iOS, barras fijas permanentes y maqueta descargable
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadHtml}
            className="min-h-[40px] px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 active:scale-95 shadow-sm"
            title="Descargar archivo HTML autónomo para tu IA"
          >
            <IconDownload className="w-4 h-4 text-amber-400" />
            <span>Descargar diseño.html</span>
          </button>

          <button
            onClick={handleCopy}
            className={`min-h-[40px] px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-950/40'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40'
            }`}
          >
            {copied ? (
              <>
                <IconCheck className="w-4 h-4" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <IconCopy className="w-4 h-4" />
                <span>Copiar prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl bg-slate-950 border border-white/10 p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[650px] shadow-inner select-text">
        <pre className="whitespace-pre-wrap font-mono">{FULL_PROMPT_TEXT}</pre>
      </div>
    </div>
  );
};
