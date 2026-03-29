'use client';

import React, { useRef } from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { CreditCard, Info } from 'lucide-react';
import { splitRib } from '@/utils/ribUtils';

export const RibSection = () => {
  const { rib, updateField } = useFormStore();
  const digits = splitRib(rib);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRibChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 24);
    updateField('rib', value);
  };

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <CreditCard size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Information Bancaire (RIB)</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-800 text-sm">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>Saisissez les 24 chiffres de votre RIB. Ils seront automatiquement répartis dans les cases correspondantes du formulaire PDF.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">RIB (24 chiffres)</label>
          
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={rib}
              onChange={handleRibChange}
              placeholder="000 000 0000000000000000 00"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-mono tracking-widest text-base md:text-lg"
              maxLength={24}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
              {rib.length}/24
            </div>
          </div>
        </div>

        {/* Visual representation of the split digits */}
        <div className="grid grid-cols-12 gap-1 mt-6">
          {digits.map((digit, i) => (
            <div 
              key={i} 
              className={`aspect-square flex items-center justify-center border rounded transition-all font-mono text-sm sm:text-base ${
                digit !== ' ' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 font-bold' : 'border-slate-100 bg-slate-50/50 text-transparent'
              }`}
            >
              {digit}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-[8px] md:text-[10px] text-slate-400 px-1 font-medium uppercase tracking-tighter">
          <span className="w-[12%] text-center">Banque</span>
          <span className="w-[12%] text-center">Ville</span>
          <span className="w-[66%] text-center">N° Compte</span>
          <span className="w-[10%] text-center">Clé</span>
        </div>
      </div>
    </section>
  );
};
