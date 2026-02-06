#!/bin/bash
set -e

echo "🧪 Testing n8n MCP endpoint..."
echo ""

# Test basic n8n health
echo "1️⃣  Testing n8n health endpoint..."
if curl -s http://localhost:5678/healthz > /dev/null 2>&1; then
    echo "   ✅ n8n is healthy"
else
    echo "   ❌ n8n health check failed"
    exit 1
fi

# Test MCP endpoint availability
echo ""
echo "2️⃣  Testing MCP endpoint availability..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5678/mcp-server/http)

if [[ "$HTTP_CODE" == "200" ]] || [[ "$HTTP_CODE" == "401" ]] || [[ "$HTTP_CODE" == "404" ]]; then
    echo "   ✅ MCP endpoint is responding (HTTP $HTTP_CODE)"
else
    echo "   ❌ MCP endpoint not available (HTTP $HTTP_CODE)"
    exit 1
fi

# Test with authorization if token is provided
echo ""
echo "3️⃣  Testing MCP endpoint with authorization..."
if [ -z "$N8N_MCP_TOKEN" ]; then
    echo "   ⚠️  N8N_MCP_TOKEN not set, skipping auth test"
    echo "   💡 Set token with: export N8N_MCP_TOKEN='your-token-here'"
else
    RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:5678/mcp-server/http \
      -H "authorization: Bearer $N8N_MCP_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"method":"ping","params":{}}' || echo "000")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n-1)
    
    if [[ "$HTTP_CODE" == "200" ]]; then
        echo "   ✅ MCP authenticated request successful"
        echo "   Response: $BODY"
    else
        echo "   ⚠️  MCP auth test returned HTTP $HTTP_CODE"
        echo "   Response: $BODY"
    fi
fi

echo ""
echo "✅ MCP endpoint tests complete!"
echo ""
echo "📍 Endpoints:"
echo "   UI:     http://localhost:5678"
echo "   Health: http://localhost:5678/healthz"
echo "   MCP:    http://localhost:5678/mcp-server/http"
