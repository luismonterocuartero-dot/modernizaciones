# Diseño Técnico: Módulo Compañías

> Tabla: `T_D_COMP_COMPANIA` — Secuencia: `SVEH_SC18_COMP`

## Tabla

| Columna BD | Java Field | Tipo |
|:---|:---|:---|
| `COMP_CO_CODIGO` | id | Long (PK) |
| `COMP_LI_NOMBRE` | nombre | String(250) |
| `COMP_LI_DIRECCION` | direccion | String(500) |
| `COMP_LI_TELEFONO` | telefono | String(50) |
| `COMP_LI_CONTACTO` | contacto | String(250) |
| `COMP_IN_ACTIVO` | activo | Boolean (SMALLINT 0/1) |
| + auditoría + `IN_ELIMINADO` | BaseEntity | |

## OpenAPI
- `GET /v1/companias` — Filtros: nombre, activo. Paginado.
- `GET /v1/companias/{id}`
- `POST /v1/companias` → 201 / 409
- `PUT /v1/companias/{id}` → 200 / 404 / 409
- `DELETE /v1/companias/{id}` → 204 / 409 (con pólizas)

## Schemas
```yaml
CompaniaVO:
  properties:
    id: { type: integer, format: int64 }
    nombre: { type: string }
    direccion: { type: string }
    telefono: { type: string }
    contacto: { type: string }
    activo: { type: boolean }
CompaniaSaveVO:
  required: [nombre]
  properties:
    nombre: { type: string, maxLength: 250 }
    direccion: { type: string, maxLength: 500 }
    telefono: { type: string, maxLength: 50 }
    contacto: { type: string, maxLength: 250 }
    activo: { type: boolean }
```

## Reglas: Nombre único. Soft delete. No eliminar con pólizas asociadas.
## Frontend: Ruta `/gestion/companias`. Listado + Formulario.
