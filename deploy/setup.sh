#!/bin/bash
# ============================================================
#  Sawari — VPS Setup Script
#  Run once after extracting the zip on the server:
#    bash setup.sh
# ============================================================

set -e

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="sawari"
PORT=3000

echo "=============================="
echo "  Sawari — Server Setup"
echo "  App dir: $APP_DIR"
echo "=============================="

# 1. Check Node.js
if ! command -v node &>/dev/null; then
  echo "[ERROR] Node.js is not installed. Install it first:"
  echo "  curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -"
  echo "  dnf install -y nodejs"
  exit 1
fi
echo "[OK] Node $(node -v)"

# 2. Check .env
if [ ! -f "$APP_DIR/.env" ]; then
  if [ -f "$APP_DIR/.env.example" ]; then
    cp "$APP_DIR/.env.example" "$APP_DIR/.env"
    echo "[!] .env created from .env.example — EDIT IT NOW before continuing:"
    echo "    nano $APP_DIR/.env"
    echo "    Then re-run: bash setup.sh"
    exit 1
  else
    echo "[ERROR] .env file missing. Create it at: $APP_DIR/.env"
    exit 1
  fi
fi
echo "[OK] .env found"

# 3. Install production dependencies
echo "[...] Installing npm dependencies..."
cd "$APP_DIR"
npm install --omit=dev --silent
echo "[OK] Dependencies installed"

# 4. Ensure data dir + leads.json exist
mkdir -p "$APP_DIR/data"
if [ ! -f "$APP_DIR/data/leads.json" ]; then
  echo '{"newsletter":[],"registerInterest":[]}' > "$APP_DIR/data/leads.json"
  echo "[OK] data/leads.json created"
fi

# 5. Ensure uploads dir exists
mkdir -p "$APP_DIR/assets/uploads"
echo "[OK] assets/uploads ready"

# 6. Install PM2 if not present
if ! command -v pm2 &>/dev/null; then
  echo "[...] Installing PM2..."
  npm install -g pm2 --silent
fi
echo "[OK] PM2 $(pm2 -v)"

# 7. Start / restart app with PM2
if pm2 list | grep -q "$APP_NAME"; then
  pm2 restart "$APP_NAME"
  echo "[OK] PM2 restarted: $APP_NAME"
else
  pm2 start "$APP_DIR/server.js" --name "$APP_NAME"
  echo "[OK] PM2 started: $APP_NAME on port $PORT"
fi

# 8. Save PM2 and enable startup
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo ""
echo "=============================="
echo "  Done! App running on :$PORT"
echo "  Check:  pm2 logs $APP_NAME"
echo "=============================="
echo ""
echo "Next step — add reverse proxy in Webuzo:"
echo "  1. Log in to Webuzo panel"
echo "  2. Go to: Apache -> Virtual Hosts -> indigo-ca.com -> Custom Configuration"
echo "  3. Paste the contents of: $APP_DIR/deploy/apache-proxy-snippet.conf"
echo "  4. Save & restart Apache"
echo ""
echo "Site will then be live at: https://indigo-ca.com/"
