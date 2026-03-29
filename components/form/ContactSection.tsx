'use client';

import React from 'react';
import { useFormStore } from '@/stores/useFormStore';
import { Mail, Phone, MapPin, Smartphone } from 'lucide-react';

export const ContactSection = () => {
  const { address, city, phoneFixed, gsm, email, updateField } = useFormStore();

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <MapPin size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">Coordonnées de l'Adhérent</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-slate-600">Adresse personnelle</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="N°, Rue, Quartier"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Ville</label>
          <input
            type="text"
            value={city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="VILLE"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="email"
              value={email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="votre@email.com"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all lowercase"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Téléphone Fixe</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="tel"
              value={phoneFixed}
              onChange={(e) => updateField('phoneFixed', e.target.value)}
              placeholder="05XXXXXXXX"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">GSM</label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="tel"
              value={gsm}
              onChange={(e) => updateField('gsm', e.target.value)}
              placeholder="06/07XXXXXXXX"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
