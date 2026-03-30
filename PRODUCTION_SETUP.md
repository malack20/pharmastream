# Production Deployment & Setup Guide

This document explains how to prepare PharmaStream for production deployment.

## Pre-Deployment Checklist

### 1. Security Setup
- [ ] **REVOKE exposed credentials**: The Google OAuth credentials from `.env` are exposed. Generate new ones:
  - Go to https://console.cloud.google.com/
  - Create new OAuth 2.0 credentials
  - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
  
- [ ] **Review all API keys**: Ensure all payment keys (Stripe, M-Pesa, Airtel) are production credentials, not test keys

- [ ] **Generate Django SECRET_KEY**: 
  ```bash
  python manage.py shell -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
  ```

- [ ] **Set strong database password** in environment variables

### 2. Environment Configuration

1. **For Docker local testing:**
   ```bash
   # Use docker-compose.yml for development (as is)
   docker-compose up -d
   ```

2. **For Production Deployment (Docker):**
   ```bash
   # Use docker-compose.prod.yml
   cp .env.production .env
   # Edit .env with your production values
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **For Render.com Deployment:**
   - Push code to GitHub
   - Render automatically reads `render.yaml`
   - Set environment variables in Render dashboard
   - See Environment Variables section below

### 3. Required Environment Variables

**Minimum for production:**
```
DEBUG=False
SECRET_KEY=<generated-secret-key>
DATABASE_URL=<postgres-connection-string>
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
VITE_API_URL=https://yourdomain.com/api
```

**Optional but recommended:**
- `SECURE_SSL_REDIRECT=True`
- `SECURE_HSTS_SECONDS=31536000`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY`
- `MPESA_*` credentials
- `AIRTEL_*` credentials

### 4. Database Migration

Before running the app:
```bash
python manage.py migrate
```

This is automatically done in `docker-compose.prod.yml` and Render deployment.

### 5. Static Files

Static files are automatically collected during Docker build:
```bash
# Already handled in Dockerfile
RUN python manage.py collectstatic --noinput --clear
```

### 6. Frontend Build

The frontend builds automatically with the production Dockerfile using nginx:
- Multi-stage build optimizes image size
- nginx serves static files efficiently
- SPA routing handled by nginx configuration

## Deployment Steps

### On Render.com

1. **Connect GitHub repository**
   - Go to render.com
   - Click "New+" → "Web Service"
   - Connect GitHub account
   - Select this repository

2. **Setup is automatic**
   - Render reads `render.yaml`
   - Backend service creates & runs on port 8000
   - Frontend service builds & runs on port 3000
   - Database creation is automatic

3. **Set missing environment variables**
   In Render dashboard → Environment:
   - `GOOGLE_CLIENT_ID` (get from Google Cloud Console)
   - `GOOGLE_CLIENT_SECRET`
   - `STRIPE_SECRET_KEY` (if using Stripe)
   - `MPESA_*` credentials (if using M-Pesa)
   - Any other payment provider keys

4. **Verify deployment**
   - Backend: https://pharmastream-backend.onrender.com/api/admin/
   - Frontend: https://pharmastream-frontend.onrender.com/

### Local Docker Production Testing

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Run services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Create superuser (if needed)
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser

# Stop services
docker-compose -f docker-compose.prod.yml down
```

## File Structure

```
pharmastream/
├── backend/
│   ├── Dockerfile              # Production Python build
│   ├── requirements.txt
│   ├── config/
│   │   └── settings.py         # Production settings configured
│   └── ...
├── frontend/
│   ├── Dockerfile              # Production multi-stage build (Node → Nginx)
│   ├── nginx.conf              # Nginx configuration for SPA
│   ├── package.json
│   └── ...
├── docker-compose.yml          # Development (uses dev server)
├── docker-compose.prod.yml     # Production (uses gunicorn + nginx)
├── render.yaml                 # Render.com deployment config
├── .env.example                # Example env variables
├── .env.production             # Production template
└── .gitignore                  # .env excluded from git
```

## Key Production Changes Made

1. **Django Settings**
   - Hardened CORS configuration (environment-based)
   - Security headers enabled (HTTPS, HSTS, etc.)
   - Static file collection configured
   - Debug disabled by default
   - ALLOWED_HOSTS is configurable

2. **Docker** 
   - Backend uses gunicorn (4 workers, 120s timeout)
   - Frontend uses nginx multi-stage build with SPA routing
   - Static and media volumes for persistence
   - Health checks configured

3. **Environment**
   - Secrets now stored in environment variables
   - Development and production configs separated
   - No hardcoded credentials
   - .env is .gitignored

4. **Deployment**
   - Render.yaml configured for automatic deployment
   - Database migrations run automatically
   - Static files served via whitenoise
   - CORS properly configured

## Troubleshooting

### Backend won't start
- Check logs: `docker-compose -f docker-compose.prod.yml logs backend`
- Ensure all required env vars are set
- Run migrations: `python manage.py migrate`

### Frontend shows 404
- Check nginx logs: `docker-compose -f docker-compose.prod.yml logs frontend`
- Ensure `nginx.conf` is properly configured
- Verify `VITE_API_URL` environment variable

### Database connection issues
- Verify `DATABASE_URL` format
- Check database credentials
- Ensure database is running: `docker ps`

### CORS errors
- Update `CORS_ALLOWED_ORIGINS` to include frontend domain
- For Render: set `CORS_ALLOWED_ORIGINS=https://pharmastream-frontend.onrender.com`

## Security Reminders

⚠️ **IMPORTANT**:
1. Never commit `.env` file with real secrets
2. Use environment variables for all sensitive data
3. Generate new OAuth credentials for production
4. Use strong database passwords
5. Enable HTTPS (automatic on Render)
6. Regularly rotate API keys
7. Monitor application logs for suspicious activity

## Support

For Render deployment docs: https://render.com/docs
For Django production settings: https://docs.djangoproject.com/en/stable/howto/deployment/
