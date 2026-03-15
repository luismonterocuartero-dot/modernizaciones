# Diseño Técnico: Módulo Perfiles y Permisos

> Tablas: `T_D_PERF_PERFIL` (SC05), `T_D_PEAP_PERMISOS_APLICACION` (SC32), `T_M_PEUS_PERMISOSAPLI_USUARIO` (SC33)

## Tabla `T_D_PERF_PERFIL`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `PERF_CO_CODIGO` | id | Long | PK, Sec `SVEH_SC05_PERF` |
| `PERF_LI_NOMBRE` | nombre | String(50) | |
| `PERF_IN_DEFECTO` | porDefecto | Boolean | Perfil por defecto |
| `PERF_IN_ACTIVO` | activo | Boolean | |
| `PERF_IN_EDITABLE` | editable | Boolean | Si se puede modificar |
| + auditoría + `IN_ELIMINADO` | BaseEntity | | |

## Tabla `T_D_PEAP_PERMISOS_APLICACION`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `PEAP_CO_CODIGO` | id | Long | PK, Sec `SVEH_SC32_PEAP` |
| `PEAP_LI_NOMBRE` | nombre | String(50) | |
| `PEAP_LI_REFERENCIA` | referencia | String(6) | Código ref (ej. "VEH", "TAL") |
| `PEAP_IN_EDICION` | edicion | Boolean | Permiso de edición |
| `PEAP_IN_VISUALIZACION` | visualizacion | Boolean | Permiso de visualización |
| `PARA_CO_CODIGO_OBJETO` | objetoParametroId | Long | FK → Parámetro (tipo objeto) |
| + auditoría + `IN_ELIMINADO` | BaseEntity | | |

## Tabla `T_M_PEUS_PERMISOSAPLI_USUARIO`

| Columna BD | Java Field | Tipo | Notas |
|:---|:---|:---|:---|
| `PEUS_CO_CODIGO` | id | Long | PK, Sec `SVEH_SC33_PEUS` |
| `PEAP_CO_CODIGO` | permisoAplicacionId | Long | FK → PermisoAplicacion |
| `USUA_CO_CODIGO` | usuarioId | Long | FK → Usuario |
| + auditoría + `IN_ELIMINADO` | BaseEntity | | |

## OpenAPI

```yaml
# Perfiles
/v1/perfiles:
  get: { operationId: getPerfiles, tags: [Perfiles] }
  post: { operationId: createPerfil, tags: [Perfiles] }
/v1/perfiles/{id}:
  get: { operationId: getPerfilById, tags: [Perfiles] }
  put: { operationId: updatePerfil, tags: [Perfiles] }
  delete: { operationId: deletePerfil, tags: [Perfiles] }

# Permisos de Aplicación
/v1/permisos:
  get: { operationId: getPermisos, tags: [Permisos] }
  post: { operationId: createPermiso, tags: [Permisos] }
/v1/permisos/{id}:
  get: { operationId: getPermisoById, tags: [Permisos] }
  put: { operationId: updatePermiso, tags: [Permisos] }

# Permisos asignados a usuario
/v1/usuarios/{usuarioId}/permisos:
  get: { operationId: getPermisosUsuario, tags: [PermisosUsuario] }
  put:
    operationId: updatePermisosUsuario
    tags: [PermisosUsuario]
    description: Recibe array de IDs de permisos. Reemplaza la asignación completa.
    requestBody:
      content:
        application/json:
          schema:
            type: array
            items: { type: integer, format: int64 }
```

## Reglas
1. No eliminar un perfil que tenga usuarios asociados (409).
2. Los perfiles con `editable=false` no se pueden modificar por API.
3. Solo puede haber 1 perfil con `porDefecto=true`.
4. La asignación de permisos a usuario es un reemplazo completo (PUT idempotente).

## Frontend
- Ruta `/gestion/perfiles` — Listado + Formulario (nombre, activo, editable, defecto).
- Ruta `/gestion/permisos` — Catálogo de permisos de aplicación.
- En vista de detalle de usuario: panel de permisos asignados (checkboxes edición/visualización).
