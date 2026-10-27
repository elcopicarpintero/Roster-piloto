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
    
