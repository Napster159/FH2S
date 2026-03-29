'use client';

import React, { useEffect, useState } from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { generatePdfBlob } from '@/utils/pdfGenerator';
import { FileText, RefreshCw, Eye } from 'lucide-react';

export const PdfPreview = () => {
  const state = useFormStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const updatePreview = async () => {
    setIsUpdating(true);
    try {
      const bytes = await generatePdfBlob(state);
      const blob = new Blob([bytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Clean up previous URL
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);

      setPdfUrl(url);
    } catch (error) {
      console.error('Error updating preview:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Debounced update for live preview
  useEffect(() => {
    // Skip the very first run if we want to avoid double-loading (since we have one on mount)
    const timeout = setTimeout(() => {
      updatePreview();
    }, 1000); // 1s debounce to avoid lag while typing

    return () => clearTimeout(timeout);
  }, [state]); // Will trigger whenever any field in state changes

  return (
    <div className="h-full flex flex-col items-center bg-slate-50 border-l border-slate-200">
      <div className="w-full flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
            <Eye size={18} />
          </div>
          <h3 className="font-bold text-slate-800">Aperçu du PDF</h3>
        </div>
        <button
          onClick={updatePreview}
          disabled={isUpdating}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 rounded-lg text-sm font-bold transition-all"
        >
          <RefreshCw size={14} className={isUpdating ? 'animate-spin' : ''} />
          Actualiser
        </button>
      </div>

      <div className="flex-1 w-full bg-slate-100 overflow-auto p-8 flex justify-center">
        {pdfUrl ? (
          <div className="w-full max-w-[800px] bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-200 aspect-[1/1.41]">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full border-none"
              title="PDF Preview"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-slate-400">
            <FileText size={48} className="mb-4 animate-pulse opacity-50" />
            <p className="font-semibold text-lg">Chargement de l'aperçu...</p>
            <p className="text-sm mt-2 text-center max-w-[200px]">Assurez-vous que le template existe dans /public/templates/</p>
          </div>
        )}
      </div>

      <div className="w-full p-4 bg-white border-t border-slate-200 text-center">
        <p className="text-[10px] items-center gap-1 flex justify-center text-slate-400 font-bold uppercase tracking-widest">
          Formulaire électronique de remplissage FH2 – AtlataSanad | AYOUB ERRAKI
        </p>
      </div>
    </div>
  );
};
