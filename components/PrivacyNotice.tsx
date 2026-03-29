'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, Info } from 'lucide-react';

export const PrivacyNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('privacy-notice-dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('privacy-notice-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[100] max-w-sm"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-blue-500/10 rounded-2xl p-5 flex gap-4 items-start relative overflow-hidden group">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-blue-100/50 transition-colors" />
            
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 shrink-0 relative z-10">
              <ShieldCheck size={20} />
            </div>

            <div className="space-y-1 relative z-10">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                Confidentialité Totale
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Vos données restent à vous. Ce site ne collecte, ne stocke et ne transmet aucune information personnelle. Tout est traité localement dans votre navigateur.
              </p>
            </div>

            <button
              onClick={dismiss}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
