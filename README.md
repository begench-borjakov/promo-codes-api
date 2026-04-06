# Promo Codes API

A backend API built with NestJS and Prisma for managing promo codes and activating them by email.

## Features

- Create promo codes
- Get all promo codes
- Get a promo code by ID
- Update promo codes
- Delete promo codes
- Activate promo codes by email
- Prevent duplicate activation by the same email
- Prevent activation after expiration
- Prevent activation when the limit is reached
- Validate requests globally
- Handle HTTP exceptions globally
- Validate environment variables with Joi

## Tech Stack

- NestJS
- Prisma
- PostgreSQL
- class-validator
- class-transformer
- Joi

## Environment Variables

Create a `.env` file in the root of the project:

```env

PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DB_NAME
Installation
Install dependencies:

bash

npm install
Prisma Setup
Generate the Prisma client:

bash

npx prisma generate
Run database migrations:

bash

npx prisma migrate dev
Running the Application
Start in development mode:

bash

npm run start:dev
Build and run in production mode:

bash

npm run build
npm run start:prod
API Endpoints
Promo Codes
POST /promo-codes
GET /promo-codes
GET /promo-codes/:id
PATCH /promo-codes/:id
DELETE /promo-codes/:id
Activations
POST /activations
GET /activations

```
