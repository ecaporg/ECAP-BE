# Compliance App API

Backend API for Compliance Application built with NestJS.

## Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm (v8+)

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd compliance-app-api

# Install dependencies
npm install
```

## Database Setup

1. Make sure you have PostgreSQL installed and running on your machine.
2. Copy the environment file:

```bash
cp .env.example .env
```

3. Update the .env file with your PostgreSQL credentials if they differ from the defaults.
4. Create the database:

```bash
npm run db:create
```

5. Run database migrations:

```bash
npm run migration:run
```

## Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at http://localhost:3000.
API documentation will be available at http://localhost:3000/api.

## Database Migrations

```bash
# Generate a new migration
npm run migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

The API documentation is generated using Swagger and can be accessed at `/api` when the application is running.

## Project Structure

```
src/
├── core/                  # Core module with shared functionality
│   ├── decorators/        # Custom decorators
│   ├── dto/               # Data transfer objects
│   ├── exceptions/        # Custom exceptions
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Interceptors
│   ├── pipes/             # Custom pipes
│   ├── repository/        # Base repository functionality
│   └── utils/             # Utility functions
├── auth/                  # Authentication module
├── users/                 # Users module
├── config/                # Configuration files
├── migrations/            # Database migrations
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
```

## License

This project is licensed under the MIT License.

## Deployment

### Vercel Deployment

This application is configured for deployment on Vercel:

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel:

   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Other
     - Build Command: `npm run vercel-build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. Set up environment variables:

   - Add all required environment variables from `.env.example` to the Vercel project settings

4. Deploy!

#### Limitations on Vercel

Note that Vercel is a serverless platform with some limitations:

- Cold starts may occur if the API is not used frequently
- Serverless function timeout is limited to 10 seconds
- Long-running processes or WebSockets may not work as expected

For production workloads with databases, consider using a proper database hosting service like:

- [Railway](https://railway.app) for PostgreSQL
- [Supabase](https://supabase.com) for PostgreSQL
- [Atlas](https://www.mongodb.com/atlas/database) for MongoDB
