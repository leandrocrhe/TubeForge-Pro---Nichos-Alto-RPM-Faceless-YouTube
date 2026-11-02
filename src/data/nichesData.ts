import { Niche } from '../types/niche';

export const HIGH_YIELD_NICHES: Niche[] = [
  {
    id: 'legal_claims',
    name: 'Demandas Masivas, Litigios & Legal Tech',
    category: 'Legal',
    badge: 'RPM Récord',
    icon: 'Scale',
    cpm: '$35 - $80+',
    rpmMin: 22,
    rpmMax: 50,
    avgRpm: 32.0,
    opportunityScore: 94,
    competition: 'Baja',
    facelessScore: 92,
    productionHours: 2.5,
    searchVsBrowse: '70% Búsqueda / 30% Sugeridos',
    desc: 'Reclamaciones por negligencia, fraudes bancarios, propiedad intelectual para creadores y derechos del consumidor de alto valor publicitario.',
    subniches: [
      {
        title: 'Demandas Colectivas contra Big Tech & Privacidad',
        cpmScore: 'Muy Alto',
        angles: 'Cómo reclamar compensaciones monetarias por filtraciones de datos masivas o cobros indebidos de plataformas.',
        formats: 'Documental Faceless con recortes de prensa oficial, documentos judiciales subrayados en amarillo y voz firme autoritativa.',
        monetization: 'Patrocinios de bufetes de abogados (costo por lead calificado $150+ USD), AdSense récord.',
        techStack: ['ElevenLabs (Adam / Marcus)', 'CapCut Pro', 'CourtListener (Docs Públicos)']
      },
      {
        title: 'Derechos de Creadores: Copyright, Fair Use & Contratos',
        cpmScore: 'Alto',
        angles: 'Casos donde creadores o startups demandaron a multinacionales por plagio o apropiación de marca y ganaron millones.',
        formats: 'Análisis explicativo con timeline dinámico, citas textuales de sentencias y zoom en cláusulas críticas.',
        monetization: 'Afiliados de protección de marca, software de firma de contratos y servicios de asesoría.',
        techStack: ['Midjourney v6', 'CapCut Desktop', 'Epidemic Sound']
      }
    ],
    hooks: [
      'Si usaste este servicio entre 2021 y 2025, te deben hasta $1,200 dólares y sólo tienes 30 días para reclamarlo.',
      'El documento judicial confidencial que obligó a este gigante tecnológico a pagar 400 millones en compensaciones.',
      '3 cláusulas que firmas a diario en tus apps habituales y que te quitan el derecho a demandar sin que lo sepas.'
    ],
    sopSteps: [
      'Investigación: Busca sentencias recientes en bases legales abiertas (Justia, Casemine) o resoluciones de consumo de agencias gubernamentales (FTC, OCU).',
      'Guión de Retención: Min 0-15s (El dinero exacto en juego) / Min 15s-2m (La infracción corporativa) / Min 2m-6m (Cronología probatoria) / Min 6m-8m (Pasos para verificar tu compensación).',
      'Recursos Visuales: Capturas de titulares de noticias con efecto zoom-in suave + texturas oscuras y sonido de máquina de escribir o sellos legales.',
      'Monetización: Agrega siempre un enlace de verificación de reclamo o asesoría legal en el primer comentario fijado.'
    ]
  },
  {
    id: 'ai_b2b_agents',
    name: 'Automatización con Agentes IA & SaaS B2B',
    category: 'Tecnología',
    badge: 'Tendencia Global',
    icon: 'Bot',
    cpm: '$25 - $60',
    rpmMin: 14,
    rpmMax: 35,
    avgRpm: 22.5,
    opportunityScore: 97,
    competition: 'Media',
    facelessScore: 95,
    productionHours: 2.0,
    searchVsBrowse: '55% Búsqueda / 45% Sugeridos',
    desc: 'Flujos de automatización con Make, n8n, LangChain, agentes autónomos y stack tecnológico para optimizar operaciones de pequeñas y medianas empresas.',
    subniches: [
      {
        title: 'Agentes IA de Atención & Ventas Autónomas (No-Code)',
        cpmScore: 'Muy Alto',
        angles: 'Cómo reemplazar 40 horas de trabajo repetitivo en negocios de servicios con un único agente configurado en n8n.',
        formats: 'Grabación de pantalla estilizada (Screen Studio) combinada con diagramas de flujo interactivos en Excalidraw.',
        monetization: 'Consultoría B2B ($1,500/implementación), afiliados de plataformas SaaS en suscripción recurrente ($30-$80/mes).',
        techStack: ['n8n / Make', 'Screen Studio', 'Claude 3.7 / OpenAI']
      },
      {
        title: 'SaaS Micro-Soluciones construidas con IA',
        cpmScore: 'Alto',
        angles: 'Crear software funcional y desplegarlo en 1 fin de semana usando prompts estructurados y editores modernos de código.',
        formats: 'Time-lapse de código acelerado + desglose de arquitectura de base de datos paso a paso.',
        monetization: 'Venta de plantillas de prompts, patrocinios de hostings cloud, bases de datos y APIs.',
        techStack: ['Cursor / v0.dev', 'Supabase', 'CapCut']
      }
    ],
    hooks: [
      'Este agente de IA contesta llamadas, agenda citas y cobra facturas mientras su dueño duerme.',
      'Dejé de pagar $800 al mes en software configurando este único flujo inteligente en n8n.',
      'Cómo programar un SaaS completo en 4 horas sin haber escrito una sola línea de código en tu vida.'
    ],
    sopSteps: [
      'Arquitectura: Diseña primero el flujo de automatización en n8n/Make y asegúrate de que ejecute sin errores de inicio a fin.',
      'Grabación: Graba la pantalla con Screen Studio para zoom automático elegante sin necesidad de mostrar cámara.',
      'Audio: Graba la explicación clara o usa voz clonada ultra-realista con ElevenLabs (modelo Flash).',
      'Lead Magnet: Ofrece el archivo JSON del flujo para descargar a cambio del email (construye newsletter B2B de alto valor).'
    ]
  },
  {
    id: 'finanzas_wealth',
    name: 'Tarjetas de Crédito de Lujo & Arbitraje de Capital',
    category: 'Finanzas',
    badge: 'Alto CPM',
    icon: 'CreditCard',
    cpm: '$22 - $55',
    rpmMin: 15,
    rpmMax: 38,
    avgRpm: 24.0,
    opportunityScore: 91,
    competition: 'Media',
    facelessScore: 88,
    productionHours: 2.0,
    searchVsBrowse: '60% Búsqueda / 40% Sugeridos',
    desc: 'Estrategias de puntos, vuelos en cabina ejecutiva gratuitos, líneas de crédito a tasa 0% APR y construcción de historial crediticio corporativo.',
    subniches: [
      {
        title: 'Crédito Corporativo & Financiamiento al 0% APR',
        cpmScore: 'Muy Alto',
        angles: 'Cómo obtener $50,000 en crédito a interés cero para apalancar inventario o publicidad en los primeros 12 meses.',
        formats: 'Voz en off profunda sobre gráficos vectoriales de tarjetas metálicas y hojas de cálculo limpias con balances reales.',
        monetization: 'Enlaces de afiliados bancarios ($100 a $300 por tarjeta aprobada).',
        techStack: ['Canva Pro', 'ElevenLabs', 'Google Sheets Financiero']
      },
      {
        title: 'Arbitraje de Puntos de Viaje & Categorías Black',
        cpmScore: 'Alto',
        angles: 'El método legal para viajar por el mundo en cabinas Business pagando solo tasas de impuestos aeroportuarios.',
        formats: 'Metraje B-Roll de alta calidad de aviones/hoteles 5 estrellas + capturas del portal de canje de millas.',
        monetization: 'Cursos de optimización de millas, membresía privada de alertas de vuelos.',
        techStack: ['Pexels / Envato', 'CapCut Desktop', 'Epidemic Sound']
      }
    ],
    hooks: [
      'El banco no quiere que conozcas esta regla de 30 días para multiplicar tu línea de crédito.',
      'Compré un boleto de $8,000 en primera clase por exactamente $112 dólares con este hack de puntos.',
      'Las 3 peores tarjetas que arruinan tu score crediticio aunque pagues religiosamente a tiempo.'
    ],
    sopSteps: [
      'Validación: Revisa las ofertas vigentes de bienvenida de tarjetas premium (Amex, Chase, Santander, BBVA).',
      'Guión: Empieza mostrando el resultado palpable (el viaje obtenido o el ahorro en dinero). Desglosa los requisitos exactos.',
      'Visual: Usa mockups 3D de tarjetas y resalta en pantalla la tasa APR y los puntos requeridos para cada canje.',
      'Afiliados: Inserta links de afiliados regulados en la descripción y comentario destacado fijado.'
    ]
  },
  {
    id: 'cybersecurity_cloud',
    name: 'Ciberseguridad, Privacidad & OSINT',
    category: 'Tecnología',
    badge: 'Tech Premium',
    icon: 'Shield',
    cpm: '$20 - $48',
    rpmMin: 12,
    rpmMax: 30,
    avgRpm: 19.5,
    opportunityScore: 92,
    competition: 'Baja',
    facelessScore: 96,
    productionHours: 2.2,
    searchVsBrowse: '65% Sugeridos / 35% Búsqueda',
    desc: 'Casos reales de hackeos corporativos, herramientas de investigación de fuentes abiertas (OSINT) y protección de identidad digital.',
    subniches: [
      {
        title: 'Análisis Forense de Ciberataques a Grandes Empresas',
        cpmScore: 'Alto',
        angles: 'La anatomía segundo a segundo de cómo hackers robaron bases de datos billonarias a través de un simple correo de phishing.',
        formats: 'Estética terminal oscura, diagramas de red con nodos animados y ritmo de suspenso cinematográfico.',
        monetization: 'Patrocinios de VPNs premium (pagan $40-$70 CPA por usuario), gestores de contraseñas y hardware keys.',
        techStack: ['Terminal Linux / Obsidian', 'CapCut Pro', 'Freesound FX']
      }
    ],
    hooks: [
      'Un solo click en este archivo PDF falso le costó 30 millones a esta compañía en 14 minutos.',
      'Todo lo que cualquier persona puede averiguar sobre ti con solo tu número de teléfono público.',
      'Por qué deberías apagar esta opción vulnerable de tu router ahora mismo.'
    ],
    sopSteps: [
      'Documentación: Selecciona un caso de reporte público de ciberseguridad (ej. CrowdStrike, Uber breach, SolarWinds).',
      'Storytelling: Estructura de thriller: la intrusión inicial, el movimiento lateral en los servidores, el rescate solicitado y la lección.',
      'Estética: Interfaz visual cyberpunk minimalista, mapas de servidores mundiales con líneas de conexión brillantes.',
      'CTA: Promociona una VPN de confianza con descuento exclusivo en la descripción.'
    ]
  },
  {
    id: 'real_estate_reits',
    name: 'Tokenización Inmobiliaria, REITs & House Hacking',
    category: 'Finanzas',
    badge: 'Inversión Real',
    icon: 'Building',
    cpm: '$18 - $42',
    rpmMin: 11,
    rpmMax: 26,
    avgRpm: 17.5,
    opportunityScore: 89,
    competition: 'Baja',
    facelessScore: 90,
    productionHours: 2.0,
    searchVsBrowse: '50% Búsqueda / 50% Sugeridos',
    desc: 'Inversión en bienes raíces fraccionados desde $100 dólares, análisis de flujo de caja por rentas y fondos de inversión inmobiliaria (FIBRAs/REITs).',
    subniches: [
      {
        title: 'REITs de Dividendos Mensuales: Ingresos Pasivos Reales',
        cpmScore: 'Alto',
        angles: 'Cómo cobrar rentas inmobiliarias de centros comerciales y almacenes sin ser propietario físico ni lidiar con inquilinos.',
        formats: 'Tablas comparativas de Dividend Yield, ratios P/FFO y proyección de interés compuesto a 5, 10 y 20 años.',
        monetization: 'Afiliados de brókers regulados (DEGIRO, Interactive Brokers, GBM+, Trade Republic).',
        techStack: ['Google Sheets', 'TradingView', 'CapCut']
      }
    ],
    hooks: [
      'Cobré $430 de renta este mes sin tener inquilinos ni arreglar una sola fuga de tuberías.',
      'Por qué comprar una casa para vivir es el peor error financiero para menores de 35 años.',
      '3 Fondos Inmobiliarios que pagan dividendos a tu cuenta cada 30 días religiosamente.'
    ],
    sopSteps: [
      'Data: Extrae los dividendos anualizados y las propiedades del REIT en portales financieros oficiales (SeekingAlpha, Yahoo Finance).',
      'Visual: Muestra cómo el dinero de la renta llega al balance del broker en tiempo real con transiciones nítidas.',
      'Legal: Añade siempre el descargo de responsabilidad financiero en texto visible en la parte inferior del video.',
      'Conversión: Comparte la plantilla de cálculo de rentabilidad neta en el link de la descripción.'
    ]
  },
  {
    id: 'longevity_biohacking',
    name: 'Ciencia de la Longevidad & Biohacking Clínico',
    category: 'Salud',
    badge: 'Audiencia Senior $',
    icon: 'Dna',
    cpm: '$16 - $36',
    rpmMin: 10,
    rpmMax: 22,
    avgRpm: 15.0,
    opportunityScore: 90,
    competition: 'Media',
    facelessScore: 94,
    productionHours: 1.8,
    searchVsBrowse: '75% Sugeridos / 25% Búsqueda',
    desc: 'Protocolos de autofagia celular, suplementación mitocondrial, optimización del sueño REM y biomarcadores de edad biológica.',
    subniches: [
      {
        title: 'Protocolos de Ayuno & Limpieza Celular Científica',
        cpmScore: 'Medio-Alto',
        angles: 'Lo que le ocurre a tus células hora por hora después de 16, 24 y 36 horas sin ingerir alimentos sólidos.',
        formats: 'Animaciones celulares 2D/3D con narración pedagógica y referencias a estudios indexados en Nature o PubMed.',
        monetization: 'Patrocinios de marcas de electrolitos, monitores continuos de glucosa (CGM), suplementos antiedad puros.',
        techStack: ['Leonardo.ai', 'ElevenLabs', 'Epidemic Sound']
      }
    ],
    hooks: [
      'Esto le ocurre a tu cerebro en la hora 18 de ayuno (los médicos rara vez lo explican así).',
      'Los 4 suplementos que toma el genetista más citado de Harvard antes de irse a dormir.',
      'Si tienes más de 40 años, deja de hacer cardio tradicional de esta manera.'
    ],
    sopSteps: [
      'Estudios: Cita al menos 2 papers de PubMed con número de DOI en pantalla para ganar credibilidad absoluta.',
      'Visuales: Usa IA generativa para representar órganos, arterias limpias y mitocondrias con estilo documental de National Geographic.',
      'Subtítulos: Texto dinámico grande de alto contraste, perfecto para público de más de 40 años en dispositivos móviles.',
      'Monetización: Ofrece la guía resumen en PDF con enlaces de afiliados de suplementos de grado farmacéutico.'
    ]
  },
  {
    id: 'ecommerce_supply',
    name: 'Logística High-Ticket, Supply Chain & E-Commerce B2B',
    category: 'Negocios',
    badge: 'Alta Conversión',
    icon: 'Truck',
    cpm: '$20 - $44',
    rpmMin: 13,
    rpmMax: 28,
    avgRpm: 18.0,
    opportunityScore: 88,
    competition: 'Baja',
    facelessScore: 91,
    productionHours: 2.1,
    searchVsBrowse: '60% Búsqueda / 40% Sugeridos',
    desc: 'Importaciones de maquinaria pesada, negociación directa con fábricas asiáticas, fulfillment 3PL y marcas directas al consumidor (D2C).',
    subniches: [
      {
        title: 'Importación de Maquinaria Pequeña y Venta de Servicios Locales',
        cpmScore: 'Alto',
        angles: 'Modelos de negocio importando 1 sola máquina que genera $4,000 mensuales en servicios locales de alta demanda.',
        formats: 'Desglose minucioso de costos en Excel: Flete marítimo, aranceles aduaneros, margen de ganancia neta por unidad.',
        monetization: 'Agencias de aduanas afiliadas, cursos de importación profesional, software de gestión de inventario.',
        techStack: ['Excel / Sheets', 'Loom / OBS', 'CapCut']
      }
    ],
    hooks: [
      'Importó esta máquina de $1,800 desde Ningbo y factura $6,000 al mes limpiando paneles solares.',
      'La trampa oculta del flete marítimo que hace quebrar al 70% de los importadores novatos en su primer embarque.',
      'Cómo encontrar el fabricante original en Alibaba sin caer en intermediarios falsos que duplican el precio.'
    ],
    sopSteps: [
      'Caso de Estudio: Elige un producto de alta utilidad pero baja saturación (ej. máquinas de empaque al vacío, cortadoras láser CNC).',
      'Números Reales: Muestra la cotización FOB vs CIF vs DDP detallada en pantalla.',
      'Evidencia: Usa capturas reales de portales de aduanas y tracking marítimo en vivo.',
      'Lead: Invita a descargar el checklist de inspección de proveedores en fábrica a cambio del email.'
    ]
  },
  {
    id: 'corporate_crime',
    name: 'Fraudes Corporativos & Crímenes Financieros (True Crime)',
    category: 'Estilo de Vida',
    badge: 'Viral + Alto RPM',
    icon: 'FileWarning',
    cpm: '$14 - $28',
    rpmMin: 8,
    rpmMax: 18,
    avgRpm: 12.5,
    opportunityScore: 95,
    competition: 'Media',
    facelessScore: 98,
    productionHours: 2.5,
    searchVsBrowse: '85% Sugeridos / 15% Búsqueda',
    desc: 'Grandes estafas de Wall Street, bancarrotas inesperadas, multimillonarios que perdieron todo y espionaje industrial corporativo.',
    subniches: [
      {
        title: 'El Colapso de Imperios Financieros & Esquemas Ponzi',
        cpmScore: 'Medio-Alto',
        angles: 'La psicología del engaño: cómo directores ejecutivos engañaron a los mayores bancos de inversión del planeta.',
        formats: 'Mini-documental cinemático con música orquestal inmersiva y fotos de archivo de época retocadas.',
        monetization: 'Volumen masivo de AdSense (millones de visualizaciones), patrocinios de audiolibros y apps de trading.',
        techStack: ['Midjourney', 'ElevenLabs (George / Marcus)', 'Premiere Pro']
      }
    ],
    hooks: [
      'Este hombre engañó a 14 bancos usando una empresa que no tenía ni una sola oficina real.',
      'El error de 1 dólar que destruyó un fondo de inversión de $9,000 millones en 48 horas.',
      'Tenía mansiones en 5 países y cenaba con presidentes... hasta que una auditora de 28 años revisó la página 4.'
    ],
    sopSteps: [
      'Guión Narrativo: Comienza en el punto de no retorno (la redada o la llamada de colapso). Luego viaja al origen.',
      'Imágenes IA: Genera retratos cinemáticos estilo vintage de los involucrados en salas de juntas oscuras y despachos solemnes.',
      'Diseño Sonoro: Pasos en pasillos, firmas con pluma, teléfonos antiguos sonando y subwoofers para momentos de alta tensión.',
      'Retención: Mantén los cortes de plano o reencuadres cada 3.5 segundos como máximo.'
    ]
  },
  {
    id: 'luxury_faceless',
    name: 'Lujo Silencioso, Megayates & Mansiones Secretas',
    category: 'Estilo de Vida',
    badge: 'Alta Retención',
    icon: 'Crown',
    cpm: '$15 - $32',
    rpmMin: 9,
    rpmMax: 20,
    avgRpm: 13.5,
    opportunityScore: 87,
    competition: 'Media',
    facelessScore: 99,
    productionHours: 1.8,
    searchVsBrowse: '80% Sugeridos / 20% Búsqueda',
    desc: 'El patrimonio y estilo de vida de las dinastías más discretas del planeta, arquitectura privada hiper-exclusiva y activos trofeo.',
    subniches: [
      {
        title: 'Bunkers y Residencias de Ultra-Ricos Ocultas en la Montaña',
        cpmScore: 'Medio-Alto',
        angles: 'Cómo gastan 50 millones en proteger islas privadas con sistemas de seguridad militar y abastecimiento autónomo.',
        formats: 'Renders arquitectónicos 3D, mapas satelitales con zoom dinámico y locución con tono sereno y elegante.',
        monetization: 'AdSense internacional con público de alto poder adquisitivo, marcas de lujo y membresías VIP.',
        techStack: ['Google Earth Studio', 'CapCut Pro', 'Artlist']
      }
    ],
    hooks: [
      'Bajo esta colina aparentemente vacía hay una mansión subterránea de 12 pisos con lago artificial.',
      'Por qué los verdaderos multimillonarios nunca compran ferraris ni usan ropa con logotipos visibles.',
      'El megayate que cuesta $45,000 dólares diarios solo en combustible cuando está fondeado.'
    ],
    sopSteps: [
      'Tomas de Impacto: Usa Google Earth Studio con animaciones 3D de coordenadas geográficas exactas descendiendo del espacio.',
      'Voz: Tono sereno, pausado y elegante; evita sonar estridente o apresurado.',
      'Datos de Costos: Muestra infografías con desgloses de mantenimiento diario/anual de cada activo.',
      'Estrategia de Miniatura: Foto real o render con encuadre misterioso y sin saturación excesiva de texto.'
    ]
  },
  {
    id: 'tech_careers_usd',
    name: 'Salarios en USD, Entrevistas Tech & Trabajo Remoto',
    category: 'Tecnología',
    badge: 'Alta Conversión Lead',
    icon: 'Terminal',
    cpm: '$18 - $38',
    rpmMin: 11,
    rpmMax: 24,
    avgRpm: 16.5,
    opportunityScore: 91,
    competition: 'Baja',
    facelessScore: 89,
    productionHours: 2.0,
    searchVsBrowse: '70% Búsqueda / 30% Sugeridos',
    desc: 'Estrategias para conseguir contratos de $4k-$10k USD/mes en empresas globales desde cualquier país, optimización de CV y preparación técnica.',
    subniches: [
      {
        title: 'Simulación de Entrevistas de Código y Negociación Salarial',
        cpmScore: 'Alto',
        angles: 'La frase exacta para pedir un 30% más de salario en tu contraoferta de trabajo remoto.',
        formats: 'Captura de pantalla analizando plantillas de Notion, perfiles reales de LinkedIn y correos de ofertas laborales desglosadas.',
        monetization: 'Bootcamps afiliados ($300-$800 comisión por matriculación), plantillas de CV Notion optimizadas para ATS.',
        techStack: ['Notion', 'OBS Studio / Screen Studio', 'CapCut']
      }
    ],
    hooks: [
      'El error en tu LinkedIn que hace que los reclutadores de EE.UU. cierren tu perfil en 3 segundos.',
      'Cómo pasó de ganar $700 locales a $5,500 remotos aprendiendo solo estas dos librerías modernas.',
      'Las 5 preguntas trampa en entrevistas en inglés y la fórmula STAR para responderlas con solvencia.'
    ],
    sopSteps: [
      'Plantilla: Diseña un recurso accionable descargable (ej. modelo de CV en Notion optimizado para sistemas ATS).',
      'Estructura: Diagnóstico del error habitual -> Solución con ejemplo antes/después -> Script exacto a copiar.',
      'CTA: Entrega la plantilla gratis mediante newsletter para monetizar después con cursos o mentorías avanzadas.',
      'Consistencia: Sube 2 videos largos por semana enfocados en palabras clave con intención de búsqueda transaccional.'
    ]
  }
];
