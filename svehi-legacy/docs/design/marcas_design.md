# Diseño Técnico: Módulo Marcas

> **Basado en el esquema real de BBDD legacy** (`svehi_full.sql`)

## A) Resumen del módulo
- **Propósito**: Gestión del catálogo maestro de marcas de vehículos.
- **Microservicio**: `ms-svehi-gestion` (Puerto 8081).
- **Tabla legacy**: `T_D_MARC_MARCA`
- **Secuencia**: `SVEH_SC07_MARC` (START WITH 81)
- **Reglas clave**: Unicidad de nombre, soft delete (`IN_ELIMINADO`), validación de borrado (sin modelos).

## B) Contrato OpenAPI (API-first)

```yaml
paths:
  /v1/marcas:
    get:
      summary: Listar marcas paginado
      operationId: getMarcas
      tags: [Marcas]
      parameters:
        - name: nombre
          in: query
          schema:
            type: string
          description: Filtro por nombre (like)
        - name: activo
          in: query
          schema:
            type: boolean
        - $ref: '#/components/parameters/PageParam'
        - $ref: '#/components/parameters/SizeParam'
      responses:
        '200':
          description: Listado paginado de marcas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PageMarcaVO'
    post:
      summary: Crear nueva marca
      operationId: createMarca
      tags: [Marcas]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MarcaSaveVO'
      responses:
        '201':
          description: Marca creada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MarcaVO'
        '409':
          description: Nombre de marca ya existe

  /v1/marcas/{id}:
    get:
      summary: Obtener marca por ID
      operationId: getMarcaById
      tags: [Marcas]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MarcaVO'
        '404':
          description: Marca no encontrada
    put:
      summary: Actualizar marca
      operationId: updateMarca
      tags: [Marcas]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MarcaSaveVO'
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MarcaVO'
        '404':
          description: Marca no encontrada
        '409':
          description: Nombre duplicado
    delete:
      summary: Eliminar marca (soft delete)
      operationId: deleteMarca
      tags: [Marcas]
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
            format: int64
      responses:
        '204':
          description: Eliminado con éxito
        '404':
          description: Marca no encontrada
        '409':
          description: Conflicto - Marca con modelos asociados

components:
  schemas:
    MarcaVO:
      type: object
      properties:
        id:
          type: integer
          format: int64
        nombre:
          type: string
        activo:
          type: boolean
    MarcaSaveVO:
      type: object
      required: [nombre]
      properties:
        nombre:
          type: string
          maxLength: 150
        activo:
          type: boolean
```

## C) Modelo de dominio y persistencia (JPA)

### Tabla real: `T_D_MARC_MARCA`

| Columna BD | Tipo BD | JPA Field | Java Type | Notas |
|:---|:---|:---|:---|:---|
| `MARC_CO_CODIGO` | BIGINT | `id` | Long | PK, Secuencia `SVEH_SC07_MARC` |
| `MARC_LI_NOMBRE` | VARCHAR(150) | `nombre` | String | Nombre de la marca |
| `MARC_IN_ACTIVO` | SMALLINT | `activo` | Boolean | 0=NO, 1=SI |
| `LI_CREACION` | VARCHAR(70) | `creadoPor` | String | Auditoría - usuario creación |
| `FH_CREACION` | TIMESTAMP(6) | `fechaCreacion` | LocalDateTime | Auditoría - fecha creación |
| `LI_MODIFICACION` | VARCHAR(70) | `modificadoPor` | String | Auditoría - usuario modificación |
| `FH_MODIFICACION` | TIMESTAMP(6) | `fechaModificacion` | LocalDateTime | Auditoría - fecha modificación |
| `IN_ELIMINADO` | SMALLINT | `eliminado` | Boolean | Soft delete: 0=NO, 1=SI |

### Entidad JPA

```java
@Entity
@Table(name = "T_D_MARC_MARCA")
@Where(clause = "IN_ELIMINADO = 0")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "marca_seq")
    @SequenceGenerator(name = "marca_seq", sequenceName = "SVEH_SC07_MARC", allocationSize = 1)
    @Column(name = "MARC_CO_CODIGO")
    private Long id;

    @Column(name = "MARC_LI_NOMBRE", length = 150, nullable = false)
    private String nombre;

    @Column(name = "MARC_IN_ACTIVO")
    private Boolean activo;

    @Column(name = "LI_CREACION", length = 70)
    private String creadoPor;

    @Column(name = "FH_CREACION")
    private LocalDateTime fechaCreacion;

    @Column(name = "LI_MODIFICACION", length = 70)
    private String modificadoPor;

    @Column(name = "FH_MODIFICACION")
    private LocalDateTime fechaModificacion;

    @Column(name = "IN_ELIMINADO")
    private Boolean eliminado = false;

    @OneToMany(mappedBy = "marca", fetch = FetchType.LAZY)
    private List<Modelo> modelos;
}
```

### Repositorio

```java
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    boolean existsByNombreIgnoreCase(String nombre);
    Page<Marca> findByNombreContainingIgnoreCase(String nombre, Pageable pageable);
}
```

### Convenciones de auditoría (aplicable a TODAS las entidades)

Todas las tablas del legacy tienen estas 5 columnas comunes:

| Columna | Propósito |
|:---|:---|
| `LI_CREACION` | Usuario que creó el registro |
| `FH_CREACION` | Timestamp de creación |
| `LI_MODIFICACION` | Usuario que modificó el registro |
| `FH_MODIFICACION` | Timestamp de última modificación |
| `IN_ELIMINADO` | Soft delete (0=activo, 1=eliminado) |

> **Recomendación**: Crear una `@MappedSuperclass BaseEntity` con estas 5 columnas para que todas las entidades la hereden.

## D) Capa de servicio

```java
public interface MarcaService {
    Page<MarcaVO> findPaginated(String nombre, Boolean activo, Pageable pageable);
    MarcaVO findById(Long id);
    MarcaVO create(MarcaSaveVO vo);
    MarcaVO update(Long id, MarcaSaveVO vo);
    void delete(Long id); // Soft delete: IN_ELIMINADO = 1
}
```

- **Soft delete**: `delete()` no hace `DELETE FROM`, sino `UPDATE T_D_MARC_MARCA SET IN_ELIMINADO = 1`.
- **Validaciones en servicio**: Unicidad de nombre (antes de crear/actualizar), existencia de modelos activos (antes de borrar).
- **@Transactional** en `create()`, `update()`, `delete()`.

## E) Capa controller/delegate
- `MarcasController implements MarcasApiDelegate` (`@Component`).
- Soft delete devuelve `204 No Content`.

## F) Gestión de errores
- `NoSuchElementException` → 404
- Nombre duplicado → 409 Conflict
- Borrado con modelos → 409 Conflict

---

## G) Diseño Frontend (Angular)

### Modelo de dominio

```typescript
export interface Marca {
  id?: number;
  nombre: string;
  activo: boolean;
}
export interface MarcaSave {
  nombre: string;
  activo?: boolean;
}
```

### Integración API
- **Servicio**: `MarcaHttpAdapter` usando `UtilsService.getApiUrl$('svehi-gestion') + '/v1/marcas'`

### NGRX
- **Feature Key**: `marcas`
- **Actions**: `loadMarcas`, `loadMarcasSuccess`, `loadMarcasFailure`, `saveMarca`, `deleteMarca`
- **Selectors**: `selectAllMarcas`, `selectMarcasLoading`, `selectMarcasError`

### UI (Componentes)
- `MarcaListComponent`: Tabla paginada + filtro nombre + columna activo
- `MarcaFormComponent`: Formulario reactivo (nombre: required + maxLength 150, activo: checkbox)
- **Rutas**: `/gestion/marcas`, `/gestion/marcas/nuevo`, `/gestion/marcas/:id/editar`

## H) Pruebas y DoD
- **Back**: `create_ok`, `create_409_duplicado`, `delete_409_con_modelos`, `findAll_paginado`
- **Front**: `should_validate_required_name`, `should_dispatch_load_on_init`
- **DoD**: OpenAPI actualizado, tests pasando, soft delete funcionando, `@Where(IN_ELIMINADO=0)` activo
