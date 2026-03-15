# Diseño Técnico: Módulo Tipos y Parámetros

> Tablas: `T_M_TIPA_TIPOPARAMETRO` (SC03) + `T_D_PARA_PARAMETRO` (SC04)

## Tabla `T_M_TIPA_TIPOPARAMETRO`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `TIPA_CO_CODIGO` | id | Long | PK, Sec `SVEH_SC03_TIPA` |
| `TIPA_LI_CODIGO` | codigo | String(3) | Código corto único |
| `TIPA_LI_NOMBRE` | nombre | String(150) | |
| `TIPA_IN_ACTIVO` | activo | Boolean | |
| `TIPA_IN_MODIF` | modificable | Boolean | Default 1. Si 0 → solo modificable por BBDD |
| + auditoría (sin IN_ELIMINADO en esta tabla) | | | |

## Tabla `T_D_PARA_PARAMETRO`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `PARA_CO_CODIGO` | id | Long | PK, Sec `SVEH_SC04_PARA` |
| `TIPA_CO_CODIGO` | tipoParametroId | Long | FK → TipoParametro |
| `CEDI_CO_CODIGO` | centroDirectivoId | Long | FK → CentroDirectivo (nullable) |
| `PARA_LI_NOMBRE` | nombre | String(150) | |
| `PARA_IN_DATOSEXTRA` | tieneDatosExtra | Boolean | Indica si requiere campo extra |
| `PARA_LI_LITERALEXTRA` | literalExtra | String(150) | Label del campo extra |
| `PARA_IN_ACTIVO` | activo | Boolean | |
| + auditoría + `IN_ELIMINADO` | BaseEntity | | |

## OpenAPI

```yaml
paths:
  /v1/tipos:
    get:
      operationId: getTipos
      tags: [Tipos]
      description: Solo lectura (no CRUD completo)
      responses:
        '200': { description: Listado de tipos de parámetro }
  /v1/tipos/{id}:
    get: { operationId: getTipoById, tags: [Tipos] }

  /v1/parametros:
    get:
      operationId: getParametros
      tags: [Parametros]
      parameters:
        - name: tipoId
          in: query
          required: false
          schema: { type: integer, format: int64 }
        - name: nombre
          in: query
          schema: { type: string }
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/SizeParam'
    post:
      operationId: createParametro
      tags: [Parametros]
  /v1/parametros/{id}:
    get: { operationId: getParametroById, tags: [Parametros] }
    put: { operationId: updateParametro, tags: [Parametros] }
    delete: { operationId: deleteParametro, tags: [Parametros] }
```

## Schemas
```yaml
TipoParametroVO:
  properties:
    id: { type: integer, format: int64 }
    codigo: { type: string }
    nombre: { type: string }
    activo: { type: boolean }
    modificable: { type: boolean }

ParametroVO:
  properties:
    id: { type: integer, format: int64 }
    nombre: { type: string }
    tipo: { $ref: '#/components/schemas/TipoParametroVO' }
    tieneDatosExtra: { type: boolean }
    literalExtra: { type: string }
    activo: { type: boolean }
ParametroSaveVO:
  required: [nombre, tipoId]
  properties:
    nombre: { type: string, maxLength: 150 }
    tipoId: { type: integer, format: int64 }
    centroDirectivoId: { type: integer, format: int64 }
    tieneDatosExtra: { type: boolean }
    literalExtra: { type: string, maxLength: 150 }
    activo: { type: boolean }
```

## Reglas
1. Tipos: **SOLO LECTURA** (GET). No se crean ni eliminan desde la API.
2. Parámetros: CRUD completo con filtro por tipo.
3. Si el tipo no es `modificable` (TIPA_IN_MODIF=0), no permitir crear parámetros para ese tipo desde la API.
4. Soft delete en Parámetros.

## Frontend
- Ruta `/gestion/parametros`.
- Filtro: Dropdown de Tipo + búsqueda por nombre.
- Si `tieneDatosExtra`, mostrar campo extra con el label de `literalExtra`.
