# System Architecture

## Overview
Pharmastream is built using a modern decoupled architecture.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Axios
- **Backend**: Django REST Framework, PostgreSQL, WhiteNoise
- **Infrastructure**: Docker, Render, Stripe API, M-Pesa API

## Data Flow
1. User interacts with React frontend
2. Frontend makes requests to Django API
3. API processes business logic and interacts with PostgreSQL
4. For payments, API communicates with external payment gateways
5. For prescriptions, files are stored in media storage and reviewed by pharmacists
