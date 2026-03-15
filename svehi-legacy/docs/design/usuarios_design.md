# Diseño Técnico: Módulo Usuarios

> Tabla: `T_D_USUA_USUARIO` — Secuencia: `SVEH_SC06_USUA`

## Tabla

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `USUA_CO_CODIGO` | id | Long | PK |
| `SEAD_CO_CODIGO` | servicioAdscritoId | Long | FK → ServicioAdscrito |
| `PERF_CO_CODIGO` | perfilId | Long | FK → Perfil |
| `USUA_LI_DNI` | dni | String(10) | DNI del usuario |
| `USUA_LI_NOMBRE` | nombre | String(50) | |
| `USUA_LI_APELLIDO1` | apellido1 | String(100) | |
| `USUA_LI_APELLIDO2` | apellido2 | String(100) | |
| `USUA_IN_ACTIVO` | activo | Boolean | |
| `USUA_IN_FILTRASERV` | filtraServicio | Boolean | Si filtra por servicio adscrito |
| `USUA_FH_ULT_ACC` | ultimoAcceso | LocalDate | |
| `USUA_FH_ACT_ACC` | accesoActual | LocalDate | |
| `USUA_IN_CHECKFIN` | checkFin | Boolean | |
| + auditoría + sin `IN_ELIMINADO` | | | **Nota: esta tabla NO tiene IN_ELIMINADO** |

## OpenAPI
- `GET /v1/usuarios` — Filtros: nombre, dni, perfilId, activo. Paginado.
- `GET /v1/usuarios/{id}`
- `POST /v1/usuarios` → 201 / 409 (DNI duplicado)
- `PUT /v1/usuarios/{id}` → 200 / 404
- `DELETE /v1/usuarios/{id}` → 204 (hard delete o desactivar)

## Schemas
```yaml
UsuarioVO:
  properties:
    id: { type: integer, format: int64 }
    dni: { type: string }
    nombre: { type: string }
    apellido1: { type: string }
    apellido2: { type: string }
    activo: { type: boolean }
    perfil: { $ref: '#/components/schemas/PerfilVO' }
    servicioAdscrito: { type: string }
    filtraServicio: { type: boolean }
    ultimoAcceso: { type: string, format: date }
UsuarioSaveVO:
  required: [dni, nombre, apellido1, perfilId]
  properties:
    dni: { type: string, maxLength: 10 }
    nombre: { type: string, maxLength: 50 }
    apellido1: { type: string, maxLength: 100 }
    apellido2: { type: string, maxLength: 100 }
    perfilId: { type: integer, format: int64 }
    servicioAdscritoId: { type: integer, format: int64 }
    activo: { type: boolean }
    filtraServicio: { type: boolean }
```

## Reglas: DNI único. Perfil referenciado debe existir. Gestión de accesos.
## Frontend: Ruta `/gestion/usuarios`. Tabla con: DNI, Nombre Completo, Perfil, Activo. Formulario con selects para Perfil y Servicio.
