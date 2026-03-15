# Domain Mapping Context (Symbolic Index)

> Use this file for ultra-fast table and entity lookup without opening implementation files.

## Master Data (Catalogs)
- **Marca**: `T_D_MARC_MARCA` (PK: `MARC_CO_CODIGO`)
- **Modelo**: `T_D_MODE_MODELO` (PK: `MODE_CO_CODIGO`, FK: `MARC_CO_CODIGO`)
- **Taller**: `T_D_TALL_TALLER` (PK: `TALL_CO_CODIGO`)
- **Operadora**: `T_D_OPER_OPERADORA` (PK: `OPER_CO_CODIGO`)
- **Compañía**: `T_D_COMP_COMPANIA` (PK: `COMP_CO_CODIGO`)

## Core Domain (Vehicles & Maintenance)
- **Vehículo**: `T_D_VEHI_VEHICULO` (PK: `VEHI_CO_CODIGO`)
- **Matrícula**: `T_D_MATR_MATRICULA` (PK: `MATR_CO_CODIGO`, FK: `VEHI_CO_CODIGO`)
- **Mantenimiento**: `T_D_MANT_MANTENIMIENTO` (PK: `MANT_CO_CODIGO`, FKs: `VEHI`, `MATR`, `TALL`)

## System & Config
- **Usuario**: `T_D_USUA_USUARIO` (PK: `USUA_CO_CODIGO`)
- **Perfil**: `T_D_PERF_PERFIL` (PK: `PERF_CO_CODIGO`)
- **Parámetro**: `T_D_PARA_PARAMETRO` (PK: `PARA_CO_CODIGO`)

For detailed column types, consult `db_reference.md`.
