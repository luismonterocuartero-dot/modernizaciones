# Especificación Funcional: Operadoras

## Descripción
Catálogo de operadoras de combustible y tarjetas. CRUD simple sin dependencias complejas.

## Entidad Principal
- **Tabla legacy**: `OPERADORA` | **Esquema**: BDD01 | **MS**: ms-svehi-gestion

### Campos

| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria |
| nombre | String(100) | Sí | Nombre (único) |
| activo | Boolean | No | Default: true |

## Relaciones
- **1:N** → VehiculoTarjeta

## Operaciones CRUD
- GET /v1/operadoras (listado paginado, filtro nombre)
- GET /v1/operadoras/{id}
- POST /v1/operadoras
- PUT /v1/operadoras/{id}
- DELETE /v1/operadoras/{id} (solo si no tiene tarjetas asociadas → 409)

## Reglas: Nombre único. No eliminar con tarjetas asociadas.
## Pantallas: Listado + Formulario (nombre, activo).
## Complejidad: 🟢 Baja.

---

# Especificación Funcional: Compañías

## Descripción
Catálogo de compañías de seguros. CRUD simple.

## Entidad Principal
- **Tabla legacy**: `COMPANIA` | **Esquema**: BDD01 | **MS**: ms-svehi-gestion

### Campos

| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria |
| nombre | String(150) | Sí | Nombre (único) |
| activo | Boolean | No | Default: true |

## Relaciones: 1:N → VehiculoSeguro
## Operaciones: CRUD estándar en /v1/companias. No eliminar con seguros asociados (409).
## Pantallas: Listado + Formulario.
## Complejidad: 🟢 Baja.

---

# Especificación Funcional: Conceptos

## Descripción
Catálogo de conceptos de reparación. CRUD simple.

## Entidad Principal
- **Tabla legacy**: `CONCEPTO` | **Esquema**: BDD01 | **MS**: ms-svehi-gestion

### Campos

| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria |
| nombre | String(200) | Sí | Descripción del concepto (único) |
| activo | Boolean | No | Default: true |

## Relaciones: 1:N → TallerReparacion
## Operaciones: CRUD estándar en /v1/conceptos.
## Complejidad: 🟢 Baja.

---

# Especificación Funcional: Tipos y Parámetros

## Descripción
Tipos agrupan parámetros del sistema (catálogos dinámicos). Tipos es solo lectura; Parámetros es CRUD con filtro por tipo.

## Entidades
- **TIPO**: id, nombre. Solo lectura (GET).
- **PARAMETRO**: id, nombre, tipoId (FK→Tipo), activo.

## Operaciones
- GET /v1/tipos (listado, solo lectura)
- GET /v1/parametros?tipoId={id} (filtro por tipo)
- CRUD /v1/parametros
## Complejidad: 🟢 Baja.

---

# Especificación Funcional: Usuarios

## Descripción
Gestión de usuarios del sistema. CRUD con asociación a perfil y zona ADS.

## Entidad Principal
- **Tabla legacy**: `USUARIO` | **Esquema**: BDD01 | **MS**: ms-svehi-gestion

### Campos
| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria |
| username | String(50) | Sí | Login (único) |
| nombre | String(100) | Sí | Nombre completo |
| email | String(150) | No | Correo electrónico |
| perfilId | Long (FK) | Sí | Perfil asignado |
| activo | Boolean | No | Default: true |

## Relaciones: N:1 → Perfil
## Operaciones: CRUD en /v1/usuarios. Filtros: nombre, username, perfilId.
## Complejidad: 🟢 Baja.

---

# Especificación Funcional: Perfiles y Permisos

## Descripción
Perfiles agrupan permisos del sistema. CRUD con sub-recurso de permisos.

## Entidades
- **PERFIL**: id, nombre (único), descripcion, activo.
- **PERMISO**: id, codigo (único), descripcion.
- Relación M:N entre Perfil y Permiso (tabla intermedia).

## Operaciones
- CRUD /v1/perfiles
- GET /v1/perfiles/{id}/permisos (listar permisos del perfil)
- PUT /v1/perfiles/{id}/permisos (actualizar permisos asignados)
- CRUD /v1/permisos (catálogo de permisos)
## Complejidad: 🟢 Baja.

---

# Especificación Funcional: Flotas y Grupos

## Descripción
Flotas agrupan vehículos. Grupos organizan centros y presupuestos.

## Entidades
- **FLOTA**: id, nombre, descripcion, activo.
- **GRUPO**: id, nombre, con sub-recursos GrupoCentro y GrupoPresupuesto.

## Operaciones
- CRUD /v1/flotas
- CRUD /v1/grupos (con sub-recursos)
## Complejidad: 🟢 Baja.
