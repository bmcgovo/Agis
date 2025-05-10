# .env.production

# Application
NODE_ENV=production
PORT=3000

# Database
DB_HOST=db-prod.internal
DB_PORT=5432
DB_NAME=agis_production
DB_USER=agis_app
DB_PASSWORD=your_actual_secure_production_database_password # <-- REPLACE THIS
DB_SSL=true

# Redis
REDIS_HOST=redis-prod.internal
REDIS_PORT=6379
REDIS_PASSWORD=REPLACE_WITH_SECURE_PROD_PASSWORD

# Security
JWT_SECRET=your_actual_strong_random_production_jwt_secret # <-- REPLACE THIS
SESSION_TIMEOUT=900  # 15 minutes (in seconds)

# Logging & Monitoring
LOG_LEVEL=info
LOGTAIL_KEY=REPLACE_WITH_PROD_LOGTAIL_KEY

# Compliance & Access
ENABLE_AUDIT_LOGGING=true
RBAC_ENABLED=true

# Accessibility & Compliance
WCAG_LEVEL=AA

# Email (for notifications, password resets, etc.)
EMAIL_HOST=smtp.gov.au
EMAIL_PORT=587
EMAIL_USER=notify@agency.gov.au
EMAIL_PASSWORD=your_actual_secure_production_email_password # <-- REPLACE THIS

# Other
API_RATE_LIMIT=100
