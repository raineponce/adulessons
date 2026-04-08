#!/bin/sh
set -e

echo "🌱 Seeding content..."
node backend/seed/seedContent.js

echo "🌱 Seeding fake users..."
node backend/seed/seedUsers.js

echo "🌱 Seeding secret codes..."
node backend/seed/seedSecretCodes.js

echo "🚀 Starting server..."
exec node backend/server.js
