# Especificación Funcional: {NOMBRE_MODULO}

## Descripción
{Descripción breve del módulo y su propósito en el sistema SVEHI.}

## Entidad Principal
- **Nombre tabla legacy**: `{NOMBRE_TABLA}`
- **Esquema**: BDD01

### Campos

| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria (secuencia Oracle) |
| ... | ... | ... | ... |

## Relaciones
- {Listar relaciones con otras entidades: N:1, 1:N, M:N}

## Operaciones CRUD

| Operación | Endpoint | Notas |
|:---|:---|:---|
| Listar (paginado) | GET /v1/{recurso} | Filtros: {campos filtrables} |
| Obtener por ID | GET /v1/{recurso}/{id} | |
| Crear | POST /v1/{recurso} | |
| Actualizar | PUT /v1/{recurso}/{id} | |
| Eliminar | DELETE /v1/{recurso}/{id} | {soft delete o hard delete} |

## Reglas de Negocio
1. {Regla 1: ej. "El nombre debe ser único"}
2. {Regla 2: ej. "No se puede eliminar si tiene modelos asociados"}

## Validaciones
- {Campo}: {Restricción — ej. "nombre: obligatorio, max 100 caracteres"}

## Pantallas (Frontend)
1. **Listado**: Tabla paginada con búsqueda por {campos}
2. **Formulario**: Crear / Editar con campos {listar}
3. **Detalle**: {Si aplica}

## Notas Adicionales
- {Permisos/roles si aplica}
- {Integraciones con otros módulos}
- {Requisitos no funcionales}
