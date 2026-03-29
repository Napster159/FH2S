'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
// @ts-ignore
import * as pdfjs from 'pdfjs-dist';
import { Loader2, AlertCircle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfCanvasSectionProps {
  pdfUrl: string;
}

export const PdfCanvasSection: React.FC<PdfCanvasSectionProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);
  
  const [zoom, setZoom] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  // Initial PDF Loading
  useEffect(() => {
    let isMounted = true;
    
    const loadPdf = async () => {
      if (!pdfUrl) return;
      
      // Ensure worker is set up on client-side
      if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      }

      setLoading(true);
      setError(null);
      try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (isMounted) {
          setPdfDoc(pdf);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('PDF Loading error:', err);
        if (isMounted) {
          setError('Impossible de charger le document PDF.');
          setLoading(false);
        }
      }
    };
    loadPdf();
    return () => { isMounted = false; };
  }, [pdfUrl]);

  // Rendering logic based on zoom and document
  const renderPage = useCallback(async (zoomFactor: number) => {
    if (!pdfDoc || !canvasRef.current) return;
    
    // Cancel previous render task
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }

    try {
      const page = await pdfDoc.getPage(1);
      
      // Calculate initial "Fit to Width" scale
      const containerWidth = containerRef.current?.clientWidth || 800;
      const baseViewport = page.getViewport({ scale: 1 });
      const fitScale = (containerWidth - 40) / baseViewport.width; // 40px padding
      
      // Final scale = Fit Scale * User Zoom
      const finalScale = fitScale * zoomFactor;
      const viewport = page.getViewport({ scale: finalScale });
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      // High-DPI support
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      context.scale(dpr, dpr);

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      await renderTask.promise;
      renderTaskRef.current = null;
    } catch (err: any) {
      if (err.name === 'RenderingCancelledException') return;
      console.error('Canvas render error:', err);
    }
  }, [pdfDoc, zoom]);

  useEffect(() => {
    renderPage(zoom);
  }, [renderPage, zoom]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1.0);

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-lg overflow-hidden relative">
      {/* Zoom Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1.5 bg-white/90 backdrop-blur shadow-xl border border-slate-200 rounded-full">
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
          title="Zoom arrière"
        >
          <ZoomOut size={16} />
        </button>
        <div className="w-16 text-center text-xs font-bold text-slate-700">
          {Math.round(zoom * 100)}%
        </div>
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
          title="Zoom avant"
        >
          <ZoomIn size={16} />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <button
          onClick={handleReset}
          className="p-2 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
          title="Réinitialiser le zoom"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto p-4 md:p-10 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="min-w-max min-h-max flex items-center justify-center">
          <div className="relative inline-block h-fit">
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg"
              >
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                <p className="text-sm font-medium text-slate-500">Génération...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {error ? (
            <div className="flex flex-col items-center bg-white text-red-500 p-8 rounded-xl shadow-sm border border-red-100 text-center max-w-sm mx-auto">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="font-bold">{error}</p>
            </div>
          ) : (
            <canvas ref={canvasRef} className="shadow-2xl bg-white border border-slate-200 rounded-sm" />
          )}
          </div>
        </div>
      </div>
      
      {/* Scroll Info for Mobile */}
      <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/80 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none opacity-50">
        Utilisez deux doigts pour zoomer et défiler
      </div>
    </div>
  );
};
