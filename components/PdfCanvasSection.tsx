'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Loader2, AlertCircle } from 'lucide-react';

// Setting the worker source once for the entire project
// @ts-ignore
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

interface PdfCanvasSectionProps {
  pdfUrl: string;
}

export const PdfCanvasSection: React.FC<PdfCanvasSectionProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderPdf = async () => {
      if (!pdfUrl || !canvasRef.current) return;
      
      setLoading(true);
      setError(null);

      // Cancel previous render task
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        if (!isMounted) return;

        // Get container width for responsive scaling
        const containerWidth = containerRef.current?.clientWidth || 800;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / baseViewport.width;
        
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) throw new Error('Could not get canvas context');

        // Set high DPI support
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
        
        if (isMounted) {
          setLoading(false);
          renderTaskRef.current = null;
        }
      } catch (err: any) {
        if (err.name === 'RenderingCancelledException') return;
        console.error('Canvas render error:', err);
        if (isMounted) {
          setError('Impossible d\'afficher l\'aperçu. Veuillez réessayer.');
          setLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfUrl]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
          <p className="text-sm font-medium text-slate-500">Génération de l'aperçu...</p>
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center text-red-500 p-8 text-center">
          <AlertCircle className="w-12 h-12 mb-4" />
          <p className="font-bold">{error}</p>
        </div>
      ) : (
        <canvas ref={canvasRef} className="shadow-lg max-w-full h-auto" />
      )}
    </div>
  );
};
