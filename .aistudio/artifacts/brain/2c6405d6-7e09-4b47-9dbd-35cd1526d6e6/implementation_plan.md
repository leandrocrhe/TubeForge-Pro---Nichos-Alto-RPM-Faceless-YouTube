# TubeForge Pro | Plan de Implementación y Arquitectura

## Resumen Ejecutivo
TubeForge Pro es una plataforma SaaS de inteligencia de mercado y aceleración de canales automatizados (faceless) para YouTube. Este plan detalla la **Fase 5**: integración del motor de descubrimiento de nichos de alto RPM impulsado por Gemini API con búsqueda en tiempo real (Google Search Grounding), modal interactivo de parámetros de mercado y un panel lateral deslizable (Drawer) para la gestión, rescate y depuración del historial de nichos sugeridos.

---

## Decisiones Críticas y Puntos de Revisión

> [!IMPORTANT]
> **Decisión 1 (Confirmada por el Usuario): Activación del Descubrimiento con Gemini**
> - *Enfoque Elegido:* Botón destacado **"Descubrir Nuevos Nichos con IA"** en la barra de herramientas del Explorador que despliega un modal con configuración de categoría, umbral mínimo de RPM ($15+, $25+, $35+) y enfoque de tendencia (IA aplicada a negocios, finanzas/legal tech, crímenes corporativos, e-commerce B2B, o tendencias emergentes 2026).
> - *Razón:* Proporciona control preciso al creador sobre el tipo de oportunidad que desea explorar, evitando sugerencias genéricas.

> [!IMPORTANT]
> **Decisión 2 (Confirmada por el Usuario): Visualización y Gestión del Historial**
> - *Enfoque Elegido:* **Cajón lateral deslizable (Slide-over Drawer)** con badge de conteo en el Explorador, listado cronológico de nichos descubiertos, opciones de restauración inmediata al radar activo, eliminación individual por tarjeta y vaciado total con confirmación.
> - *Razón:* Mantiene la interfaz del explorador limpia sin saturar el feed principal, ofreciendo acceso inmediato a ideas previamente rescatadas.

---

## 1. Visión del Producto y Propuesta de Valor

### ¿Qué resuelve la Fase 5?
1. **Identificación Dinámica de Tendencias:** Los creadores ya no dependen únicamente de una base de datos estática; Gemini analiza patrones de búsqueda actuales y arbitrajes de tráfico de alto RPM en YouTube.
2. **Experimentación sin Pérdida de Datos:** Posibilidad de generar sugerencias temporales sin sobreescribir la base de nichos curados, permitiendo guardarlos selectivamente en el radar.
3. **Archivo Estratégico Reutilizable:** El creador puede almacenar decenas de nichos generados para diferentes canales y descartar con un solo clic los que no encajen con su calendario editorial.

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujos de Usuario
1. **Descubrimiento con Gemini:**
   - El usuario hace clic en `Descubrir Nuevos Nichos` en la cabecera del Explorador.
   - Selecciona categoría (o "Todas"), umbral de RPM ($15+, $25+, $35+) y enfoque de tendencia.
   - El backend consulta Gemini con Google Search Grounding y devuelve 3 nichos de alto rendimiento rigurosamente formateados (score, subnichos, pauta de monetización, stack IA y hook de 0-15s).
   - Se muestran en el modal con estado "Guardado en Historial" y botón para "+ Añadir al Radar Activo".
2. **Gestión en el Cajón de Historial (Drawer):**
   - El usuario abre el historial mediante el botón `Historial (N)` con contador en tiempo real.
   - Un cajón lateral con animación suave (`backdrop-blur` y transición de derecha a izquierda) muestra cada nicho con su timestamp de descubrimiento y métricas clave.
   - Botón `Restaurar al Radar` añade el nicho a la lista de exploración activa.
   - Botón `Eliminar` (icono papelera) retira el elemento individual.
   - Botón `Vaciar Historial` limpia la colección tras confirmación.

### Estilo e Integración Visual (Anti-Slop Discipline)
- **Cajón Lateral:** Fondo `bg-slate-950/95` con borde izquierdo `border-slate-800`, encabezado fijo con contador y botón de cierre `X` o `Esc`.
- **Tarjetas de Historial:** Superficies `bg-slate-900/80` con hover suave `hover:border-slate-700`, datos tipográficos limpios con `tabular-nums` para RPMs y badges semánticos discretos.
- **Botón de Descubrimiento:** Gradiente con micro-brillo `from-rose-600 via-indigo-600 to-rose-600` e icono `Sparkles` para distinguirse como la acción IA insignia del Explorador.

---

## 3. Decisiones Técnicas y de Arquitectura

| Decisión | Enfoque Seleccionado | Justificación | Alternativa Descartada |
| :--- | :--- | :--- | :--- |
| **Generación IA de Nichos** | Endpoint `/api/discover-niches` con `@google/genai` (`gemini-3.8-flash`) y respuesta JSON estructurada | Permite búsquedas en tiempo real con Google Search Grounding sin exponer claves en el cliente. | Llamadas client-side directas (inseguras y sin acceso a secretos de entorno). |
| **Persistencia del Historial** | `localStorage` con clave `tubeforge_niche_history_v1` | Garantiza que las sugerencias permanezcan disponibles entre sesiones y recargas del navegador. | Memoria volátil de React (los nichos descubiertos se perderían al refrescar la página). |
| **UI de Historial** | Slide-over Drawer lateral fijo | Permite inspeccionar el histórico en paralelo mientras se observa el radar principal, sin cambiar de pestaña. | Subpestaña o modal bloqueante que interrumpa el flujo del explorador. |

---

## 4. Arquitectura Técnica y Flujo de Componentes

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EXPLORER TAB CONTROLLER                         │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
                    ▼                                ▼
       ┌────────────────────────┐       ┌────────────────────────┐
       │ DiscoverNichesModal    │       │ NicheHistoryDrawer     │
       │ - Category / RPM Select│       │ - Slide-over Drawer UI │
       │ - Real-Time Gemini Call│       │ - Restore to Active DB │
       │ - Temporary Results UI │       │ - Delete item / Clear  │
       └───────────┬────────────┘       └────────────┬───────────┘
                   │                                 │
                   ▼                                 ▼
       ┌────────────────────────┐       ┌────────────────────────┐
       │ POST /api/discover-    │       │ LocalStorage Sync      │
       │ niches (Gemini Engine) │       │ - tubeforge_niche_     │
       │ - Google Search Ground │       │   history_v1           │
       └────────────────────────┘       └────────────────────────┘
```

---

## 5. Fases y Estado de Ejecución

### Fase 1: Motor de Inteligencia y Datos Clave (Completada)
- [x] Configuración de TypeScript con modelos estrictos (`Niche`, `SubNiche`).
- [x] Base de datos exhaustiva de 10 nichos de alto rendimiento ($15-$50 RPM).
- [x] Explorador con filtros multidimensionales y panel estratégico.

### Fase 2: Simulación Financiera 360° y Comparador (Completada)
- [x] Calculadora de proyección de ingresos combinados (AdSense + Afiliados + Sponsors).
- [x] Gráfico SVG responsivo de crecimiento a 12 meses.
- [x] Módulo comparador frente a frente de hasta 4 nichos con exportación Markdown.

### Fase 3: Laboratorio de Hooks y SOPs de Automatización (Completada)
- [x] Generador de 6 fórmulas psicológicas de hooks de retención con pautas sonoras/visuales.
- [x] Procedimientos operativos estandarizados (SOPs) para producción en 90 minutos.
- [x] Calificador interactivo de ideas propias con guardado directo en el radar.

### Fase 4: AI Script Studio, Pipeline Kanban y Teleprompter (Completada)
- [x] Generador de guiones estructurados de 8-10 min con Gemini y selector de visualización (Completo / Solo Voz / Pautas B-Roll).
- [x] Modo Teleprompter en vivo con auto-scroll dinámico, velocidades ajustables y guía visual de lectura.
- [x] Tablero Kanban de producción en 5 etapas con cálculo de horas y valor acumulado.
- [x] Simulador de feed móvil de YouTube y auditor de truncamiento de CTR.
- [x] Conexión bidireccional entre Explorador, Laboratorio de Hooks, Script Studio y Kanban.

### Fase 5: Descubrimiento de Nichos con Gemini & Historial de Tendencias (Completada)
- [x] **Endpoint `/api/discover-niches`**: Integración con `@google/genai` (`gemini-3.8-flash`) en `server.ts` con prompting especializado en micro-nichos emergentes, search grounding, timeout de seguridad (8s) y fallback estructurado de alta fidelidad.
- [x] **Modal de Descubrimiento de Nichos**: Interfaz interactiva (`DiscoverNichesModal.tsx`) para configurar categoría, umbral de RPM ($15+, $25+, $35+), enfoque de tendencia e ideas temporales con botones para añadir al radar, calcular rentabilidad o generar guión.
- [x] **Drawer Lateral de Historial de Nichos**: Panel deslizable (`NicheHistoryDrawer.tsx`) con badge numérico en tiempo real, búsqueda interna, restauración inmediata de nichos al radar activo, eliminación individual por tarjeta y vaciado total con confirmación.
- [x] **Persistencia LocalStorage**: Almacenamiento sincronizado de descubrimientos previos en `tubeforge_niche_history_v1` y nichos activos en `tubeforge_custom_niches_v1`.
- [x] **Verificación**: Validación completa con `lint_applet` (`tsc --noEmit`), `compile_applet` (Vite build) y pruebas de API exitosas en dev server.

