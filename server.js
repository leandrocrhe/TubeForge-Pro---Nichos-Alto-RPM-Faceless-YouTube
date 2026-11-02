// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
process.env.DISABLE_HMR = "true";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3e3;
  app.use(express.json({ limit: "10mb" }));
  const apiKey = process.env.GEMINI_API_KEY;
  let ai = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  app.post("/api/generate-script", async (req, res) => {
    try {
      const {
        nicheName = "Tecnolog\xEDa B2B",
        subNiche = "",
        duration = "8-10 minutos",
        tone = "Autoritativo y din\xE1mico",
        hookPremise = "",
        modelChoice = "gemini-3.8-flash"
      } = req.body;
      const prompt = `Act\xFAa como un guionista de \xE9lite galardonado para canales de YouTube Faceless de alto rendimiento y retenci\xF3n r\xE9cord (m\xE1s del 70% a los 30 segundos).
Quiero que escribas un gui\xF3n completo, profesional y listo para grabar para un video de ${duration} minutos.

DATOS DEL PROYECTO:
- Nicho de Alto RPM: "${nicheName}"
- Sub-nicho / Enfoque: "${subNiche || nicheName}"
- Tono y Estilo: "${tone}"
- Premisa Inicial de Gancho (Hook): "${hookPremise || "Revelaci\xF3n inesperada sobre costos o ventajas ocultas"}"

REGLAS DE FORMATO Y ESTRUCTURA OBLIGATORIA:
Genera el contenido estructurado en formato Markdown limpio con las siguientes secciones expl\xEDcitas:

# [T\xCDTULO SUGERIDO DE ALTO CTR - M\xC1XIMO 50 CARACTERES]

### 1. HOOK EXPLOSIVO (0:00 - 0:15)
- Texto exacto que pronuncia la voz en off, sin rodeos, sin saludar, sin pedir likes.
- Acotaciones visuales y de dise\xF1o sonoro entre corchetes, por ejemplo: [B-ROLL: Captura de pantalla con zoom in 1.3x] [SFX: Sub-bass drop].

### 2. RE-HOOK DE VALIDACI\xD3N (0:15 - 0:45)
- Por qu\xE9 ignorar este tema cuesta miles de d\xF3lares o tiempo.
- La gran promesa del video que obliga al espectador a quedarse hasta el final.

### 3. BLOQUE 1: LA ANATOM\xCDA DEL PROBLEMA O TRAMPA OCULTA (0:45 - 2:30)
- Explicaci\xF3n del fallo o fricci\xF3n de la industria con pruebas visuales.

### 4. BLOQUE 2: CASO DE ESTUDIO / EVIDENCIA REAL (2:30 - 5:00)
- Cronolog\xEDa y n\xFAmeros reales, balances o documentos desglosados paso a paso.

### 5. BLOQUE 3: EL BLUEPRINT / SOLUCI\xD3N PASO A PASO (5:00 - 7:30)
- El m\xE9todo accionable que cualquier espectador puede implementar hoy mismo.

### 6. BLOQUE 4: ERRORES CR\xCDTICOS A EVITAR (7:30 - 8:45)
- Las 3 trampas comunes que arruinan la implementaci\xF3n de los principiantes.

### 7. CONCLUSI\xD3N Y CALL TO ACTION ORG\xC1NICO (8:45 - Final)
- Cierre contundente y llamado a descargar el recurso / lead magnet en el primer comentario fijado.

---
### FICHA T\xC9CNICA DE PRODUCCI\xD3N:
- **Total estimado de palabras:** [Indicar palabra aproximada]
- **Tiempo de lectura a 140 palabras/min:** [Indicar minutos]
- **Prompt para Miniatura Midjourney v6.1:** /imagine prompt: ... --ar 16:9 --v 6.1
- **Voz Recomendada en ElevenLabs:** [Indicar perfil, ej: Adam o Marcus]`;
      if (ai) {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt
        });
        const scriptContent = response.text || "";
        return res.json({
          success: true,
          source: "gemini",
          script: scriptContent
        });
      } else {
        const fallbackScript = generateStructuredFallbackScript(nicheName, subNiche, duration, tone, hookPremise);
        return res.json({
          success: true,
          source: "fallback",
          script: fallbackScript
        });
      }
    } catch (error) {
      console.error("Error in /api/generate-script:", error);
      res.status(500).json({
        success: false,
        error: error?.message || "Error al generar el gui\xF3n con IA"
      });
    }
  });
  app.post("/api/discover-niches", async (req, res) => {
    try {
      const {
        category = "all",
        minRpm = 20,
        trendFocus = "Tendencias Emergentes de Alto RPM"
      } = req.body;
      if (ai) {
        try {
          const prompt = `Eres el director de inteligencia de monetizaci\xF3n en YouTube para TubeForge Pro.
Tu misi\xF3n es identificar y calibrar 3 micro-nichos emergentes y no saturados para canales automatizados (faceless) en YouTube en 2026, basados en tendencias actuales de b\xFAsqueda y arbitraje de anunciantes de alto CPM.

PAR\xC1METROS SOLICITADOS:
- Categor\xEDa preferida: "${category === "all" ? "Cualquier categor\xEDa de alto rendimiento (Legal, Tecnolog\xEDa, Finanzas, Salud, Negocios)" : category}"
- RPM M\xEDnimo objetivo: $${minRpm} USD por 1,000 visualizaciones
- Enfoque o \xE1ngulo tem\xE1tico de tendencia: "${trendFocus}"

DEBES RESPONDER EXCLUSIVAMENTE CON UN ARRAY JSON V\xC1LIDO DE 3 OBJETOS (SIN TEXTO ANTES O DESPU\xC9S, SIN BLOQUES DE MARKDOWN EXTRA):
Cada objeto debe tener esta estructura exacta:
[
  {
    "id": "ai_niche_${Date.now()}_1",
    "name": "Nombre descriptivo y comercial del nicho",
    "category": "Una de: Legal, Tecnolog\xEDa, Finanzas, Salud, Negocios, Estilo de Vida",
    "badge": "Etiqueta corta (ej: AI Agents B2B)",
    "icon": "bot",
    "cpm": "$40 - $85",
    "rpmMin": ${Math.max(15, Number(minRpm))},
    "rpmMax": ${Math.max(35, Number(minRpm) + 25)},
    "avgRpm": ${Math.max(22, Number(minRpm) + 10)},
    "opportunityScore": 88,
    "competition": "Baja",
    "facelessScore": 92,
    "productionHours": 2.2,
    "searchVsBrowse": "65% Search / 35% Browse",
    "desc": "Por qu\xE9 este nicho tiene alto RPM en 2026 y cu\xE1l es el arbitraje comercial.",
    "subniches": [
      {
        "title": "Subtema #1 espec\xEDfico",
        "cpmScore": "Muy Alto",
        "angles": "\xC1ngulo de investigaci\xF3n o tutorial",
        "formats": "Estilo documental / Screen Studio",
        "monetization": "AdSense + Afiliados B2B ($200 CPA)",
        "techStack": ["ElevenLabs", "CapCut", "Screen Studio"]
      },
      {
        "title": "Subtema #2 espec\xEDfico",
        "cpmScore": "Alto",
        "angles": "\xC1ngulo comparativo o an\xE1lisis de costos",
        "formats": "Explicador animado",
        "monetization": "Patrocinios directos + AdSense",
        "techStack": ["Midjourney v6.1", "HeyGen", "Claude 3.7"]
      }
    ],
    "hooks": [
      "Si usas este software o servicio, hay una cl\xE1usula que te cobrar\xE1 4x sin avisarte.",
      "El 95% de las empresas comete este error antes de auditar sus contratos de...",
      "C\xF3mo este peque\xF1o cambio gener\xF3 $14,000 este mes sin contratar programadores."
    ],
    "sopSteps": [
      "Identificar contratos y casos p\xFAblicos en foros especializados y Reddit",
      "Redactar escaleta con gancho de retenci\xF3n de 15 segundos",
      "Sintetizar locuci\xF3n con voz autoritativa en ElevenLabs",
      "Recopilar capturas de documentos y B-roll corporativo en Storyblocks",
      "Montaje en CapCut a 1.2x con subt\xEDtulos cinem\xE1ticos en amarillo",
      "Publicar con t\xEDtulo menor a 50 caracteres y miniatura de alto contraste"
    ],
    "isCustom": true
  }
]`;
          const genPromise = ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });
          const timeoutPromise = new Promise(
            (_, reject) => setTimeout(() => reject(new Error("Timeout de API Gemini (8s)")), 8e3)
          );
          const response = await Promise.race([genPromise, timeoutPromise]);
          const rawText = response?.text || "";
          const cleanedText = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          const parsed = JSON.parse(cleanedText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return res.json({
              success: true,
              source: "gemini",
              niches: parsed.map((item, idx) => ({
                ...item,
                id: item.id || `ai_niche_${Date.now()}_${idx}`,
                isCustom: true
              }))
            });
          }
        } catch (apiErr) {
          console.warn("Gemini discovery API error, serving intelligent fallback:", apiErr);
        }
      }
      const fallbackNiches = generateTrendingFallbackNiches(category, minRpm, trendFocus);
      return res.json({
        success: true,
        source: "fallback",
        niches: fallbackNiches
      });
    } catch (error) {
      console.error("Error in /api/discover-niches:", error);
      res.status(500).json({
        success: false,
        error: error?.message || "Error al descubrir nichos con IA"
      });
    }
  });
  const distPath = path.resolve(__dirname, "dist");
  const isProduction = process.env.NODE_ENV === "production" && fs.existsSync(distPath);
  if (isProduction) {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false
      },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TubeForge Pro server running on http://0.0.0.0:${PORT}`);
  });
}
function generateStructuredFallbackScript(nicheName, subNiche, duration, tone, hookPremise) {
  const cleanNiche = nicheName.split(",")[0];
  const hookText = hookPremise || `Si est\xE1s involucrado en ${cleanNiche}, hay una regla cr\xEDtica que la mayor\xEDa desconoce y que te costar\xE1 caro ignorar.`;
  return `# La Verdad Oculta Sobre ${cleanNiche} en 2026

### 1. HOOK EXPLOSIVO (0:00 - 0:15)
[SFX: Sub-bass sordo + corte inmediato a pantalla completa en blanco y negro]
[B-ROLL: Zoom in acelerado hacia documento oficial con marcas de texto en amarillo fosforescente]
**Voz en Off:** "${hookText} Durante los pr\xF3ximos minutos vas a entender con n\xFAmeros reales por qu\xE9 el 90% comete este error y c\xF3mo revertirlo antes de que sea tarde."

---

### 2. RE-HOOK DE VALIDACI\xD3N (0:15 - 0:45)
[SFX: Efecto Whoosh suave]
[B-ROLL: Gr\xE1fico con curva ascendente de capital y timeline cronol\xF3gico interactivo]
**Voz en Off:** "No estamos hablando de teor\xEDa barata ni de consejos reciclados. Lo que est\xE1s a punto de ver es la estructura exacta que firmas y ejecutas a diario en ${subNiche || cleanNiche}. Ignorar esta regla no solo reduce tus m\xE1rgenes a cero; te expone a costes legales y de oportunidad que tardar\xE1s meses en recuperar. Qu\xE9date hasta el minuto 6 porque el tercer paso es el que marca la diferencia absoluta."

---

### 3. BLOQUE 1: LA ANATOM\xCDA DE LA TRAMPA OCULTA (0:45 - 2:30)
[B-ROLL: Capturas de pantalla analizando contratos, comisiones ocultas o flujos de software con Screen Studio]
[SFX: Sonido de tecleo de m\xE1quina y clicks mec\xE1nicos limpios]
**Voz en Off:** "El primer gran problema ocurre aqu\xED, en la intermediaci\xF3n. Tradicionalmente, cuando intentas operar en este sector, las plataformas imponen m\xE1rgenes ocultos de entre el 20% y el 35%. La mayor\xEDa de los creadores y operadores novatos asumen este coste como inevitable. Pero observa lo que sucede cuando auditamos la letra peque\xF1a..."

---

### 4. BLOQUE 2: EVIDENCIA & CASO DE ESTUDIO (2:30 - 5:00)
[B-ROLL: Hoja de c\xE1lculo limpia en Google Sheets con balances reales, ingresos brutos vs netos]
[SFX: Notificaci\xF3n corta y sutil de confirmaci\xF3n]
**Voz en Off:** "Analicemos un caso documentado. Con una facturaci\xF3n base de $10,000 mensuales, la estructura convencional drena m\xE1s de $2,400 en tarifas invisibles. Al aplicar el protocolo de optimizaci\xF3n que estamos detallando, esa p\xE9rdida se reduce a menos de $150 al mes, liberando un flujo de caja neto inmediato."

---

### 5. BLOQUE 3: EL BLUEPRINT PASO A PASO (5:00 - 7:30)
[B-ROLL: Diagrama de flujo 2D con nodos interactivos y flechas conectoras]
**Voz en Off:** 
- **Paso 1:** Configurar la entidad o cuenta sin intermediarios redundantes.
- **Paso 2:** Automatizar la verificaci\xF3n mediante herramientas de bajo coste.
- **Paso 3:** Establecer el canal de monetizaci\xF3n directa con contratos blindados.

---

### 6. BLOQUE 4: ERRORES FATALES A EVITAR (7:30 - 8:45)
[B-ROLL: Pantalla con advertencia en rojo y cruz tachando pr\xE1cticas obsoletas]
[SFX: Alerta baja sutil]
**Voz en Off:** "Cuidado con estos dos errores fatales: primero, delegar la custodia o el acceso ra\xEDz a terceros sin contrato de confidencialidad. Segundo, precipitar la inversi\xF3n publicitaria antes de tener la tasa de conversi\xF3n validada."

---

### 7. CONCLUSI\xD3N Y CALL TO ACTION (8:45 - Final)
[B-ROLL: Vista previa del archivo descargable con mockup 3D]
[SFX: Acorde musical c\xE1lido de resoluci\xF3n]
**Voz en Off:** "He preparado la plantilla completa y el checklist de implementaci\xF3n para que puedas replicarlo en menos de una hora. Puedes descargarla completamente gratis en el enlace del primer comentario fijado. Suscr\xEDbete si buscas maximizar el rendimiento real de tu tiempo. Nos vemos en el pr\xF3ximo an\xE1lisis."

---
### FICHA T\xC9CNICA DE PRODUCCI\xD3N:
- **Total estimado de palabras:** ~1,180 palabras.
- **Tiempo de locuci\xF3n estimado:** ~8 minutos y 20 segundos a 140 ppm.
- **Prompt para Miniatura Midjourney v6.1:** \`/imagine prompt: Dramatic high-contrast conceptual scene representing ${cleanNiche.toLowerCase()}, deep shadows, volumetric golden and crimson lighting, rule of thirds, clean negative space on left side for bold title overlay --ar 16:9 --style raw --v 6.1\`
- **Perfil de Voz Sugerido (ElevenLabs):** Adam o Marcus (Estabilidad 55%, Claridad 80%, Estilo Exageraci\xF3n 0%).`;
}
function generateTrendingFallbackNiches(category, minRpm, trendFocus) {
  const baseRpm = Math.max(18, Number(minRpm) || 20);
  const timestamp = Date.now();
  const library = [
    {
      id: `ai_trend_${timestamp}_1`,
      name: "Auditor\xEDa de Ciberseguridad & Fraudes en Pagos B2B",
      category: "Tecnolog\xEDa",
      badge: "CyberSec & Fintech",
      icon: "shield",
      cpm: `$${baseRpm + 15} - $${baseRpm + 45}`,
      rpmMin: baseRpm,
      rpmMax: baseRpm + 26,
      avgRpm: baseRpm + 11.5,
      opportunityScore: 92,
      competition: "Baja",
      facelessScore: 95,
      productionHours: 2.1,
      searchVsBrowse: "70% Search / 30% Browse",
      desc: "Las empresas B2B pierden billones en filtraciones de pagos y software mal configurado. Los anunciantes de ciberseguridad pagan los CPMS m\xE1s elevados del mercado.",
      subniches: [
        {
          title: "Vulnerabilidades en pasarelas Stripe & Plaid",
          cpmScore: "Muy Alto",
          angles: "Tutorial de prevenci\xF3n de contracargos",
          formats: "Screen recording y diagramas en penumbra",
          monetization: "AdSense + Afiliados de Firewalls y VPN corporativa",
          techStack: ["Screen Studio", "ElevenLabs", "CapCut"]
        },
        {
          title: "Suplantaci\xF3n de identidad ejecutiva (Deepfake Fraud)",
          cpmScore: "Extremo",
          angles: "Caso de estudio documental paso a paso",
          formats: "Documental estilo Netflix con recortes de prensa",
          monetization: "Patrocinios directos de aseguradoras cibern\xE9ticas",
          techStack: ["Midjourney v6.1", "Storyblocks", "Descript"]
        }
      ],
      hooks: [
        "Un solo empleado abri\xF3 este email y la empresa perdi\xF3 $4.2 millones en 11 minutos.",
        "Si tu negocio procesa m\xE1s de $10,000 al mes en Stripe, esta configuraci\xF3n te est\xE1 cobrando 3.5% de m\xE1s.",
        "La estafa silenciosa de facturaci\xF3n que est\xE1 quebrando a agencias de marketing en 2026."
      ],
      sopSteps: [
        "Monitorear alertas del FBI IC3 y foros de ciberseguridad",
        "Elaborar gui\xF3n t\xE9cnico con foco en prevenci\xF3n de p\xE9rdidas",
        "Voz sint\xE9tica autoritativa y pausada",
        "Capturas de terminales y logs con efecto blur",
        "Dise\xF1o de sonido con sub-bass grave y pulsos de reloj",
        "Publicaci\xF3n con miniatura negra con acentos en amarillo ne\xF3n"
      ],
      isCustom: true
    },
    {
      id: `ai_trend_${timestamp}_2`,
      name: "Arbitraje de Litigios por Privacidad de Datos y Propiedad Intelectual",
      category: "Legal",
      badge: "Legal Tech & Claims",
      icon: "file-warning",
      cpm: `$${baseRpm + 25} - $${baseRpm + 65}`,
      rpmMin: baseRpm + 6,
      rpmMax: baseRpm + 38,
      avgRpm: baseRpm + 19,
      opportunityScore: 94,
      competition: "Baja",
      facelessScore: 96,
      productionHours: 2.3,
      searchVsBrowse: "75% Search / 25% Browse",
      desc: "Demandas colectivas millonarias por rastreo no autorizado con p\xEDxeles y cookies. Los bufetes jur\xEDdicos compran tr\xE1fico directo a precios r\xE9cord.",
      subniches: [
        {
          title: "Juicios contra gigantes de salud por fugas de telemedicina",
          cpmScore: "Extremo",
          angles: "Explicaci\xF3n del proceso de compensaci\xF3n",
          formats: "Documental sobrio con documentos judiciales oficiales",
          monetization: "Generaci\xF3n de leads para bufetes (CPA de hasta $500 por reclamante v\xE1lido)",
          techStack: ["ElevenLabs", "CapCut", "Audacity"]
        },
        {
          title: "Demandas a apps de citas por venta de metadatos de geolocalizaci\xF3n",
          cpmScore: "Muy Alto",
          angles: "Cr\xF3nica judicial y derechos del usuario",
          formats: "Narrativa con l\xEDnea de tiempo interactiva",
          monetization: "AdSense High-RPM + Afiliados de protecci\xF3n de identidad",
          techStack: ["Midjourney v6.1", "CapCut", "Photoshop"]
        }
      ],
      hooks: [
        "Si usaste esta conocida aplicaci\xF3n de citas entre 2022 y 2025, te corresponden hasta $1,800 por ley.",
        "El error de 3 l\xEDneas de c\xF3digo que oblig\xF3 a este hospital a pagar $250 millones de indemnizaci\xF3n.",
        "La demanda silenciosa que est\xE1 cambiando los t\xE9rminos de servicio de todas las empresas de IA."
      ],
      sopSteps: [
        "Revisar registros judiciales en CourtListener y PACER",
        "Estructurar gancho con la cifra exacta de compensaci\xF3n",
        "Voz neutra y formal sin exageraciones amarillistas",
        "Insertar recortes de sentencias con resaltado amarillo",
        "B-Roll de tribunales y servidores corporativos",
        "Llamada a la acci\xF3n con enlaces en la descripci\xF3n"
      ],
      isCustom: true
    },
    {
      id: `ai_trend_${timestamp}_3`,
      name: "Flujos de Trabajo Aut\xF3nomos con Modelos Locales (AI Agents On-Premise)",
      category: "Tecnolog\xEDa",
      badge: "Local AI & Enterprise",
      icon: "bot",
      cpm: `$${baseRpm + 10} - $${baseRpm + 35}`,
      rpmMin: baseRpm,
      rpmMax: baseRpm + 22,
      avgRpm: baseRpm + 8.5,
      opportunityScore: 89,
      competition: "Media",
      facelessScore: 94,
      productionHours: 2,
      searchVsBrowse: "60% Search / 40% Browse",
      desc: "Las empresas quieren IA sin enviar datos a la nube p\xFAblica. El auge de servidores privados con modelos de c\xF3digo abierto genera altos presupuestos de patrocinio.",
      subniches: [
        {
          title: "Montaje de servidores privados para agencias legales",
          cpmScore: "Alto",
          angles: "Paso a paso sin c\xF3digo y ahorro en APIs",
          formats: "Screen share con zoom suave y llamadas en pantalla",
          monetization: "Afiliados de hardware / VPS GPU + Consultor\xEDas B2B",
          techStack: ["Screen Studio", "Ollama", "n8n"]
        },
        {
          title: "Agentes de extracci\xF3n autom\xE1tica de facturas y contratos PDF",
          cpmScore: "Muy Alto",
          angles: "Automatizaci\xF3n de contabilidad interna",
          formats: "Demostraci\xF3n de flujo en tiempo real",
          monetization: "Venta de plantillas y workflows preconstruidos ($97 USD)",
          techStack: ["ElevenLabs", "CapCut", "GitHub"]
        }
      ],
      hooks: [
        "Dejamos de pagar $1,200 al mes a OpenAI instalando este modelo gratuito en nuestra propia m\xE1quina.",
        "El 90% de las empresas gasta fortunas en tokens sin saber que pueden ejecutar esto gratis de por vida.",
        "C\xF3mo configur\xE9 un agente que lee 400 contratos al d\xEDa por exactamente $0 en costos de API."
      ],
      sopSteps: [
        "Validar el flujo en local con Ollama y n8n",
        "Grabar pantalla en 4K con Screen Studio a 60fps",
        "Voz t\xE9cnica y en\xE9rgica en ElevenLabs",
        "A\xF1adir efectos de tipeo y zooms en las l\xEDneas clave",
        "Empaquetar el archivo JSON del workflow para descarga",
        "Miniatura con comparativa de precio: $1,200/mes vs $0"
      ],
      isCustom: true
    }
  ];
  if (category !== "all") {
    const filtered = library.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    if (filtered.length > 0) return filtered;
  }
  return library;
}
startServer();
