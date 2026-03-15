# Diseño Técnico: Módulo Conceptos

> Tabla: `T_D_CONC_CONCEPTO` — Secuencia: `SVEH_SC30_CONC`

## Tabla

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `CONC_CO_CODIGO` | id | Long | PK |
| `CONC_LI_NOMBRE` | nombre | String(150) | |
| `CONC_NU_PRECIOUNI` | precioUnitario | BigDecimal(8,2) | Precio unitario |
| `CONC_NU_KILOMETROS` | kilometros | BigDecimal(8,2) | Km para próxima revisión |
| `CONC_NU_DIAS` | dias | Integer | Días para próxima revisión |
| + auditoría + `IN_ELIMINADO` | BaseEntity | | |

## OpenAPI
- `GET /v1/conceptos` — Filtros: nombre. Paginado.
- CRUD estándar en `/v1/conceptos/{id}`

## Schemas
```yaml
ConceptoVO:
  properties:
    id: { type: integer, format: int64 }
    nombre: { type: string }
    precioUnitario: { type: number, format: double }
    kilometros: { type: number, format: double }
    dias: { type: integer }
ConceptoSaveVO:
  required: [nombre]
  properties:
    nombre: { type: string, maxLength: 150 }
    precioUnitario: { type: number, format: double }
    kilometros: { type: number, format: double }
    dias: { type: integer }
```

## Reglas: Nombre único. Soft delete. No eliminar si tiene MantenimientoConcepto asociados.
## Frontend: Ruta `/gestion/conceptos`. Tabla con columnas: nombre, precio, km, días. Formulario con inputs numéricos.
