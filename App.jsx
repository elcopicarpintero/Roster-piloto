import React, { useState } from 'react';

// Íconos SVG limpios sin dependencias externas
const PlaneIcon = () => (
  <svg className="w-4 h-4 text-sky-400 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const RefreshCwIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BarChart3Icon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 012 2h2a2 2 0 012-2z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const INITIAL_ROSTER = [
  { 
    id: '1', 
    fecha: 'Miércoles 28', 
    fullDate: '2026-10-28',
    tipo: 'VUELO', 
    vuelos: 'AR1492/1581/1572/1643', 
    ruta: 'EZE - SLA - COR - NQN - AEP', 
    presentacion: '05:30', 
    checkOut: '17:10', 
    tv: '07:00', 
    tsv: '11:40', 
    equipo: '73M (Boeing 737 MAX 8)', 
    activada: true,
    tramos: [
      { id: 't1', vuelo: 'AR1492', orig: 'EZE', dest: 'SLA', de: '06:30', a: '08:45', dur: '2:15', sol: '2.3', noche: '0.0' },
      { id: 't2', vuelo: 'AR1581', orig: 'SLA', dest: 'COR', de: '09:45', a: '11:05', dur: '1:20', sol: '1.3', noche: '0.0' },
      { id: 't3', vuelo: 'AR1572', orig: 'COR', dest: 'NQN', de: '12:35', a: '14:20', dur: '1:45', sol: '1.7', noche: '0.0' },
      { id: 't4', vuelo: 'AR1643', orig: 'NQN', dest: 'AEP', de: '15:00', a: '16:40', dur: '1:40', sol: '1.7', noche: '0.0' }
    ],
    tripulacion: [
      { rol: 'Comandante (CP)', nombre: 'Pérez, Gustavo' },
      { rol: 'Primer Oficial (FO)', nombre: 'Croci Staziuk, Damián L.' },
      { rol: 'Comisario (CM)', nombre: 'Fernández, Lucía' },
      { rol: 'Auxiliar (AX)', nombre: 'Gómez, Martín' }
    ],
    ultimoAterrizaje: '17:30',
    demoraOperativa: '20:06',
    limitante: 'TSV',
    descuentoMadrugada: '0:30',
    tiempoEnTierra: '3:10'
  },
  { 
    id: '2', 
    fecha: 'Viernes 30', 
    fullDate: '2026-10-30',
    tipo: 'VUELO', 
    vuelos: 'AR1196 / AR1197', 
    ruta: 'AEP - REL - AEP', 
    presentacion: '16:40', 
    checkOut: '22:50', 
    tv: '04:00', 
    tsv: '06:10', 
    equipo: '738 (Boeing 737-800)', 
    activada: true,
    tramos: [
      { id: 't1', vuelo: 'AR1196', orig: 'AEP', dest: 'REL', de: '17:40', a: '19:45', dur: '2:05', sol: '2.1', noche: '0.0' },
      { id: 't2', vuelo: 'AR1197', orig: 'REL', dest: 'AEP', de: '20:25', a: '22:20', dur: '1:55', sol: '0.1', noche: '1.8' }
    ],
    tripulacion: [
      { rol: 'Comandante (CP)', nombre: 'González, Roberto' },
      { rol: 'Primer Oficial (FO)', nombre: 'Croci Staziuk, Damián L.' },
      { rol: 'Comisario (CM)', nombre: 'Ríos, Mariana' }
    ],
    ultimoAterrizaje: '02:10 (+1)',
    limitante: 'TSV'
  },
  { 
    id: '3', 
    fecha: 'Sábado 31', 
    fullDate: '2026-10-31',
    tipo: 'VUELO', 
    vuelos: 'AR1894 / AR1879', 
    ruta: 'AEP - FTE - USH - EZE', 
    presentacion: '10:20', 
    checkOut: '21:40', 
    tv: '08:10', 
    tsv: '11:20', 
    equipo: '73M (Boeing 737 MAX 8)', 
    activada: true,
    tramos: [
      { id: 't1', vuelo: 'AR1894', orig: 'AEP', dest: 'FTE', de: '11:20', a: '14:40', dur: '3:20', sol: '3.3', noche: '0.0' },
      { id: 't2', vuelo: 'AR1894', orig: 'FTE', dest: 'USH', de: '15:30', a: '16:50', dur: '1:20', sol: '1.3', noche: '0.0' },
      { id: 't3', vuelo: 'AR1879', orig: 'USH', dest: 'EZE', de: '17:40', a: '21:10', dur: '3:30', sol: '2.6', noche: '0.9' }
    ],
    tripulacion: [
      { rol: 'Comandante (CP)', nombre: 'Sánchez, Marcelo' },
      { rol: 'Primer Oficial (FO)', nombre: 'Croci Staziuk, Damián L.' },
      { rol: 'Comisario (CM)', nombre: 'Benítez, Diego' }
    ],
    ultimoAterrizaje: '01:50 (+1)',
    limitante: 'TSV'
  }
];

export default function RosterPilotApp() {
  const [activeTab, setActiveTab] = useState('roster');
  const [roster] = useState(INITIAL_ROSTER);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [viaticoDiarioRate] = useState(87564);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showHowCalculated, setShowHowCalculated] = useState(false);

  const topesData = {
    tvSemanal: { actual: '23:33', tope: '34:00', restante: '10:27 al 31/10', pct: 69 },
    tsvSemanal: { actual: '36:41', tope: '65:00', restante: '28:19 al 31/10', pct: 56 },
    tvMensual: { actual: '70:28', tope: '90:00', restante: '19:32 al 31/10', pct: 78 },
    tsvMensual: { actual: '110:39', tope: '200:00', restante: '89:21 al 31/10', pct: 55 },
    tvTrimestral: { actual: '194:41', tope: '240:00', restante: '45:19 al 31/10', pct: 81 },
    tvAnual: { actual: '551:26', tope: '860:00', restante: '308:34 al 14/11', pct: 64 }
  };

  const timeToMinutes = (timeStr) => {
    if (!timeStr || timeStr === '-') return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const calculateItemViaticos = (item) => {
    if (item.tipo === 'GUARDIA' && !item.activada) return { cantidad: 0, monto: 0, excedeNocturno: false };
    if (item.tipo === 'VACACIONES' || item.tipo === 'LIBRE') return { cantidad: 0, monto: 0, excedeNocturno: false };

    let cantidad = 1;
    const checkOutMins = timeToMinutes(item.checkOut);
    const excedeNocturno = checkOutMins >= 1411 || (checkOutMins > 0 && checkOutMins < 360);
    if (excedeNocturno) cantidad += 1;

    return { cantidad, monto: cantidad * viaticoDiarioRate, excedeNocturno };
  };

  return (
    <div className="flex justify-center bg-slate-950 min-h-screen text-slate-100 font-sans p-0 sm:p-4">
      <div className="w-full max-w-md bg-black rounded-none sm:rounded-[40px] border-0 sm:border-[8px] border-slate-900 shadow-2xl flex flex-col h-screen sm:h-[840px] overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900/90 px-5 pt-4 pb-3 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-base font-bold text-white tracking-wide">B737 Roster & Viáticos</h1>
            </div>
            <p className="text-xs text-slate-400">Croci Staziuk, Damian L. • FO</p>
          </div>
          <button 
            onClick={() => setShowSyncModal(true)}
            className="flex items-center gap-1.5 bg-sky-600/20 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-sky-600/30 transition-all active:scale-95"
          >
            <RefreshCwIcon />
            Actualizar Roster
          </button>
        </div>

        {/* Tab de Roster Principal */}
        {activeTab === 'roster' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Programación Octubre 2026</h2>
              <span className="text-[10px] text-sky-400 font-medium">Tocá un vuelo para detalles</span>
            </div>

            {roster.map((item) => {
              const viaticoCalculado = calculateItemViaticos(
