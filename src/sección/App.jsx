import React, { useState } from 'react';

// Íconos SVG puros (sin dependencias externas)
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
              const viaticoCalculado = calculateItemViaticos(item);
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedFlight(item)}
                  className="bg-slate-900/90 border border-slate-800/80 hover:border-sky-500/50 rounded-2xl p-4 transition-all shadow-md cursor-pointer active:scale-[0.98]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        VUELO
                      </span>
                      <span className="text-xs font-bold text-white">{item.fecha}</span>
                    </div>
                    {viaticoCalculado.cantidad > 0 && (
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        +${viaticoCalculado.monto.toLocaleString('es-AR')}
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-sm text-white mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <PlaneIcon /> {item.vuelos}
                    </span>
                    <ChevronRightIcon />
                  </div>

                  <div className="text-xs text-slate-400 mb-3">{item.ruta}</div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950/80 rounded-xl p-2.5 border border-slate-800 text-[11px] text-slate-300">
                    <div><span className="text-slate-500 block text-[10px]">Presentación</span><strong>{item.presentacion}</strong></div>
                    <div><span className="text-slate-500 block text-[10px]">Vuelo (TV)</span><strong className="text-sky-400">{item.tv}</strong></div>
                    <div><span className="text-slate-500 block text-[10px]">Servicio (TSV)</span><strong>{item.tsv}</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab de Topes Legales */}
        {activeTab === 'topes' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h2 className="text-base font-bold text-white">Topes Legales (RAAC 121 / CCT)</h2>

            <div className="space-y-3">
              {[
                { title: 'TV Semanal', ...topesData.tvSemanal },
                { title: 'TSV Semanal', ...topesData.tsvSemanal },
                { title: 'TV Mensual', ...topesData.tvMensual },
                { title: 'TSV Mensual', ...topesData.tsvMensual },
                { title: 'TV Trimestral', ...topesData.tvTrimestral, highlight: true },
                { title: 'TV Anual', ...topesData.tvAnual }
              ].map((tope, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-300">{tope.title}</span>
                    <span className={tope.highlight ? 'text-amber-400 font-bold text-sm' : 'text-white font-bold'}>{tope.actual}</span>
                  </div>

                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${tope.highlight ? 'bg-amber-500' : 'bg-slate-200'}`}
                      style={{ width: `${tope.pct}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Te quedan {tope.restante}</span>
                    <span>Tope: {tope.tope}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETALLE DEL VUELO (MODAL INTERACTIVO) */}
        {selectedFlight && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col justify-end">
            <div className="bg-slate-900 border-t border-slate-800 rounded-t-[32px] p-5 max-h-[92vh] overflow-y-auto space-y-4 shadow-2xl">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedFlight.fecha}</h3>
                  <p className="text-xs text-slate-400">Detalle de Operación y Tiempos Legales</p>
                </div>
                <button onClick={() => setSelectedFlight(null)} className="p-1.5 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                  <XIcon />
                </button>
              </div>

              {/* Tramos y Horarios */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-around text-xs font-semibold text-slate-400 border-b border-slate-800/80 pb-2">
                  <div>Presentación <strong className="text-white block text-sm">{selectedFlight.presentacion}</strong></div>
                  <div>Vuelo <strong className="text-sky-400 block text-sm">{selectedFlight.tv}</strong></div>
                  <div>Servicio <strong className="text-white block text-sm">{selectedFlight.tsv}</strong></div>
                </div>

                <div className="space-y-2 pt-1">
                  {selectedFlight.tramos.map(tr => (
                    <div key={tr.id} className="flex justify-between items-center text-xs bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div>
                        <div className="font-bold text-white">{tr.orig} → {tr.dest}</div>
                        <div className="text-[10px] text-slate-500">{tr.vuelo}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-slate-300">{tr.de} → {tr.a}</div>
                        <div className="text-[10px] text-slate-400">{tr.dur} hs | ☀️{tr.sol} 🌙{tr.noche}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarjeta de Cálculo: ÚLTIMO ATERRIZAJE POSIBLE */}
              <div className="bg-slate-950 border border-sky-500/40 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-3xl font-extrabold text-white tracking-tight">{selectedFlight.ultimoAterrizaje}</div>
                    <div className="text-xs text-slate-400">Último aterrizaje legal permitido</div>
                  </div>
                  <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Limitado por {selectedFlight.limitante}
                  </span>
                </div>

                {selectedFlight.demoraOperativa && (
                  <div className="text-xs text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    Con demora operativa declarada llegás hasta las <strong className="text-amber-400">{selectedFlight.demoraOperativa} hs</strong>.
                  </div>
                )}

                {/* Desglose de Cálculo */}
                <button 
                  onClick={() => setShowHowCalculated(!showHowCalculated)}
                  className="w-full text-left text-xs font-semibold text-sky-400 flex justify-between items-center pt-1"
                >
                  <span>Cómo se calcula</span>
                  <span>{showHowCalculated ? '▲' : '▼'}</span>
                </button>

                {showHowCalculated && (
                  <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                    <div className="flex justify-between"><span>Presentación programada:</span><span className="text-white">{selectedFlight.presentacion}</span></div>
                    <div className="flex justify-between"><span>Tope de servicio (2 pilotos):</span><span className="text-emerald-400">+ 13:00</span></div>
                    {selectedFlight.descuentoMadrugada && (
                      <div className="flex justify-between"><span>Madrugada (ventana WOCL):</span><span className="text-rose-400">- {selectedFlight.descuentoMadrugada}</span></div>
                    )}
                    <div className="flex justify-between border-t border-slate-800 pt-1 font-bold"><span>Fin de servicio tope:</span><span className="text-white">18:00</span></div>
                    <div className="flex justify-between text-slate-500"><span>Cierre post-vuelo:</span><span>- 0:30</span></div>
                    <div className="flex justify-between text-sky-400 font-bold border-t border-slate-800 pt-1"><span>Último aterrizaje:</span><span>{selectedFlight.ultimoAterrizaje}</span></div>
                  </div>
                )}
              </div>

              {/* Tripulación Designada */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UsersIcon /> Tripulación Designada
                </div>
                <div className="space-y-1.5 pt-1">
                  {selectedFlight.tripulacion.map((p, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-900 last:border-0">
                      <span className="text-slate-400">{p.rol}</span>
                      <span className="font-semibold text-white">{p.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipo asignado */}
              <div className="text-xs text-slate-400 text-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                Equipo asignado: <strong className="text-slate-200">{selectedFlight.equipo}</strong>
              </div>

            </div>
          </div>
        )}

        {/* Modal CWP Sync */}
        {showSyncModal && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <LockIcon /> Crew Web Portal Sync
                </h3>
                <button onClick={() => setShowSyncModal(false)} className="text-slate-400 text-xs">Cerrar</button>
              </div>
              <p className="text-xs text-slate-400">Sincronizando grilla, tripulaciones y novedades en tiempo real con CWP...</p>
              <button 
                onClick={() => setShowSyncModal(false)}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl text-xs transition-all"
              >
                Actualizar Roster
              </button>
            </div>
          </div>
        )}

        {/* Tab Bar Inferior */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('roster')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'roster' ? 'text-sky-400' : 'text-slate-500'}`}
          >
            <CalendarIcon />
            <span className="text-[10px] font-medium">Roster</span>
          </button>

          <button 
            onClick={() => setActiveTab('topes')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'topes' ? 'text-sky-400' : 'text-slate-500'}`}
          >
            <BarChart3Icon />
            <span className="text-[10px] font-medium">Topes Legales</span>
          </button>
        </div>

      </div>
    </div>
  );
}
