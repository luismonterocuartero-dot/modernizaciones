# Diseño Técnico: Módulo Centros Directivos y Servicios Adscritos

> Tablas: `T_M_CEDI_CENTRODIRECTIVO` (SC01), `T_M_SEAD_SERVICIOADSCR` (SC02)

## Tabla `T_M_CEDI_CENTRODIRECTIVO`

| Columna BD | Java Field | Tipo |
|:---|:---|:---|
| `CEDI_CO_CODIGO` | id | Long (PK, Sec `SVEH_SC01_CEDI`) |
| `CEDI_LI_NOMBRE` | nombre | String(200) |
| `CEDI_IN_ACTIVO` | activo | Boolean |
| + auditoría + `IN_ELIMINADO` | BaseEntity | |

## Tabla `T_M_SEAD_SERVICIOADSCR`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `SEAD_CO_CODIGO` | id | Long | PK, Sec `SVEH_SC02_SEAD` |
| `CEDI_CO_CODIGO` | centroDirectivoId | Long | FK → CentroDirectivo |
| `PROV_CO_CODIGO` | provinciaId | Long | Código de provincia |
| `SEAD_LI_NOMBRE` | nombre | String(200) | |
| `SEAD_IN_ACTIVO` | activo | Boolean | |
| `SEAD_LI_CODIGO` | codigo | String(6) | Código corto del servicio |
| + auditoría + `IN_ELIMINADO` | BaseEntity | | |

## OpenAPI

```yaml
# Centros Directivos
/v1/centros-directivos:
  get: { operationId: getCentrosDirectivos, tags: [CentrosDirectivos] }
  post: { operationId: createCentroDirectivo, tags: [CentrosDirectivos] }
/v1/centros-directivos/{id}:
  get: { operationId: getCentroDirectivoById, tags: [CentrosDirectivos] }
  put: { operationId: updateCentroDirectivo, tags: [CentrosDirectivos] }
  delete: { operationId: deleteCentroDirectivo, tags: [CentrosDirectivos] }
/v1/centros-directivos/{id}/servicios:
  get:
    operationId: getServiciosByCentro
    tags: [CentrosDirectivos]
    description: Lista servicios del centro directivo

# Servicios Adscritos
/v1/servicios-adscritos:
  get:
    operationId: getServiciosAdscritos
    tags: [ServiciosAdscritos]
    parameters:
      - name: centroDirectivoId
        in: query
        schema: { type: integer, format: int64 }
      - name: nombre
        in: query
        schema: { type: string }
  post: { operationId: createServicioAdscrito, tags: [ServiciosAdscritos] }
/v1/servicios-adscritos/{id}:
  get: { operationId: getServicioAdscritoById, tags: [ServiciosAdscritos] }
  put: { operationId: updateServicioAdscrito, tags: [ServiciosAdscritos] }
  delete: { operationId: deleteServicioAdscrito, tags: [ServiciosAdscritos] }
```

## Schemas
```yaml
CentroDirectivoVO:
  properties:
    id: { type: integer, format: int64 }
    nombre: { type: string }
    activo: { type: boolean }

ServicioAdscritoVO:
  properties:
    id: { type: integer, format: int64 }
    codigo: { type: string }
    nombre: { type: string }
    activo: { type: boolean }
    centroDirectivo: { $ref: '#/components/schemas/CentroDirectivoVO' }
    provinciaId: { type: integer, format: int64 }

ServicioAdscritoSaveVO:
  required: [nombre, centroDirectivoId]
  properties:
    codigo: { type: string, maxLength: 6 }
    nombre: { type: string, maxLength: 200 }
    centroDirectivoId: { type: integer, format: int64 }
    provinciaId: { type: integer, format: int64 }
    activo: { type: boolean }
```

## Reglas
1. No eliminar un Centro Directivo si tiene Servicios Adscritos activos (409).
2. No eliminar un Servicio Adscrito si tiene vehículos o usuarios asociados (409).
3. Soft delete en ambas tablas.

## Frontend
- Ruta `/gestion/centros-directivos` — Lista + Formulario.
- Ruta `/gestion/servicios-adscritos` — Lista con filtro por Centro + Formulario.
- Servicio adscrito se usa como "jefatura" en vehículos y usuarios → selector reutilizable.
