# Diseño Técnico: Módulo Operadoras

> Tabla: `T_D_OPER_OPERADORA` — Secuencia: `SVEH_SC35_OPER`

## Tabla

| Columna BD | Java Field | Tipo |
|:---|:---|:---|
| `OPER_CO_CODIGO` | id | Long (PK) |
| `OPER_LI_NOMBRE` | nombre | String(150) |
| `OPER_LI_DIRECCION` | direccion | String(500) |
| `OPER_LI_TELEFONO` | telefono | String(50) |
| `OPER_LI_CONTACTO` | contacto | String(250) |
| `OPER_IN_ACTIVO` | activo | Boolean (SMALLINT 0/1) |
| + auditoría + `IN_ELIMINADO` | BaseEntity | |

## OpenAPI
- `GET /v1/operadoras` — Filtros: nombre (like), activo. Paginado.
- `GET /v1/operadoras/{id}`
- `POST /v1/operadoras` → 201 / 409 (nombre duplicado)
- `PUT /v1/operadoras/{id}` → 200 / 404 / 409
- `DELETE /v1/operadoras/{id}` → 204 / 409 (con vehículos o tarjetas)

## Schemas
```yaml
OperadoraVO:
  properties:
    id: { type: integer, format: int64 }
    nombre: { type: string }
    direccion: { type: string }
    telefono: { type: string }
    contacto: { type: string }
    activo: { type: boolean }
OperadoraSaveVO:
  required: [nombre]
  properties:
    nombre: { type: string, maxLength: 150 }
    direccion: { type: string, maxLength: 500 }
    telefono: { type: string, maxLength: 50 }
    contacto: { type: string, maxLength: 250 }
    activo: { type: boolean }
```

## Reglas: Nombre único. Soft delete. No eliminar con vehículos asociados.
## Frontend: Ruta `/gestion/operadoras`. Listado + Formulario (nombre, dirección, teléfono, contacto, activo).
