'use client';

import React from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { Baby, Plus, Trash2, Calendar, User, School, ShieldCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChildrenSection = () => {
  const { children, addChild, removeChild, updateChild } = useFormStore();

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Baby size={20} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Enfants à charge</h2>
        </div>
        <button
          onClick={addChild}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg text-sm font-bold transition-all"
        >
          <Plus size={16} />
          Ajouter un enfant
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {children.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl text-slate-400"
            >
              Aucun enfant ajouté. Cliquez sur "Ajouter" pour commencer.
            </motion.div>
          ) : (
            children.map((child, index) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1 md:pr-10">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Prénom & Nom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) => updateChild(child.id, { name: e.target.value })}
                        placeholder="Prénom & Nom"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-sm uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Date de Naissance</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="date"
                        value={child.birthDate}
                        onChange={(e) => updateChild(child.id, { birthDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Régime de Base (Assureur)</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="text"
                        value={child.baseRegimeInsurer}
                        onChange={(e) => updateChild(child.id, { baseRegimeInsurer: e.target.value })}
                        placeholder="Ex: CNOPS, CNSS"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-sm uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Situation</label>
                    <div className="relative">
                      <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <select
                        value={child.situation}
                        onChange={(e) => updateChild(child.id, { situation: e.target.value as any })}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-sm appearance-none"
                      >
                        <option value="">Standard</option>
                        <option value="N">N (Nouveau)</option>
                        <option value="H">H (Handicap)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sexe</label>
                    <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                      <button
                        onClick={() => updateChild(child.id, { gender: 'M' })}
                        className={`flex-1 py-1 px-2 rounded-md text-xs font-bold transition-all ${
                          child.gender === 'M' ? 'bg-blue-50 text-blue-600' : 'text-slate-400'
                        }`}
                      >
                        Garçon
                      </button>
                      <button
                        onClick={() => updateChild(child.id, { gender: 'F' })}
                        className={`flex-1 py-1 px-2 rounded-md text-xs font-bold transition-all ${
                          child.gender === 'F' ? 'bg-pink-50 text-pink-600' : 'text-slate-400'
                        }`}
                      >
                        Fille
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 space-y-2 mt-4">
                    <button
                      onClick={() => updateChild(child.id, { isSchooled: !child.isSchooled })}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        child.isSchooled 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-white text-slate-400 border border-slate-200 opacity-60'
                      }`}
                    >
                      <School size={14} />
                      Scolarisé
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeChild(child.id)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
