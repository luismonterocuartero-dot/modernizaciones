# Guía de Configuración de Base de Datos PostgreSQL para SVEHI

## 📋 Opciones de Configuración

### Opción 1: PostgreSQL con Docker (Recomendado)

#### Requisitos
- Docker instalado en el sistema

#### Pasos

1. **Instalar Docker** (si no está instalado):
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# Cerrar sesión y volver a entrar para aplicar cambios
```

2. **Iniciar PostgreSQL**:
```bash
cd /home/luis/Modernizaciones/svehi-backend
docker compose up -d
```

3. **Verificar que está corriendo**:
```bash
docker compose ps
docker compose logs postgres
```

4. **Conectar a la base de datos** (opcional, para verificar):
```bash
docker exec -it svehi-postgres psql -U svehi -d svehidb
```

5. **Detener PostgreSQL**:
```bash
docker compose down
```

6. **Eliminar datos y reiniciar**:
```bash
docker compose down -v
docker compose up -d
```

---

### Opción 2: PostgreSQL Instalado Localmente

#### Requisitos
- PostgreSQL 12+ instalado en el sistema

#### Pasos

1. **Instalar PostgreSQL**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

2. **Crear usuario y base de datos**:
```bash
sudo -u postgres psql
```

Dentro de psql:
```sql
CREATE USER svehi WITH PASSWORD 'svehi2024';
CREATE DATABASE svehidb OWNER svehi;
GRANT ALL PRIVILEGES ON DATABASE svehidb TO svehi;
\q
```

3. **Cargar el esquema inicial**:
```bash
psql -U svehi -d svehidb -f /home/luis/Modernizaciones/.agent/bbdd/BBDD_SVEHI_PG.sql
```

Si pide contraseña: `svehi2024`

4. **Verificar conexión**:
```bash
psql -U svehi -d svehidb -c "SELECT COUNT(*) FROM svehi_usuarios;"
```

---

## 🚀 Ejecutar el Backend con PostgreSQL

### Método 1: Con perfil de Spring

```bash
cd /home/luis/Modernizaciones/svehi-backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

### Método 2: Variable de entorno

```bash
export SPRING_PROFILES_ACTIVE=postgres
mvn spring-boot:run
```

### Método 3: Modificar application.yml

Reemplazar el contenido de `src/main/resources/application.yml` con el de `application-postgres.yml`:

```bash
cd /home/luis/Modernizaciones/svehi-backend/src/main/resources
cp application-postgres.yml application.yml
```

---

## 🔧 Configuración de Conexión

### Parámetros de Conexión (application-postgres.yml)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/svehidb
    username: svehi
    password: svehi2024
```

### Cambiar Credenciales

Si necesitas cambiar las credenciales, edita:
- `docker-compose.yml` (para Docker)
- `application-postgres.yml` (para Spring Boot)

---

## 📊 Verificar que Funciona

1. **Iniciar PostgreSQL** (Docker o local)

2. **Iniciar el backend**:
```bash
cd /home/luis/Modernizaciones/svehi-backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

3. **Verificar en los logs**:
Deberías ver:
```
HikariPool-1 - Starting...
HikariPool-1 - Added connection conn0: url=jdbc:postgresql://localhost:5432/svehidb
```

4. **Probar endpoint**:
```bash
curl http://localhost:8080/api/v1/usuarios?page=0&size=10
```

---

## 🐛 Troubleshooting

### Error: "Connection refused"
- Verificar que PostgreSQL está corriendo:
  ```bash
  # Docker
  docker compose ps
  
  # Local
  sudo systemctl status postgresql
  ```

### Error: "password authentication failed"
- Verificar credenciales en `application-postgres.yml`
- Para Docker: verificar `docker-compose.yml`

### Error: "database does not exist"
- Crear la base de datos manualmente (ver Opción 2, paso 2)

### El esquema no se carga automáticamente
- Cargar manualmente:
  ```bash
  psql -U svehi -d svehidb -f /home/luis/Modernizaciones/svehi-backend/init-db/01-schema.sql
  ```

---

## 📁 Archivos Creados

```
svehi-backend/
├── docker-compose.yml                           # Configuración Docker
├── init-db/
│   └── 01-schema.sql                            # Esquema inicial (copia de BBDD_SVEHI_PG.sql)
└── src/main/resources/
    ├── application.yml                          # Config H2 (original)
    └── application-postgres.yml                 # Config PostgreSQL (nuevo)
```

---

## ✅ Estado Actual

- ✅ Dependencia PostgreSQL añadida a `pom.xml`
- ✅ Configuración PostgreSQL creada (`application-postgres.yml`)
- ✅ Docker Compose configurado
- ✅ Script SQL de inicialización copiado
- ⏳ **Pendiente**: Instalar Docker o PostgreSQL local
- ⏳ **Pendiente**: Iniciar base de datos
- ⏳ **Pendiente**: Ejecutar backend con perfil `postgres`

---

## 🎯 Próximo Paso Recomendado

**Opción más rápida (si tienes Docker):**
```bash
# 1. Instalar Docker
sudo apt install docker.io docker-compose

# 2. Iniciar PostgreSQL
cd /home/luis/Modernizaciones/svehi-backend
docker compose up -d

# 3. Esperar 10 segundos para que cargue el esquema

# 4. Iniciar backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

**Opción sin Docker:**
```bash
# 1. Instalar PostgreSQL
sudo apt install postgresql

# 2. Crear BD y usuario (ver Opción 2)

# 3. Cargar esquema
psql -U svehi -d svehidb -f /home/luis/Modernizaciones/.agent/bbdd/BBDD_SVEHI_PG.sql

# 4. Iniciar backend
cd /home/luis/Modernizaciones/svehi-backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```
