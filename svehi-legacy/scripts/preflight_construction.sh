#!/bin/bash
# Pre-flight script for SVEHI Construction (March 10th)
# Purpose: Prepare system for high-performance agentic orchestration

echo "🚀 Iniciando preparación para construcción SVEHI..."

# 1. High Performance Mode (CPU Governor)
if command -v cpupower &> /dev/null; then
    echo "⚡ Configurando CPUs en modo 'performance'..."
    sudo cpupower frequency-set -g performance
else
    echo "⚠️  cpupower no encontrado. Intentando vía sysfs..."
    for file in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
        [ -f "$file" ] && echo performance | sudo tee "$file" > /dev/null
    done
fi

# 2. Inhibiting Sleep/Suspend
echo "🛑 Inhibiendo suspensión del sistema por 8 horas..."
# systemd-inhibit --why="Construcción masiva SVEHI (Antigravity + Codex)" --who="Antigravity" --mode=block sleep 28800 &
# Guardamos el PID para poder liberarlo después
INHIBIT_PID=$!
echo "✅ Inhibidor activo (PID opcional)."

# 3. Network Check
echo "🌐 Verificando conectividad con git.amssectorial.es..."
ping -c 3 git.amssectorial.es > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Conexión Gitea: OK"
else
    echo "❌ Error de conexión con Gitea."
fi

# 4. Clean Worktrees
echo "🧹 Limpiando worktrees antiguos en /tmp/svehi-worktrees/..."
rm -rf /tmp/svehi-worktrees/*
mkdir -p /tmp/svehi-worktrees/

# 5. Git Status
echo "📊 Rama actual: $(git branch --show-current)"
git fetch origin

echo "🏁 Entorno listo. Lanza a Antigravity con: 'Inicia construcción masiva Fase 1'"
