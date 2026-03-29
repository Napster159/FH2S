'use client';

import React from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { ClipboardCheck, UserCheck, FileText } from 'lucide-react';

export const BulletinStatusSection = () => {
  const { bulletinType, memberStatus, civility, updateField } = useFormStore();

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <FileText size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Type de Bulletin & Statut</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {/* Bulletin Type */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Type de Bulletin</label>
          <div className="flex bg-slate-100 p-1 rounded-lg h-[46px]">
            <button
              onClick={() => updateField('bulletinType', 'nouvelle_adhesion')}
              className={`flex-1 py-2 px-2 rounded-md text-xs font-bold transition-all ${
                bulletinType === 'nouvelle_adhesion' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Nouvelle Adhésion
            </button>
            <button
              onClick={() => updateField('bulletinType', 'avenant')}
              className={`flex-1 py-2 px-2 rounded-md text-xs font-bold transition-all ${
                bulletinType === 'avenant' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Avenant
            </button>
          </div>
        </div>

        {/* Member Status */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Statut de l'Assuré</label>
          <div className="flex bg-slate-100 p-1 rounded-lg h-[46px]">
            <button
              onClick={() => updateField('memberStatus', 'actif')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                memberStatus === 'actif' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Actif
            </button>
            <button
              onClick={() => updateField('memberStatus', 'retraite')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                memberStatus === 'retraite' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Retraité
            </button>
          </div>
        </div>

        {/* Civility */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Civilité</label>
          <div className="flex bg-slate-100 p-1 rounded-lg h-[46px]">
            <button
              onClick={() => updateField('civility', 'mr')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                civility === 'mr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Monsieur
            </button>
            <button
              onClick={() => updateField('civility', 'mme')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                civility === 'mme' ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Madame
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
