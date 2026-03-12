#!/bin/sh
set -e

echo "🌱 Seeding content..."
node backend/seed/seedContent.js

echo "🌱 Seeding fake users..."
node backend/seed/seedUsers.js

echo "🚀 Starting server..."
exec node backend/server.js
