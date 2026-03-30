'use client';

import React from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { PenTool, MapPin, Calendar } from 'lucide-react';

export const FooterSection = () => {
  const { signedAt, signedDate, updateField } = useFormStore();

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
          <PenTool size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Validation & Signature</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            Fait à <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={signedAt}
              onChange={(e) => updateField('signedAt', e.target.value)}
              placeholder="Ex: Casablanca"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 flex items-center gap-1">
            Le <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="date"
              value={signedDate}
              onChange={(e) => updateField('signedDate', e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 text-amber-700 text-sm italic">
        "Déclare sur l'honneur que les renseignements fournis dans ce bulletin sont conformes à ma situation personnelle et administrative."
      </div>
    </section>
  );
};
