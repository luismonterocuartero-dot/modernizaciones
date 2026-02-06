# N8N MCP Server

## Descripción
Instancia de n8n configurada con servidor MCP (Model Context Protocol) para integración con Antigravity.

## Inicio Rápido

```bash
# Arrancar n8n
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reiniciar (aplicar cambios)
docker-compose restart
```

## Verificación

1. **Acceder UI**: http://localhost:5678
2. **Health check**: http://localhost:5678/healthz
3. **MCP endpoint**: http://localhost:5678/mcp-server/http

## Configuración MCP

El servidor MCP está configurado con:
- `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`
- `N8N_MCP_SERVER_ENABLED=true`
- `N8N_MCP_SERVER_PATH=/mcp-server/http`

## Integración con Antigravity

El archivo `~/.gemini/antigravity/mcp_config.json` contiene la configuración del cliente MCP:

```json
"n8n-mcp": {
  "command": "npx",
  "args": [
    "-y",
    "supergateway",
    "--streamableHttp",
    "http://localhost:5678/mcp-server/http",
    "--header",
    "authorization",
    "Bearer <JWT_TOKEN>"
  ]
}
```

## Troubleshooting

### Puerto ocupado
```bash
sudo lsof -i :5678
```

### Ver logs completos
```bash
docker-compose logs --tail=100 n8n
```

### Verificar variables de entorno
```bash
docker exec n8n-mcp env | grep N8N_
```

### Reiniciar desde cero
```bash
docker-compose down -v
docker-compose up -d
```

## Persistencia de Datos

Los datos se almacenan en el volumen Docker `n8n_data`:
- Workflows
- Credenciales
- Configuración

Para hacer backup:
```bash
docker run --rm -v n8n_data:/data -v $(pwd):/backup alpine tar czf /backup/n8n-backup.tar.gz -C /data .
```

Para restaurar:
```bash
docker run --rm -v n8n_data:/data -v $(pwd):/backup alpine tar xzf /backup/n8n-backup.tar.gz -C /data
```
