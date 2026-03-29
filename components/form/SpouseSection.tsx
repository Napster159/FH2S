'use client';

import React from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { Heart, UserPlus, Trash2, Calendar, User, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SpouseSection = () => {
  const { familyStatus, spouses, addSpouse, removeSpouse, updateSpouse } = useFormStore();

  if (familyStatus === 'celibataire') {
    return null;
  }

  return (
    <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
            <Heart size={20} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Identification du/des conjoint(s)</h2>
        </div>
        <button
          onClick={addSpouse}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 hover:bg-pink-100 rounded-lg text-sm font-bold transition-all"
        >
          <UserPlus size={16} />
          Ajouter un conjoint
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {spouses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 border-2 border-dashed border-slate-100 rounded-xl text-slate-400"
            >
              Aucun conjoint ajouté. Cliquez sur "Ajouter" si nécessaire.
            </motion.div>
          ) : (
            spouses.map((spouse, index) => (
              <motion.div
                key={spouse.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="p-6 bg-slate-50 rounded-xl border border-slate-100 relative group"
              >
                <button
                  onClick={() => removeSpouse(spouse.id)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Prénom</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="text"
                        value={spouse.firstName}
                        onChange={(e) => updateSpouse(spouse.id, { firstName: e.target.value })}
                        placeholder="Prénom"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none text-sm uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nom</label>
                    <input
                      type="text"
                      value={spouse.lastName}
                      onChange={(e) => updateSpouse(spouse.id, { lastName: e.target.value })}
                      placeholder="Nom"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none text-sm uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Date de naissance</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="date"
                        value={spouse.birthDate}
                        onChange={(e) => updateSpouse(spouse.id, { birthDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Profession</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="text"
                        value={spouse.profession}
                        onChange={(e) => updateSpouse(spouse.id, { profession: e.target.value })}
                        placeholder="Profession"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-pink-500 outline-none text-sm uppercase"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
