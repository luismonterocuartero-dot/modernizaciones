# Diseño Técnico: Módulo Modelos

> Basado en tabla real `T_D_MODE_MODELO` — Secuencia `SVEH_SC08_MODE`

## A) Resumen
- **MS**: ms-svehi-gestion | **Dependencia**: Marca, Parámetro (tipo vehículo, tipo alimentación)
- La tabla tiene más campos de lo esperado: cilindrada, potencia, extras de tipo vehículo y alimentación.

## B) Tabla `T_D_MODE_MODELO`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `MODE_CO_CODIGO` | id | Long | PK |
| `MARC_CO_CODIGO` | marcaId | Long | FK → T_D_MARC_MARCA |
| `MODE_LI_NOMBRE` | nombre | String(150) | |
| `PARA_CO_CODIGO_TIVEHI` | tipoVehiculoId | Long | FK → Parámetro (tipo vehículo) |
| `MODE_LI_EXTRATIVEHI` | extraTipoVehiculo | String(500) | Dato extra asociado |
| `PARA_CO_CODIGO_TIREPO` | tipoAlimentacionId | Long | FK → Parámetro (alimentación) |
| `MODE_LI_EXTRAREPO` | extraAlimentacion | String(500) | |
| `MODE_LI_CILINDRADA` | cilindrada | String(50) | |
| `MODE_LI_POTENCIA` | potencia | String(50) | |
| + auditoría + `IN_ELIMINADO` | (hereda BaseEntity) | | |

## C) OpenAPI

```yaml
paths:
  /v1/modelos:
    get:
      operationId: getModelos
      tags: [Modelos]
      parameters:
        - name: marcaId
          in: query
          schema: { type: integer, format: int64 }
        - name: nombre
          in: query
          schema: { type: string }
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/SizeParam'
      responses:
        '200': { description: Listado paginado }
    post:
      operationId: createModelo
      tags: [Modelos]
      responses:
        '201': { description: Creado }
        '409': { description: Duplicado en misma marca }
  /v1/modelos/{id}:
    get: { operationId: getModeloById, tags: [Modelos] }
    put: { operationId: updateModelo, tags: [Modelos] }
    delete:
      operationId: deleteModelo
      tags: [Modelos]
      responses:
        '204': { description: Eliminado }
        '409': { description: Con vehículos asociados }

schemas:
  ModeloVO:
    properties:
      id: { type: integer, format: int64 }
      nombre: { type: string }
      marca: { $ref: '#/components/schemas/MarcaVO' }
      tipoVehiculo: { type: string }
      tipoAlimentacion: { type: string }
      cilindrada: { type: string }
      potencia: { type: string }
  ModeloSaveVO:
    required: [nombre, marcaId]
    properties:
      nombre: { type: string, maxLength: 150 }
      marcaId: { type: integer, format: int64 }
      tipoVehiculoId: { type: integer, format: int64 }
      extraTipoVehiculo: { type: string, maxLength: 500 }
      tipoAlimentacionId: { type: integer, format: int64 }
      extraAlimentacion: { type: string, maxLength: 500 }
      cilindrada: { type: string, maxLength: 50 }
      potencia: { type: string, maxLength: 50 }
```

## D) Reglas de negocio
1. Nombre único dentro de la misma marca.
2. La marca referenciada debe existir y no estar eliminada.
3. No eliminar si tiene vehículos asociados (409).
4. Soft delete.

## E) Frontend
- **Ruta**: `/gestion/modelos`
- **Filtro**: Dropdown de Marca + búsqueda por nombre.
- **Formulario**: nombre, marca (select), tipoVehículo (select de parámetros), alimentación (select), cilindrada, potencia.
