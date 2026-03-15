# Referencia de Base de Datos Legacy — SVEHI

> Este fichero es el contexto obligatorio para cualquier agente que implemente entidades JPA.
> Todas las entidades deben mapear **exactamente** a estas tablas con `hibernate.ddl-auto=none`.

## Convenciones Globales

| Convención | Detalle |
|:---|:---|
| **Prefijo tablas** | `T_D_` (datos), `T_M_` (maestros/relaciones) |
| **PK** | `XXXX_CO_CODIGO` (BIGINT) |
| **Soft delete** | `IN_ELIMINADO` (SMALLINT: 0=NO, 1=SI) → usar `@Where(clause="IN_ELIMINADO=0")` |
| **Activo** | `XXXX_IN_ACTIVO` (SMALLINT: 0=NO, 1=SI) |
| **Auditoría** | `LI_CREACION`, `FH_CREACION`, `LI_MODIFICACION`, `FH_MODIFICACION` |
| **Secuencias** | `SVEH_SC##_XXXX` → usar `@SequenceGenerator(allocationSize=1)` |
| **Documentos (blob)** | `XXXX_DOC_DOCUMENTO` (BYTEA/BLOB — LOB securefile) |

## BaseEntity (heredar en todas las entidades)

```java
@MappedSuperclass
public abstract class BaseEntity {
    @Column(name = "LI_CREACION", length = 70) private String creadoPor;
    @Column(name = "FH_CREACION") private LocalDateTime fechaCreacion;
    @Column(name = "LI_MODIFICACION", length = 70) private String modificadoPor;
    @Column(name = "FH_MODIFICACION") private LocalDateTime fechaModificacion;
    @Column(name = "IN_ELIMINADO") private Boolean eliminado = false;
}
```

## Catálogo de Tablas

### Catálogos Maestros (Fase 1)

| Tabla | Secuencia | Entidad JPA | Columnas clave |
|:---|:---|:---|:---|
| `T_D_MARC_MARCA` | `SVEH_SC07_MARC` | Marca | `MARC_CO_CODIGO`, `MARC_LI_NOMBRE`, `MARC_IN_ACTIVO` |
| `T_D_MODE_MODELO` | `SVEH_SC08_MODE` | Modelo | `MODE_CO_CODIGO`, `MARC_CO_CODIGO`(FK), `MODE_LI_NOMBRE`, `PARA_CO_CODIGO_TIVEHI`(FK), `PARA_CO_CODIGO_TIREPO`(FK), `MODE_LI_CILINDRADA`, `MODE_LI_POTENCIA` |
| `T_D_OPER_OPERADORA` | `SVEH_SC35_OPER` | Operadora | `OPER_CO_CODIGO`, `OPER_LI_NOMBRE`, `OPER_LI_DIRECCION`, `OPER_LI_TELEFONO`, `OPER_LI_CONTACTO`, `OPER_IN_ACTIVO` |
| `T_D_COMP_COMPANIA` | `SVEH_SC18_COMP` | Compania | `COMP_CO_CODIGO`, `COMP_LI_NOMBRE`, `COMP_LI_DIRECCION`, `COMP_LI_TELEFONO`, `COMP_LI_CONTACTO`, `COMP_IN_ACTIVO` |
| `T_D_CONC_CONCEPTO` | `SVEH_SC30_CONC` | Concepto | `CONC_CO_CODIGO`, `CONC_LI_NOMBRE`, `CONC_NU_PRECIOUNI`, `CONC_NU_KILOMETROS`, `CONC_NU_DIAS` |
| `T_M_TIPA_TIPOPARAMETRO` | `SVEH_SC03_TIPA` | TipoParametro | `TIPA_CO_CODIGO`, `TIPA_LI_CODIGO`(3), `TIPA_LI_NOMBRE`, `TIPA_IN_ACTIVO`, `TIPA_IN_MODIF` |
| `T_D_PARA_PARAMETRO` | `SVEH_SC04_PARA` | Parametro | `PARA_CO_CODIGO`, `TIPA_CO_CODIGO`(FK), `CEDI_CO_CODIGO`(FK), `PARA_LI_NOMBRE`, `PARA_IN_DATOSEXTRA`, `PARA_LI_LITERALEXTRA`, `PARA_IN_ACTIVO` |
| `T_D_PERF_PERFIL` | `SVEH_SC05_PERF` | Perfil | `PERF_CO_CODIGO`, `PERF_LI_NOMBRE`, `PERF_IN_DEFECTO`, `PERF_IN_ACTIVO`, `PERF_IN_EDITABLE` |
| `T_D_USUA_USUARIO` | `SVEH_SC06_USUA` | Usuario | `USUA_CO_CODIGO`, `SEAD_CO_CODIGO`(FK), `PERF_CO_CODIGO`(FK), `USUA_LI_DNI`, `USUA_LI_NOMBRE`, `USUA_LI_APELLIDO1`, `USUA_LI_APELLIDO2`, `USUA_IN_ACTIVO`, `USUA_IN_FILTRASERV`, `USUA_FH_ULT_ACC`, `USUA_FH_ACT_ACC`, `USUA_IN_CHECKFIN` |
| `T_D_PEAP_PERMISOS_APLICACION` | `SVEH_SC32_PEAP` | PermisoAplicacion | `PEAP_CO_CODIGO`, `PEAP_LI_NOMBRE`, `PEAP_LI_REFERENCIA`(6), `PEAP_IN_EDICION`, `PEAP_IN_VISUALIZACION`, `PARA_CO_CODIGO_OBJETO`(FK) |
| `T_M_PEUS_PERMISOSAPLI_USUARIO` | `SVEH_SC33_PEUS` | PermisoUsuario | `PEUS_CO_CODIGO`, `PEAP_CO_CODIGO`(FK), `USUA_CO_CODIGO`(FK) |
| `T_M_CEDI_CENTRODIRECTIVO` | `SVEH_SC01_CEDI` | CentroDirectivo | `CEDI_CO_CODIGO`, `CEDI_LI_NOMBRE`, `CEDI_IN_ACTIVO` |
| `T_M_SEAD_SERVICIOADSCR` | `SVEH_SC02_SEAD` | ServicioAdscrito | `SEAD_CO_CODIGO`, `CEDI_CO_CODIGO`(FK), `PROV_CO_CODIGO`, `SEAD_LI_NOMBRE`, `SEAD_IN_ACTIVO`, `SEAD_LI_CODIGO`(6) |

### Vehículos (Fase 2)

| Tabla | Secuencia | Entidad JPA | Columnas clave |
|:---|:---|:---|:---|
| `T_D_VEHI_VEHICULO` | `SVEH_SC09_VEHI` | Vehiculo | `VEHI_CO_CODIGO`, `MODE_CO_CODIGO`(FK), `SEAD_CO_CODIGO`(FK), `OPER_CO_CODIGO`(FK), múltiples `PARA_CO_CODIGO_*`(FKs) + color, bastidor, compra, inventario, situación, baja, uso, observaciones |
| `T_D_MATR_MATRICULA` | `SVEH_SC10_MATR` | Matricula | `MATR_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `MATR_LI_MATRICULA`, `MATR_FH_FECHAMATRI`, `MATR_LI_TARJREPOSTAJE`, `MATR_LI_TARJPEAJE`, `MATR_IN_DOBLADA`, `MATR_NU_PIN` |
| `T_D_POLI_POLIZA` | `SVEH_SC20_POLI` | Poliza | `POLI_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `COMP_CO_CODIGO`(FK), `MATR_CO_CODIGO`(FK), `POLI_LI_NPOLIZA`, fechas inicio/fin, NIF, dirección, teléfono, contacto |
| `T_D_EQUI_EQUIPAMIENTO` | `SVEH_SC11_EQUI` | Equipamiento | `EQUI_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `PARA_CO_CODIGO`(FK), extraparam, observaciones |
| `T_D_INFR_INFRACCION` | `SVEH_SC24_INFR` | Infraccion | `INFR_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `MATR_CO_CODIGO`(FK), fecha, hora, lugar, conductor, expediente, motivo, importe, daños |
| `T_D_REPO_REPOSTAJE` | `SVEH_SC13_REPO` | Repostaje | `REPO_CO_CODIGO`, `MATR_CO_CODIGO`(FK), `VEHI_CO_CODIGO`(FK), fecha, km, litros, importe, descripción |
| `T_D_ITVS_ITVS` | `SVEH_SC19_ITVS` | Itv | `ITVS_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `MATR_CO_CODIGO`(FK), fecha, fechasig, superada, leves |
| `T_D_SINI_SINIESTRO` | `SVEH_SC22_SINI` | Siniestro | `SINI_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `MATR_CO_CODIGO`(FK), fecha, hora, lugar, conductor, daños, expediente, compañía contraria |
| `T_D_CESI_CESION` | `SVEH_SC14_CESI` | Cesion | `CESI_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `SEAD_CO_CODIGO`(FK), km, fechas, observaciones |
| `T_D_MATE_MATERIAL` | `SVEH_SC12_MATE` | Material | `MATE_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `PARA_CO_CODIGO`(FK), extraparam |
| `T_M_VEDO_VEHICULODOCUMENTOS` | `SVEH_SC26_VEDO` | VehiculoDocumento | `VEDO_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `VEDO_DOC_DOCUMENTO`(BLOB), nombre, MIME, fecha, comentarios |

### Talleres (Fase 3)

| Tabla | Secuencia | Entidad JPA | Columnas clave |
|:---|:---|:---|:---|
| `T_D_TALL_TALLER` | `SVEH_SC15_TALL` | Taller | `TALL_CO_CODIGO`, nombre, CIF, dirección, teléfono, email, observaciones, `PROV_RCDA_CO_CODIGO`, `MUNI_RCDA_CO_CODIGO`, CP |
| `T_M_SETA_SERVICIOTALLER` | `SVEH_SC16_SETA` | ServicioTaller | `SETA_CO_CODIGO`, `TALL_CO_CODIGO`(FK), `SEAD_CO_CODIGO`(FK), `PARA_CO_CODIGO`(FK), licitación, expediente, contacto, teléfono, email, fechas inicio/fin, tipos vehículos, conceptos |
| `T_D_MANT_MANTENIMIENTO` | `SVEH_SC28_MANT` | Mantenimiento | `MANT_CO_CODIGO`, `VEHI_CO_CODIGO`(FK), `MATR_CO_CODIGO`(FK), `TALL_CO_CODIGO`(FK), finalizado, autorización, km, reparación, factura, IVA, base imponible, precio total |
| `T_M_MACO_MANTECONCEPTO` | `SVEH_SC31_MACO` | MantenimientoConcepto | `MACO_CO_CODIGO`, `MANT_CO_CODIGO`(FK), `CONC_CO_CODIGO`(FK), fecha, km, precio, cantidad |
| `T_M_MNDO_MANTEDOCUMENTOS` | `SVEH_SC29_MNDO` | MantenimientoDocumento | `MNDO_CO_CODIGO`, `MANT_CO_CODIGO`(FK), `MNDO_DOC_DOCUMENTO`(BLOB), nombre, MIME, fecha |

### Documentos por entidad (BLOBs)

| Tabla | Para entidad | Secuencia |
|:---|:---|:---|
| `T_M_VEDO_VEHICULODOCUMENTOS` | Vehículo | `SVEH_SC26_VEDO` |
| `T_M_MNDO_MANTEDOCUMENTOS` | Mantenimiento | `SVEH_SC29_MNDO` |
| `T_M_PODO_POLIZADOCUMENTOS` | Póliza | `SVEH_SC21_PODO` |
| `T_M_INDO_INFRACCIONDOCUMENTOS` | Infracción | `SVEH_SC25_INDO` |
| `T_M_SIDO_SINIESTRODOCUMENTOS` | Siniestro | `SVEH_SC23_SIDO` |
| `T_M_ITDO_ITVSDOCUMENTOS` | ITV | `SVEH_SC27_ITDO` |

### Importación de repostajes

| Tabla | Secuencia | Propósito |
|:---|:---|:---|
| `T_D_HFIM_HIST_FICHEROS_IMPORTADOS` | `SVEH_SC37_HFIM` | Historial de ficheros SOLRED importados |
| `T_D_REIM_REGISTROS_IMPORTADOS` | `SVEH_SC36_REIM` | Registros importados con éxito |
| `T_D_REDE_REGISTROS_DESCARTADOS` | `SVEH_SC38_REGDESC` | Registros descartados por errores |
| `T_D_COER_CODIFICA_ERROR` | — | Catálogo de códigos de error |
