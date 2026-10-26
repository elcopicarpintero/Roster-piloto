import React, { useState, useMemo } from 'react';
import { 
  Calendar, Plane, DollarSign, Clock, Settings, RefreshCw, 
  Plus, Shield, CheckCircle2, Lock, ExternalLink, Moon, AlertTriangle
} from 'lucide-react';

// ROSTER BASE CWP (24OCT26 - 01DEC26)
const INITIAL_ROSTER = [
  { id: '1', fecha: '2026-10-24', tipo: 'VUELO', vuelos: 'AR1422 / AR1423', ruta: 'AEP - MDZ - EZE', checkIn: '17:50', checkOut: '23:40', tv: '03:40', tsv: '05:50', equipo: '738', activada: true },
  { id: '2', fecha: '2026-10-25', tipo: 'VUELO', vuelos: 'AR1686 / AR1687', ruta: 'AEP - BRC - AEP', checkIn: '16:55', checkOut: '23:45', tv: '04:30', tsv: '06:50', equipo: '73M', activada: true },
  { id: '3', fecha: '2026-10-28', tipo: 'VUELO', vuelos: 'AR1492/1581/1572/1643', ruta: 'EZE - SLA - COR - NQN - AEP', checkIn: '05:30', checkOut: '17:10', tv: '07:00', tsv: '11:40', equipo: '73M', activada: true },
  { id: '4', fecha: '2026-10-30', tipo: 'GUARDIA', vuelos: 'GUA EZE', ruta: 'Guardia EZE (00:01 - 23:59)', checkIn: '00:01', checkOut: '23:59', tv: '00:00', tsv: '00:00', equipo: '-', activada: false }, // Sin activar -> $0
  { id: '5', fecha: '2026-10-31', tipo: 'VUELO', vuelos: 'AR1894 / AR1879', ruta: 'AEP - FTE - USH - EZE', checkIn: '10:20', checkOut: '21:40', tv: '08:10', tsv: '11:20', equipo: '73M', activada: true },
  { id: '6', fecha: '2026-11-01', tipo: 'LIBRE', vuelos: 'D/L', ruta: 'Día Libre BUE', checkIn: '-', checkOut: '-', tv: '00:00', tsv: '00:00', equipo: '-', activada: false },
  { id: '7', fecha: '2026-11-02', tipo: 'LIBRE', vuelos: 'D/L', ruta: 'Día Libre BUE', checkIn: '-', checkOut: '-', tv: '00:00', tsv: '00:00', equipo: '-', activada: false },
  { id: '8', fecha: '2026-11-04', tipo: 'VUELO', vuelos: 'AR1280 / AR1281', ruta: 'AEP - SCL - AEP', checkIn: '06:00', checkOut: '12:50', tv: '04:30', tsv: '06:50', equipo: '73R', activada: true },
  { id: '9', fecha: '2026-11-05', tipo: 'VUELO', vuelos: 'AR1268 / AR1269', ruta: 'AEP - GIG - AEP', checkIn: '16:30', checkOut: '01:10', tv: '03:20', tsv: '05:10', equipo: '738', activada: true },
  { id: '10', fecha: '2026-11-08', tipo: 'VUELO', vuelos: 'AR1286 / AR1287', ruta: 'AEP - SCL - AEP', checkIn: '17:15', checkOut: '00:25', tv: '04:30', tsv: '07:10', equipo: '738', activada: true },
  { id: '11', fecha: '2026-11-10', tipo: 'GUARDIA', vuelos: 'SB1', ruta: 'Standby BUE (20:15 - 01:45)', checkIn: '20:15', checkOut: '01:45', tv: '00:00', tsv: '05:30', equipo: '-', activada: false }, // Sin activar -> $0
  { id: '12', fecha: '2026-11-12', tipo: 'GUARDIA', vuelos: 'SB1', ruta: 'Standby BUE (16:00 - 21:30)', checkIn: '16:00', checkOut: '21:30', tv: '00:00', tsv: '05:30', equipo: '-', activada: false }, // Sin activar -> $0
  { id: '13', fecha: '2026-11-14', tipo: 'VUELO', vuelos: 'AR1878 / AR1895', ruta: 'EZE - USH - FTE - AEP', checkIn: '05:50', checkOut: '17:00', tv: '08:00', tsv: '11:10', equipo: '738', activada: true },
  { id: '14', fecha: '2026-11-16', tipo: 'VACACIONES', vuelos: 'VAC', ruta: 'Vacaciones Programadas', checkIn: '-', checkOut: '-', tv: '00:00', tsv: '00:00', equipo: '-', activada: false },
];

export default function RosterPilotApp() {
  const [activeTab, setActiveTab] = useState('roster');
  const [roster, setRoster] = useState(INITIAL_ROSTER);
  const [viaticoDiarioRate, setViaticoDiarioRate] = useState(87564);
  const [limiteHorasMensual, setLimiteHorasMensual] = useState(90);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Convierte 'HH:MM' a minutos desde medianoche
  const timeToMinutes = (timeStr) => {
    if (!timeStr || timeStr === '-') return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const parseHours = (timeStr) => {
    if (!timeStr || timeStr === '-') return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h + (m / 60);
  };

  // Cálculo de viáticos con reglas CCT (Guardias activadas + Cierre >= 23:31)
  const calculateItemViaticos = (item) => {
    // Regla 1: Guardias no activadas NO cobran viático
    if (item.tipo === 'GUARDIA' && !item.activada) {
      return { cantidad: 0, monto: 0, excedeNocturno: false };
    }
    if (item.tipo === 'VACACIONES' || item.tipo === 'LIBRE') {
      return { cantidad: 0, monto: 0, excedeNocturno: false };
    }

    let cantidad = 1; // 1 Viático Base
    const checkOutMins = timeToMinutes(item.checkOut);

    // Regla 2: Cierre a partir de las 23:31 hs (1411 mins) o que cruce la medianoche (madrugada)
    // Se excluye guardia no activada.
    const excedeNocturno = checkOutMins >= 1411 || (checkOutMins > 0 && checkOutMins < 360);

    if (excedeNocturno) {
      cantidad += 1; // Suma segundo viático por cierre >= 23:31 hs
    }

    return { cantidad, monto: cantidad * viaticoDiarioRate, excedeNocturno };
  };

  const stats = useMemo(() => {
    let totalTV = 0;
    let totalTSV = 0;
    let totalViaticosCobrados = 0;
    let montoTotal = 0;

    roster.forEach(act => {
      totalTV += parseHours(act.tv);
      totalTSV += parseHours(act.tsv);
      const v = calculateItemViaticos(act);
      totalViaticosCobrados += v.cantidad;
      montoTotal += v.monto;
    });

    return {
      totalTVHours: Math.floor(totalTV),
      totalTVMins: Math.round((totalTV % 1) * 60),
      totalTSVHours: Math.floor(totalTSV),
      totalTSVMins: Math.round((totalTSV % 1) * 60),
      totalViaticosCobrados,
      montoTotal,
      porcentajeLimite: Math.min(100, Math.round((totalTV / limiteHorasMensual) * 100))
    };
  }, [roster, viaticoDiarioRate, limiteHorasMensual]);

  // Simulación del In-App WebView auto-sync
  const handleAutoSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setShowSyncModal(false);
      setIsLoggedIn(true);
      alert('Sincronización exitosa en segundo plano. Roster y viáticos actualizados.');
    }, 1500);
  };

  return (
    <div className="flex justify-center bg-slate-900 min-h-screen text-slate-100 font-sans p-0 sm:p-4">
      <div className="w-full max-w-md bg-slate-950 rounded-none sm:rounded-[40px] border-0 sm:border-[8px] border-slate-800 shadow-2xl flex flex-col h-screen sm:h-[840px] overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 px-5 pt-4 pb-3 border-b border-slate-800 flex items-center justify-between">
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
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            Actualizar Roster
          </button>
        </div>

        {/* Resumen Financiero & Horas */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-4 border-b border-slate-800/80">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Viáticos Totales</span>
              </div>
              <div className="text-lg font-bold text-emerald-400">
                ${stats.montoTotal.toLocaleString('es-AR')}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {stats.totalViaticosCobrados} viáticos liquidados
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Horas Vuelo (TV)</span>
              </div>
              <div className="text-lg font-bold text-sky-400">
                {stats.totalTVHours}h {stats.totalTVMins}m
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                TSV: {stats.totalTSVHours}h {stats.totalTSVMins}m
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400 text-[11px]">Cómputo FTL Mensual CCT</span>
              <span className="font-semibold text-slate-300 text-[11px]">{stats.totalTVHours}h / {limiteHorasMensual}h ({stats.porcentajeLimite}%)</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  stats.porcentajeLimite > 90 ? 'bg-rose-500' : 'bg-sky-500'
                }`}
                style={{ width: `${stats.porcentajeLimite}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Listado de Roster */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'roster' && (
            <>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Programación CWP
                </h2>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  CCT Validado
                </span>
              </div>

              {roster.map((item) => {
                const viaticoCalculado = calculateItemViaticos(item);
                return (
                  <div 
                    key={item.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 transition-all shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider ${
                          item.tipo === 'VUELO' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                          item.tipo === 'GUARDIA' ? (item.activada ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-500') :
                          item.tipo === 'VACACIONES' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {item.tipo} {item.tipo === 'GUARDIA' && (item.activada ? '(ACTIVADA)' : '(SIN ACTIVAR)')}
                        </span>
                        <span className="text-xs font-bold text-slate-200">{item.fecha}</span>
                      </div>

                      {viaticoCalculado.cantidad > 0 ? (
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            +${viaticoCalculado.monto.toLocaleString('es-AR')}
                          </span>
                          {viaticoCalculado.excedeNocturno && (
                            <span className="text-[9px] text-amber-400 flex items-center gap-0.5 mt-1 font-medium">
                              <Moon className="w-2.5 h-2.5" /> Cierre ≥ 23:31 (2 Viáticos)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">Sin Viático</span>
                      )}
                    </div>

                    <div className="font-semibold text-sm text-white mb-1 flex items-center gap-1.5">
                      {item.tipo === 'VUELO' && <Plane className="w-4 h-4 text-sky-400 rotate-45" />}
                      {item.vuelos}
                    </div>

                    <div className="text-xs text-slate-400 mb-2.5">{item.ruta}</div>

                    {item.tipo !== 'VACACIONES' && item.tipo !== 'LIBRE' && (
                      <div className="flex justify-between items-center text-[11px] bg-slate-950/60 rounded-xl p-2 text-slate-300 border border-slate-800/60">
                        <div><span className="text-slate-500">C/O:</span> {item.checkIn}</div>
                        <div><span className="text-slate-500">Cierre:</span> <strong className={viaticoCalculado.excedeNocturno ? 'text-amber-400' : 'text-slate-200'}>{item.checkOut}</strong></div>
                        <div><span className="text-slate-500">TV:</span> <strong className="text-sky-300">{item.tv}</strong></div>
                        <div><span className="text-slate-500">EQ:</span> {item.equipo}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Parámetros de Convenio
              </h2>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Valor Viático Diario Base ($ ARS)
                  </label>
                  <input 
                    type="number"
                    value={viaticoDiarioRate}
                    onChange={(e) => setViaticoDiarioRate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="text-sky-400 font-semibold">Reglas Automáticas CCT:</div>
                  <div>• Guardias sin volar: $0 Viático.</div>
                  <div>• Cierre a partir de 23:31 hs: Liquida 2° Viático.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal WebView CWP Auto-Sync */}
        {showSyncModal && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" /> Crew Web Portal (AR)
                </h3>
                <button onClick={() => setShowSyncModal(false)} className="text-slate-400 text-xs">Cerrar</button>
              </div>

              {!isLoggedIn ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">
                    Ingresá con tu legajo para vincular la sesión una única vez. La app descargará las actualizaciones automáticamente.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <input type="text" placeholder="Legajo (ej. 31451)" defaultValue="31451" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white" />
                    <input type="password" placeholder="Contraseña CWP" defaultValue="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white" />
                  </div>
                  <button 
                    onClick={handleAutoSync}
                    disabled={isSyncing}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl text-xs transition-all flex justify-center items-center gap-2"
                  >
                    {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Vincular y Descargar Roster'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-center py-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Sesión Autenticada</div>
                  <p className="text-xs text-slate-400">Las cookies seguras están guardadas en el dispositivo.</p>
                  <button 
                    onClick={handleAutoSync}
                    disabled={isSyncing}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl text-xs transition-all flex justify-center items-center gap-2"
                  >
                    {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Descargar Roster Actualizado'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Bar Inferior */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-around items-center">
          <button 
            onClick={() => setActiveTab('roster')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'roster' ? 'text-sky-400' : 'text-slate-500'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] font-medium">Roster</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-sky-400' : 'text-slate-500'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">Convenio</span>
          </button>
        </div>

      </div>
    </div>
  );
}
