'use client';

import React from 'react';
import { ActionHeader } from '@/components/ActionHeader';
import { IdentitySection } from '@/components/form/IdentitySection';
import { ContactSection } from '@/components/form/ContactSection';
import { SpouseSection } from '@/components/form/SpouseSection';
import { ChildrenSection } from '@/components/form/ChildrenSection';
import { RibSection } from '@/components/form/RibSection';
import { BulletinStatusSection } from '@/components/form/BulletinStatusSection';
import { FooterSection } from '@/components/form/FooterSection';
import { PdfPreview } from '@/components/PdfPreview';
import { motion } from 'framer-motion';
import { RefreshCcw, Eye, X } from 'lucide-react';
import { PrivacyNotice } from '@/components/PrivacyNotice';

export default function Home() {
  const [showMobilePreview, setShowMobilePreview] = React.useState(false);

  return (
    <main className="min-h-screen bg-slate-50 relative">
      <ActionHeader />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] md:h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Side: Form */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent ${showMobilePreview ? 'hidden lg:block' : 'block'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            <div className="space-y-2 px-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Bulletin d'Adhésion FH2S – AtlataSanad</h1>
              <p className="text-sm md:text-slate-500 font-medium italic">Remplissez les informations ci-dessous pour générer votre document officiel.</p>
            </div>

            <BulletinStatusSection />
            <IdentitySection />
            <ContactSection />
            <SpouseSection />
            <ChildrenSection />
            <RibSection />
            <FooterSection />

            <div className="flex justify-center pt-4 md:pt-8 pb-10 md:pb-0">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setShowMobilePreview(true);
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group flex flex-col items-center gap-3 md:gap-4 p-6 md:p-8 border-2 border-dashed border-slate-200 rounded-2xl md:rounded-3xl hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-400 hover:text-blue-600 w-full md:w-auto"
              >
                <div className="p-3 md:p-4 bg-slate-100 group-hover:bg-blue-100 rounded-full transition-colors">
                  <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                    <RefreshCcw className="group-hover:animate-spin-slow" size={24} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="md:text-xl font-bold">Formulaire complété ?</h3>
                  <p className="text-xs md:text-sm">Vérifiez l'aperçu et téléchargez votre PDF.</p>
                </div>
              </button>
            </div>

            <div className="h-10 md:h-20" /> {/* Spacer */}
          </motion.div>
        </div>

        {/* Right Side: PDF Preview */}
        <div className={`${showMobilePreview ? 'block fixed inset-0 z-50 pt-16 bg-white' : 'hidden'} lg:relative lg:block lg:inset-auto lg:pt-0 lg:w-[45%] xl:w-[40%] h-full bg-slate-100 shadow-inner`}>
          {showMobilePreview && (
            <button
              onClick={() => setShowMobilePreview(false)}
              className="lg:hidden absolute top-4 right-4 z-50 p-2 bg-slate-800 text-white rounded-full shadow-xl"
            >
              <X size={20} />
            </button>
          )}
          <PdfPreview />
        </div>
      </div>

      {/* Mobile FAB for Preview */}
      <button
        onClick={() => setShowMobilePreview(!showMobilePreview)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-300 border-2 border-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      >
        {showMobilePreview ? <X size={24} /> : <Eye size={24} />}
      </button>

      <PrivacyNotice />
    </main>
  );
}
