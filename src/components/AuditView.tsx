import React, { useState } from 'react';
import { HEURISTIC_AUDIT, DESIGN_CONCEPTS } from '../designTokens';
import { IconShield, IconLayers, IconSmartphone, IconCheck, IconAlertCircle, IconBarChart } from './Icons';
import { DesignConceptId } from '../types';

interface AuditViewProps {
  activeConcept: DesignConceptId;
  onSelectConcept: (conceptId: DesignConceptId) => void;
  onShowToast: (msg: string) => void;
}

export const AuditView: React.FC<AuditViewProps> = ({
  activeConcept,
  onSelectConcept,
  onShowToast
}) => {
  const [tab, setTab] = useState<'audit' | 'concepts' | 'routes'>('audit');

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="pb-3 border-b border-white/10 space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <IconLayers className="w-5 h-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">
            Auditoría UX/UI & Sistema de Diseño ADYP
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Diagnóstico heurístico completo, matriz de diseño para 3 conceptos nativos y arquitectura de rutas
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-900/90 rounded-2xl border border-white/10">
        <button
          onClick={() => setTab('audit')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            tab === 'audit' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Auditoría Heurística
        </button>
        <button
          onClick={() => setTab('concepts')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            tab === 'concepts' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Comparativa 3 Conceptos
        </button>
        <button
          onClick={() => setTab('routes')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            tab === 'routes' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Inventario de Rutas & Roles
        </button>
      </div>

      {/* TAB 1: AUDITORÍA HEURÍSTICA */}
      {tab === 'audit' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
            <strong className="text-white block mb-1">🎯 Conclusión de la Auditoría Inicial (Web actual):</strong>
            La plataforma de ADYP cuenta con una comunidad muy activa y valorada, pero la experiencia web original sufría de barreras móviles: zonas táctiles pequeñas (&lt;36px), pérdida de contexto en la barra fija, falta de feedback en microinteracciones y densidad de lectura no optimizada para exteriores. El rediseño propone un sistema de diseño táctil de primer nivel adaptado a iOS HIG y Android Material 3.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HEURISTIC_AUDIT.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{item.category}</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                    <p className="font-semibold text-rose-300 text-[11px] mb-1">Fricciones Heurísticas Detectadas:</p>
                    <ul className="space-y-1 text-slate-300">
                      {item.issues.map((iss, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 shrink-0 mt-0.5">•</span>
                          <span>{iss}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <p className="font-semibold text-emerald-300 text-[11px] mb-1">Solución de Diseño Implementada:</p>
                    <ul className="space-y-1 text-slate-300">
                      {item.solutions.map((sol, s) => (
                        <li key={s} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMPARATIVA 3 CONCEPTOS */}
      {tab === 'concepts' && (
        <div className="space-y-6">
          <p className="text-xs text-slate-400">
            Alterna en tiempo real entre los 3 conceptos visuales. Haz clic en «Activar este concepto» para aplicar los tokens visuales inmediatamente en toda la aplicación.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(DESIGN_CONCEPTS) as DesignConceptId[]).map((cid) => {
              const meta = DESIGN_CONCEPTS[cid];
              const isSelected = activeConcept === cid;

              return (
                <div
                  key={cid}
                  className={`p-4 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300 uppercase">
                        {cid === 'concept1' ? 'Concepto A' : cid === 'concept2' ? 'Concepto B' : 'Concepto C'}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500 text-white flex items-center gap-1">
                          <IconCheck className="w-3 h-3" />
                          <span>Activo</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-tight">{meta.name}</h3>
                      <p className="text-xs text-indigo-300 font-medium mt-0.5">{meta.tagline}</p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {meta.description}
                    </p>

                    {/* Metrics preview */}
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Contraste:</span>
                        <span className="font-mono text-emerald-400 font-semibold">{meta.metrics.contrastRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Velocidad:</span>
                        <span className="font-mono text-amber-300 font-semibold">{meta.metrics.perceivedSpeed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Alcance pulgar:</span>
                        <span className="font-mono text-white font-semibold">{meta.metrics.thumbReachability}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-300">Ventajas clave:</p>
                      <ul className="text-[11px] text-slate-400 space-y-0.5">
                        {meta.pros.map((p, idx) => (
                          <li key={idx}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectConcept(cid);
                      onShowToast(`Concepto aplicado: ${meta.name}`);
                    }}
                    className={`mt-4 w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/10 hover:bg-white/15 text-slate-200'
                    }`}
                  >
                    {isSelected ? 'Concepto Actual' : 'Activar este concepto'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Detailed Design Tokens Matrix Table */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 overflow-x-auto">
            <h3 className="text-sm font-bold text-white mb-3">Matriz Comparativa de Design Tokens</h3>
            <table className="w-full text-left text-xs text-slate-300 min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-2">Token / Propiedad</th>
                  <th className="py-2">Concepto 1 (Glassmorphism)</th>
                  <th className="py-2">Concepto 2 (Material Community)</th>
                  <th className="py-2">Concepto 3 (Neo-Editorial)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2 font-semibold text-white">Fondo Base</td>
                  <td>#020617 (Slate 950)</td>
                  <td>#0f172a (Deep Midnight)</td>
                  <td>#F9F6F0 (Warm Cream Paper)</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Superficie Tarjetas</td>
                  <td>rgba(15,23,42,0.7) + blur(20px)</td>
                  <td>#1e293b Sólido + Sombra</td>
                  <td>#FFFFFF Puro + Borde Lino</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Radio de Bordes</td>
                  <td>16px (rounded-2xl)</td>
                  <td>24px (rounded-3xl)</td>
                  <td>12px (rounded-xl)</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Acento Primario</td>
                  <td>Índigo Eléctrico (#6366F1)</td>
                  <td>Ámbar a Naranja Gradiente</td>
                  <td>Burdeos Vino Tinto (#991B1B)</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-white">Tipografía</td>
                  <td>Plus Jakarta Sans (Inter / SF)</td>
                  <td>Plus Jakarta Sans Bold</td>
                  <td>Playfair Display / Serif Luxury</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTARIO DE RUTAS */}
      {tab === 'routes' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400">
            Inventario completo de rutas públicas, de socios y de administración con control de acceso por rol:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-sm">Rutas Públicas & de Socios</h3>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/</span>
                  <span className="text-slate-400">Explorador principal & quedadas</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/agenda</span>
                  <span className="text-slate-400">Calendario cronológico</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/mapa</span>
                  <span className="text-slate-400">Mapa geolocalizado interactivo</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/quedada/:id</span>
                  <span className="text-slate-400">Detalle, aforo, inscripción</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/quedada/nueva</span>
                  <span className="text-slate-400">Crear propuesta de quedada</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/mis</span>
                  <span className="text-slate-400">Mis quedadas (apuntado y organizadas)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/comunidad</span>
                  <span className="text-slate-400">Directorio de socios y grupos</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/perfil</span>
                  <span className="text-slate-400">Mi cuenta, cuota, historial</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-indigo-300">/entrada</span>
                  <span className="text-slate-400">Inicio de sesión</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-mono text-indigo-300">/unirme</span>
                  <span className="text-slate-400">Formulario solicitud nuevo socio</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-sm">Rutas Moderación & Administración</h3>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-amber-300">/moderacion</span>
                  <span className="text-slate-400">Cola de revisión y reportes</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-rose-300">/admin/resumen</span>
                  <span className="text-slate-400">Dashboard ejecutivo y KPIs</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-rose-300">/admin/altas</span>
                  <span className="text-slate-400">Validación de solicitudes pendientes</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-rose-300">/admin/socios</span>
                  <span className="text-slate-400">Directorio y asignación de roles</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-rose-300">/admin/quedadas</span>
                  <span className="text-slate-400">Supervisión y cancelación global</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-rose-300">/admin/auditoria</span>
                  <span className="text-slate-400">Logs inmutables de seguridad</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="font-mono text-rose-300">/admin/ajustes</span>
                  <span className="text-slate-400">Parámetros generales del club</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-mono text-rose-300">/admin/datos</span>
                  <span className="text-slate-400">Exportación de respaldo local</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
