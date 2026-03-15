---
title: "Plan de Modernización SVEHI"
subtitle: "Estrategia de Transformación a Arquitectura ADA"
author: "Arquitectura y Desarrollo - Modernización"
date: "marzo de 2026"
format:
  docx:
    toc: true
    number-sections: true
    highlight-style: tango
---

# Introducción

Este documento detalla el plan integral para la modernización del sistema SVEHI (Sistema de Vehículos de la Junta de Andalucía). El objetivo es la transición desde un monolito legacy hacia una arquitectura moderna de microservicios alineada con el estándar **ADA**, permitiendo una mayor mantenibilidad, escalabilidad y alineación con los estándares corporativos.

# Resumen de Esfuerzos y Eficiencia IA

La modernización se apoya en palancas de eficiencia mediante IA, permitiendo una reducción significativa en los tiempos de desarrollo de componentes base (scaffolding, mappers, CRUDs).

![Resumen de Esfuerzos y Cronograma](file:///home/luis/.gemini/antigravity/brain/3b43b629-e410-4eab-9bc8-d17951c3411b/gantt_chart_and_efforts_summary_1772808429619.png)

## Estimación Detallada (Jornadas)

A continuación se detalla el esfuerzo base vs. el esfuerzo ajustado por eficiencia IA para cada fase:

| Fase | Peso | Base Back | Base Front | **Ajustado Back (IA)** | **Ajustado Front (IA)** |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Fase 0: Setup** | 🟡 Media | 14 | 6 | **10.1** | **4.05** |
| **Fase 1: Gestión** | 🟢 Baja | 20 | 20 | **10.8** | **10.8** |
| **Fase 2: Vehículos** | 🔴 Alta | 38 | 32 | **23.0** | **19.5** |
| **Fase 3: Talleres** | 🔴 Alta | 28 | 18 | **17.85** | **10.7** |
| **Fase 4: Calidad** | 🟡 Media | 9 | 9 | **6.15** | **6.40** |
| **TOTALES** | | **109** | **85** | **67.9** | **51.45** |

### Esfuerzo Consolidado

*   **Esfuerzo Total**: ~120 jornadas (frente a 194 base).
*   **Con Contingencia (+15%)**: **~138 jornadas**.
*   **Ahorro Operativo**: **~37%** de reducción de tiempos en fases críticas.

# Análisis del Sistema Legacy

## Estado Actual

El sistema actual es un monolito Java basado en Spring MVC y Hibernate, cuya autenticación reside en firmas @Firma que serán sustituidas por el estándar corporativo **SSOweb**.

| Aspecto | Detalle |
|:---|:---|
| **Base de Datos** | Oracle 19c — Esquema **BDD01** (Presidencia) |
| **Frontend** | JSP + Bootstrap 3 |
| **Persistencia** | Los documentos se almacenan como Blobs en la base de datos Oracle. |

# Arquitectura Objetivo (ADA)

La arquitectura se moderniza hacia una SPA con Angular 20 y microservicios Java 21 optimizados.

| Componente | Función | Tecnología |
|:---|:---|:---|
| **Frontend** | UI Moderna | Angular 20 + NGRX + @matter |
| **ms-svehi-gestion** | Gestión Base | Spring Boot 3 + Java 21 |
| **ms-svehi-talleres**| Operativa | Spring Boot 3 + Java 21 |
| **Seguridad** | Identidad | SSOweb JdA |

# Cronograma y Hitos

| Hito | Descripción | Fecha |
|:---|:---|:---|
| **M0** | Inicio de Desarrollo | 05 Ene 2026 |
| **M1** | Gestión y Catálogos OK | 27 Feb 2026 |
| **M2** | Módulo Vehículos OK | 10 Abr 2026 |
| **M3** | Módulo Talleres OK | 08 May 2026 |
| **M4** | **Puesta en Producción** | **12 Jun 2026** |

---
*Este documento es propiedad confidencial y está destinado exclusivamente a la planificación del proyecto SVEHI. Generado mediante asistencia IA Antigravity.*
