# SVEHI n8n Workflows

Este directorio contiene los flujos de trabajo (workflows) de n8n diseñados para automatizar la colaboración en el proyecto SVEHI.

## Archivos
*   `pr-reviewer.json`: **Guardián de Calidad**. Revisa Pull Requests automáticamente buscando cumplimiento de estándares (API-First en Backend, Standalone Components en Frontend).
*   `issue-to-branch.json`: **Gestión Ágil**. Crea automáticamente una rama `feature/` cuando se asigna un Issue en GitHub.
*   `module-assistant.json`: **Asistente de Módulo**. Detecta cambios en entidades del Backend (`Vehiculo.java`) y alerta si falta la actualización correspondiente en el Frontend.

## Instrucciones de Importación

1.  **Acceder a n8n**:
    *   Ve a tu instancia de n8n (ej. `https://luismontero.app.n8n.cloud`).

2.  **Importar Workflow**:
    *   En n8n, crea un nuevo workflow.
    *   Haz clic en el menú (tres puntos arriba a la derecha) -> "Import from File".
    *   Selecciona uno de los archivos `.json` de esta carpeta.

3.  **Configurar Credenciales**:
    *   **GitHub**: Necesitarás configurar una credencial "GitHub OAuth2 API" o "GitHub Personal Access Token" en n8n. Asegúrate de que tenga permisos `repo` y `user`.
    *   **OpenAI**: Los workflows usan el nodo de OpenAI (GPT-4) para el análisis. Necesitarás una API Key de OpenAI configurada en n8n.

4.  **Activar**:
    *   Una vez importado y configuradas las credenciales, activa el switch "Active" arriba a la derecha.
    *   Esto registrará los Webhooks en tu repositorio de GitHub automáticamente.

## Notas
*   Asegúrate de que el usuario configurado en la credencial de GitHub tenga permisos de escritura en los repositorios `svehi-backend` y `svehi-frontend`.
*   Para `module-assistant.json`, el trigger verifica cambios en `Vehiculo.java`. Puedes editar el nodo "Check Vehiculo Change" para monitorear otros archivos.
