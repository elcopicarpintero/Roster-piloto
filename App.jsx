import React, { useState } from 'react';
import { 
  Calendar, Plane, RefreshCw, Users, ChevronRight, X, BarChart3, Lock
} from 'lucide-react';

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
      { rol: 'Auxiliar de A bordo (AX)', nombre: 'Gómez, Martín' }
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
    tv
