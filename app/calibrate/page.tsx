'use client';

import React, { useRef, useState, useEffect } from 'react';
import { MousePointer2, Hand, RotateCcw, RotateCw, Copy, Save, ArrowLeft, Crosshair, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import Link from 'next/link';

// Use standard import for v3.x
import * as pdfjs from 'pdfjs-dist';

// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Calibrate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null); // Ref for tracking the current rendering task
  const [pdf, setPdf] = useState<any>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.5);
  const [rotation, setRotation] = useState(0);
  const [toolMode, setToolMode] = useState<'select' | 'hand'>('select');
  const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
  
  // Panning state
  const [isPanning, setIsPanning] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument('/templates/Bulletin_FH2S.pdf');
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        renderPage(pdfDoc, scale, rotation);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    loadPdf();
  }, [scale, rotation]);

  const renderPage = async (pdfDoc: any, currentScale: number, currentRotation: number) => {
    const page = await pdfDoc.getPage(1);
    const viewport = page.getViewport({ scale: currentScale, rotation: currentRotation });
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cancel previous render task if it exists
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }

    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    setPdfDimensions({ width: viewport.width, height: viewport.height });

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    const renderTask = page.render(renderContext);
    renderTaskRef.current = renderTask;

    try {
      await renderTask.promise;
      renderTaskRef.current = null;
    } catch (error: any) {
      if (error.name === 'RenderingCancelledException') {
        // Expected if we cancelled the task
        return;
      }
      console.error('Render error:', error);
    }
  };

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (toolMode !== 'select') return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !pdf) return;

    // Relative mouse position on canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Get the viewport for coordinate translation
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale, rotation });

    // Use built-in converter (returns [pdfX, pdfY])
    // The Y coordinate in PDF is from bottom to top
    const [pdfX, pdfY] = viewport.convertToPdfPoint(x, y);

    setCoords({ x: Math.round(pdfX), y: Math.round(pdfY) });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (toolMode !== 'hand' || !containerRef.current) return;
    
    setIsPanning(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !containerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const copyToClipboard = () => {
    const text = `{ x: ${coords.x}, y: ${coords.y} }`;
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const rotate = (dir: 'cw' | 'ccw') => {
    setRotation(prev => {
      const next = dir === 'cw' ? prev + 90 : prev - 90;
      return (next + 360) % 360;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold flex items-center gap-2 text-white">
            <Crosshair className="text-orange-500" size={24} />
            Mode Calibration
          </h1>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 shadow-xl">
          <button 
            onClick={() => setToolMode('select')}
            className={`p-2 rounded-lg transition-all ${toolMode === 'select' ? 'bg-orange-500 text-white' : 'hover:bg-slate-700 text-slate-400'}`}
            title="Sélectionner (Coordonnées)"
          >
            <MousePointer2 size={18} />
          </button>
          <button 
            onClick={() => setToolMode('hand')}
            className={`p-2 rounded-lg transition-all ${toolMode === 'hand' ? 'bg-orange-500 text-white' : 'hover:bg-slate-700 text-slate-400'}`}
            title="Main (Déplacer)"
          >
            <Hand size={18} />
          </button>
          <div className="w-px h-6 bg-slate-700 mx-1"></div>
          <button 
            onClick={() => rotate('ccw')}
            className="p-2 hover:bg-slate-700 text-slate-400 rounded-lg"
            title="Rotation Anti-horaire"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={() => rotate('cw')}
            className="p-2 hover:bg-slate-700 text-slate-400 rounded-lg"
            title="Rotation Horaire"
          >
            <RotateCw size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">X:</span>
             <span className="text-lg font-mono text-orange-400 w-12">{coords.x}</span>
          </div>
          <div className="w-px h-6 bg-slate-700"></div>
          <div className="flex items-center gap-3">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Y:</span>
             <span className="text-lg font-mono text-orange-400 w-12">{coords.y}</span>
          </div>
          <button 
            onClick={copyToClipboard}
            className="ml-4 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all border border-slate-600 active:scale-95"
          >
            <Copy size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 mr-2">Zoom:</span>
            <button onClick={() => setScale(s => Math.max(0.2, s - 0.2))} className="p-1.5 bg-slate-800 rounded">-</button>
            <span className="text-sm font-mono">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(5, s + 0.2))} className="p-1.5 bg-slate-800 rounded">+</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Help Sidebar */}
        <aside className="w-80 bg-slate-900 border-r border-slate-800 p-6 space-y-8 overflow-y-auto">
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <h3 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2">
                <InfoIcon size={16} /> Instructions
              </h3>
              <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
                <li>1. Utilisez la **Main** pour vous déplacer.</li>
                <li>2. Utilisez la **Flèche** pour cliquer sur un champ.</li>
                <li>3. Les coordonnées (X, Y) sont **indépendantes** de la rotation.</li>
                <li>4. L'origine (0,0) est en **Bas à gauche**.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ajustement fin</h3>
            <div className="grid grid-cols-3 gap-2 max-w-[120px]">
              <div></div>
              <button 
                onClick={() => setCoords(c => ({...c, y: c.y + 1}))}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex justify-center"
              >
                <ChevronUp size={16} />
              </button>
              <div></div>
              <button 
                onClick={() => setCoords(c => ({...c, x: c.x - 1}))}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center justify-center text-[10px] text-slate-500">1pt</div>
              <button 
                onClick={() => setCoords(c => ({...c, x: c.x + 1}))}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex justify-center"
              >
                <ChevronRight size={16} />
              </button>
              <div></div>
              <button 
                onClick={() => setCoords(c => ({...c, y: c.y - 1}))}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex justify-center"
              >
                <ChevronDown size={16} />
              </button>
              <div></div>
            </div>
          </div>

          <div className="pt-20 opacity-20 text-center">
             <Crosshair size={64} className="mx-auto" />
          </div>
        </aside>

        {/* PDF Viewer */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 overflow-auto bg-slate-800/50 p-10 flex justify-center items-start ${toolMode === 'hand' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
        >
          <div className={`relative group shadow-2xl transition-transform ${toolMode === 'select' ? 'cursor-crosshair' : ''}`}>
            <canvas 
              ref={canvasRef} 
              onClick={handleCanvasClick}
              className="rounded shadow-2xl border border-slate-700 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoIcon = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);
