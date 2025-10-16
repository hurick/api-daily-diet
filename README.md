# Daily Diet API

API project for a Daily Diet tracking system using Node.js and Fastify. Implements meal management with user authentication and metrics tracking for learning and portfolio purposes.

## Requirements

- Node.js v22.x
- npm v11.x

## Installation

1. Clone the repository

```bash
git clone https://github.com/hurick/api-daily-diet.git
cd api-daily-diet
```

2. Install dependencies

```bash
npm install
```

3. Run database migrations

```bash
npm run knex -- migrate:latest
```

## Development

To run the project in development mode with auto-reload:

```bash
npm run dev
```

The server will start on port 3333.

## Available Scripts

- `npm run dev` - Start the development server with auto-reload
- `npm run knex` - Run Knex CLI commands for database management
- `npm test` - Run tests with Vitest
- `npm run clear` - Remove node_modules and reinstall dependencies
- `npm run clear:r` - Remove node_modules, reinstall dependencies, and start dev server

## Project Structure

```
src/
  ├── @types/              # TypeScript type definitions
  │   ├── meals.ts
  │   ├── routes.ts
  │   ├── users.ts
  │   └── definitions/
  │       ├── fastify.d.ts
  │       └── knex.d.ts
  ├── database/            # Database management
  │   ├── setup.ts
  │   ├── migrations/
  │   │   ├── 20251015163248_create-users-table.ts
  │   │   └── 20251015182621_create-meals-table.ts
  │   └── tmp/
  ├── middlewares/         # HTTP middlewares
  │   └── check-session-id.ts
  ├── routes/              # API route handlers
  │   ├── index.ts
  │   ├── meals/
  │   │   ├── meals.ts
  │   │   └── schema.ts
  │   ├── metrics/
  │   │   ├── metrics.ts
  │   │   └── schema.ts
  │   └── users/
  │       ├── users.ts
  │       └── schema.ts
  ├── utils/               # Utility functions
  │   └── env.ts
  ├── app.ts               # Fastify application setup
  └── server.ts            # Application entry point
```

## API Endpoints

### Users

- **`GET /users`** - List all users
  - Returns: Array of users

- **`POST /users`** - Create a new user
  - Body: `{ "name": string, "email": string }`
  - Returns: `{ "message": string }`
  - Sets session cookie for authentication

### Meals

> **Note:** All meal endpoints require authentication via session cookie

- **`GET /meals`** - List all user's meals
  - Returns: Array of meals ordered by date (descending)
  - Requires: Valid session cookie

- **`GET /meals/:id`** - Get a specific meal details
  - Returns: Meal object
  - Requires: Valid session cookie

- **`POST /meals`** - Create a new meal
  - Body:
    ```json
    {
      "name": "string",
      "description": "string",
      "timestamp": "ISO 8601 date string",
      "is_on_diet": boolean
    }
    ```
  - Returns: `{ "message": string }`
  - Requires: Valid session cookie

- **`PUT /meals/:id`** - Update a meal
  - Body:
    ```json
    {
      "name": "string",
      "description": "string",
      "timestamp": "ISO 8601 date string",
      "is_on_diet": boolean
    }
    ```
  - Returns: `{ "message": string }`
  - Requires: Valid session cookie and meal ownership

- **`DELETE /meals/:id`** - Delete a meal
  - Returns: `{ "message": string }`
  - Requires: Valid session cookie and meal ownership

### Metrics

> **Note:** All metrics endpoints require authentication via session cookie

- **`GET /metrics/meals`** - Get user's meal metrics
  - Returns:
    ```json
    {
      "metrics": {
        "totalMeals": number,
        "totalMealsInDiet": number,
        "totalMealsOffDiet": number,
        "bestSequenceInDiet": number
      }
    }
    ```
  - Requires: Valid session cookie

## Authentication

The API uses cookie-based session authentication. When creating a user, a session cookie is automatically set and will be valid for 7 days. This cookie must be included in all authenticated requests.

## Database

The project uses SQLite3 with Knex.js as the query builder. Database files are stored in `src/database/tmp/`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Hurick Krügner
