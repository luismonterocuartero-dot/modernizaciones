# Especificación Funcional: Marcas

## Descripción
Catálogo maestro de marcas de vehículos. Cada marca agrupa uno o más modelos. Es un CRUD simple de baja complejidad, sin lógica de negocio adicional más allá de la unicidad del nombre.

## Entidad Principal
- **Nombre tabla legacy**: `MARCA` (o equivalente en esquema BDD01)
- **Esquema**: BDD01
- **Microservicio**: ms-svehi-gestion

### Campos

| Campo | Tipo | Requerido | Descripción |
|:---|:---|:---:|:---|
| id | Long | Sí | Clave primaria (secuencia Oracle) |
| nombre | String(100) | Sí | Nombre de la marca (único) |
| activo | Boolean | No | Indicador de si la marca está activa (default: true) |

## Relaciones
- **1:N** → Modelo (una marca tiene muchos modelos)

## Operaciones CRUD

| Operación | Endpoint | Notas |
|:---|:---|:---|
| Listar (paginado) | GET /v1/marcas | Filtros: nombre (like), activo |
| Obtener por ID | GET /v1/marcas/{id} | |
| Crear | POST /v1/marcas | |
| Actualizar | PUT /v1/marcas/{id} | |
| Eliminar | DELETE /v1/marcas/{id} | Solo si no tiene modelos asociados |

## Reglas de Negocio
1. El nombre de la marca debe ser **único** (case-insensitive).
2. No se puede eliminar una marca que tenga **modelos asociados** (devolver 409 Conflict).

## Validaciones
- `nombre`: obligatorio, máx 100 caracteres, sin caracteres especiales

## Pantallas (Frontend)
1. **Listado**: Tabla paginada con búsqueda por nombre. Columnas: ID, Nombre, Activo, Acciones.
2. **Formulario**: Crear / Editar con campo nombre (input text) y activo (checkbox).

## Notas Adicionales
- Módulo piloto para validar el flujo agéntico completo.
- Complejidad: 🟢 Baja.
