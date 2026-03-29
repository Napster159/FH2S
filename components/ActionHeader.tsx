'use client';

import React, { useState } from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { generatePdfBlob, downloadPdf, printPdf } from '@/utils/pdfGenerator';
import { FileDown, Printer, RotateCcw, FileText, Database, Settings, TableProperties } from 'lucide-react';
import Link from 'next/link';

export const ActionHeader = () => {
  const state = useFormStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const bytes = await generatePdfBlob(state);
      const fileName = `${state.firstName}_${state.lastName}_${state.ppr || 'X'}_FH2S.pdf`;
      downloadPdf(bytes, fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the template path.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async () => {
    setIsGenerating(true);
    try {
      const bytes = await generatePdfBlob(state);
      printPdf(bytes);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 lowercase">
          <div className="shrink-0">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/11733/11733416.png" 
              alt="Logo FH2S" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">FH2-AtlantaSanad</h1>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none">Formulaire Électronique</p>
          </div>
          <div className="sm:hidden">
            <h1 className="text-sm font-bold text-slate-900">FH2S Auto</h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-3">
          <button
            onClick={state.loadSampleData}
            title="Charger un exemple"
            className="p-2 md:px-4 md:py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <Database size={18} />
            <span className="hidden lg:inline">Exemple</span>
          </button>

          <Link
            href="/calibrate"
            title="Mode Calibration"
            className="p-2 md:px-4 md:py-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <TableProperties size={18} />
            <span className="hidden lg:inline">Calibration</span>
          </Link>

          <button
            onClick={state.resetForm}
            title="Réinitialiser le formulaire"
            className="p-2 md:px-4 md:py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <RotateCcw size={18} />
            <span className="hidden lg:inline">Effacer</span>
          </button>

          <div className="w-px h-6 bg-slate-200 mx-1 md:mx-2 hidden sm:block"></div>

          <button
            onClick={handlePrint}
            disabled={isGenerating}
            title="Imprimer"
            className="p-2.5 md:px-5 md:py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-xl text-sm font-bold transition-all"
          >
            <Printer size={18} />
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <FileDown size={18} />
            )}
            <span className="hidden sm:inline">Télécharger</span>
          </button>
        </div>
      </div>
    </header>
  );
};
