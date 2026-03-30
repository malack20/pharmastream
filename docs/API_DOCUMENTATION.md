# API Documentation

## Authentication
- POST `/api/accounts/register/`: Create new account
- POST `/api/accounts/login/`: Get JWT token
- GET `/api/accounts/profile/`: Get user details

## Products
- GET `/api/products/`: List all products
- GET `/api/products/{id}/`: Get product details

## Orders
- POST `/api/orders/`: Create a new order
- GET `/api/orders/`: List user orders

## Prescriptions
- POST `/api/prescriptions/`: Upload a prescription
- GET `/api/prescriptions/`: List user prescriptions

## Payments
- POST `/api/payments/mpesa/`: Initiate M-Pesa payment
- POST `/api/payments/stripe/`: Process Stripe payment
