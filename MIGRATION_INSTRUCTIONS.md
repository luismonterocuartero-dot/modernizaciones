# Instrucciones de Migración a Supabase

## 1. Crear Base de Datos
Ejecuta el script SQL generado en tu instancia de Supabase (SQL Editor).

**Archivo:** `.agent/bbdd/svehi_schema_postgres.sql`

## 2. Configurar Entorno
Para arrancar `svehi-backend`, necesitas definir las siguientes variables de entorno con tus credenciales de Supabase:

```bash
export SUPABASE_URL="jdbc:postgresql://<TU_HOST_SUPABASE>:5432/postgres"
export SUPABASE_USER="postgres"
export SUPABASE_PASSWORD="<TU_PASSWORD>"
```

O puedes pasarlas directamente al comando maven:

```bash
mvn spring-boot:run \
 -Dspring-boot.run.arguments="--spring.datasource.url=jdbc:postgresql://<HOST>:5432/postgres --spring.datasource.username=postgres --spring.datasource.password=<PASSWORD>"
```

## 3. Verificar
Una vez arrancado, el backend se conectará a Supabase en lugar de la base de datos H2 en memoria.
