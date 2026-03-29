'use client';

import React from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { User, Fingerprint, Calendar, Hash, Shield, Building2, MapPin, FileDigit } from 'lucide-react';

export const IdentitySection = () => {
  const { 
    ppr, insuranceAffiliation, cnopsRegistration, foundationAffiliation,
    firstName, lastName, birthDay, birthMonth, birthYear, birthPlace,
    cin, documentType, documentExpiry, familyStatus, numberOfDependentChildren,
    updateField 
  } = useFormStore();

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <User size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Identification de l'Adhérent</h2>
      </div>

      {/* Top References */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pb-2 border-b border-slate-50">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">N° PPR</label>
          <input
            type="text"
            value={ppr}
            onChange={(e) => updateField('ppr', e.target.value)}
            placeholder="PPR"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">N° Affiliation AMO</label>
          <input
            type="text"
            value={insuranceAffiliation}
            onChange={(e) => updateField('insuranceAffiliation', e.target.value)}
            placeholder="Affiliation AMO"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">N° Imm CNOPS</label>
          <input
            type="text"
            value={cnopsRegistration}
            onChange={(e) => updateField('cnopsRegistration', e.target.value)}
            placeholder="Immatriculation CNOPS"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">N° Adhésion Fondation</label>
          <input
            type="text"
            value={foundationAffiliation}
            onChange={(e) => updateField('foundationAffiliation', e.target.value)}
            placeholder="Adhésion Fondation"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Nom</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="NOM"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Prénom</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Prénom"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Lieu de naissance</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => updateField('birthPlace', e.target.value)}
              placeholder="Lieu de naissance"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Date de naissance (JJ / MM / AAAA)</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              maxLength={2}
              value={birthDay}
              onChange={(e) => updateField('birthDay', e.target.value)}
              placeholder="JJ"
              className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-center"
            />
            <input
              type="text"
              maxLength={2}
              value={birthMonth}
              onChange={(e) => updateField('birthMonth', e.target.value)}
              placeholder="MM"
              className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-center"
            />
            <input
              type="text"
              maxLength={4}
              value={birthYear}
              onChange={(e) => updateField('birthYear', e.target.value)}
              placeholder="AAAA"
              className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-center"
            />
          </div>
        </div>

        {/* Identity Document */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Type de pièce d'identité</label>
          <select
            value={documentType}
            onChange={(e) => updateField('documentType', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="La Carte Nationale d’Identité">La Carte Nationale d’Identité</option>
            <option value="PASSPORT">Passeport</option>
            <option value="RESIDENCE_PERMIT">Carte de séjour</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">N° de pièce d'identité</label>
          <div className="relative">
            <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={cin}
              onChange={(e) => updateField('cin', e.target.value)}
              placeholder="N° Pièce"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Date expiration pièce</label>
          <input
            type="date"
            value={documentExpiry}
            onChange={(e) => updateField('documentExpiry', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Family Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Situation Familiale</label>
          <select
            value={familyStatus}
            onChange={(e) => updateField('familyStatus', e.target.value as any)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="celibataire">Célibataire</option>
            <option value="marie">Marié(e)</option>
            <option value="divorce">Divorcé(e)</option>
            <option value="veuf">Veuf(ve)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Nombre d'enfants à charge</label>
          <input
            type="number"
            min="0"
            value={numberOfDependentChildren}
            onChange={(e) => updateField('numberOfDependentChildren', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </section>
  );
};
