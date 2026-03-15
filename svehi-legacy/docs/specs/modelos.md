# Especificación Funcional: Modelos

## Descripción
Catálogo de modelos de vehículos, asociados a una marca. Depende del módulo de Marcas.

## Entidad Principal
- **Nombre tabla legacy**: `MODELO`
- **Esquema**: BDD01
- **Microservicio**: ms-svehi-gestion

### Campos

| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria |
| nombre | String(100) | Sí | Nombre del modelo |
| marcaId | Long (FK) | Sí | Referencia a Marca |
| activo | Boolean | No | Indicador activo (default: true) |

## Relaciones
- **N:1** → Marca

## Operaciones CRUD

| Operación | Endpoint | Notas |
|:---|:---|:---|
| Listar | GET /v1/modelos | Filtro: marcaId, nombre (like) |
| Obtener | GET /v1/modelos/{id} | |
| Crear | POST /v1/modelos | |
| Actualizar | PUT /v1/modelos/{id} | |
| Eliminar | DELETE /v1/modelos/{id} | Solo si no tiene vehículos asociados |

## Reglas de Negocio
1. El nombre del modelo debe ser único dentro de la misma marca.
2. La marca referenciada debe existir.
3. No eliminar si tiene vehículos asociados (409).

## Pantallas (Frontend)
1. **Listado**: Tabla con filtro por marca (dropdown) y búsqueda por nombre.
2. **Formulario**: Nombre (input) + Marca (select/dropdown).

## Notas
- Complejidad: 🟢 Baja.
