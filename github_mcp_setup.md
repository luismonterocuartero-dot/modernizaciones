# Configuración del Servidor MCP de GitHub

Para que el asistente pueda interactuar con tu repositorio de GitHub (crear issues, pull requests, leer ficheros, etc.), necesitas configurar el servidor MCP de GitHub.

## 1. Obtener un GitHub Personal Access Token (PAT)

1.  Ve a [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens).
2.  Haz clic en **"Generate new token (classic)"**.
3.  Asigne un nombre (ej: "Claude MCP").
4.  Selecciona los permisos (Scopes):
    *   `repo` (Control completo de repositorios privados/públicos).
    *   `user` (Opcional, para leer datos de usuario).
    *   `project` (Opcional, para gestionar proyectos).
5.  Haz clic en **"Generate token"** y **copia el token** (empieza por `ghp_...`).

## 2. Configurar el Servidor MCP

Debes editar el archivo de configuración de tu entorno MCP (usualmente `claude_desktop_config.json`).

**Ubicaciones comunes:**
*   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
*   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
*   **Linux:** `~/.config/Claude/claude_desktop_config.json`

### Añadir la configuración JSON

Añade (o modifica) la sección `mcpServers` para incluir `github`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "tu_token_aqui_ghp_..."
      }
    },
    "postgres": {
      ... (tu configuración existente)
    }
  }
}
```

> **Nota:** Asegúrate de reemplazar `"tu_token_aqui_ghp_..."` con tu token real.

## 3. Reiniciar

Una vez guardado el archivo:
1.  Reinicia la aplicación (Claude Desktop o el entorno que estés usando).
2.  El asistente debería detectar automáticamente la herramienta `github`.
