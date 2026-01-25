# Setup Reverse ETL to Webhook

A simplified Reverse ETL setup flow that allows users to connect to a PostgreSQL database, select tables, map columns to nested JSON fields and preview the resulting payload.

## Live version

**Frontend:** https://rudderstack.klimjs.dev

**Database for testing** (seeded with the data provided):

```
postgresql://etl_rrwq_user:37DJylwi8y0wzkjb9itdUA18EqS3q9hk@dpg-d5r62h63jp1c73fh883g-a.frankfurt-postgres.render.com/etl_rrwq
```

**Test table with data:** `users`

Deployed to Vercel (frontend) and Render (backend + PostgreSQL).

## Tech stack

### Backend

- Fastify + PostgreSQL
- Drizzle ORM - accommodates future changes, easily prevents SQL injection
- Zod - schema validation for endpoint inputs

### Frontend

- Vite + React
- Zustand - state management (accommodates future changes, shares state across tabs)
- Tanstack Query
- `@microlink/react-json-view` - JSON preview component

## Running locally

### Backend

```
cd backend
pnpm install
pnpm dev
```

### Frontend

```
cd frontend
pnpm install
pnpm dev
```

Set `VITE_API_URL` in `frontend/.env.local` to point to your backend URL.

## Assumptions

- User already has a PostgreSQL connection string (no separate fields for server, port, etc. in the UI)
- Database uses the `public` schema
- Authentication is out of scope (**rate limiting plugin added instead**)

## Possible improvements

### UX enhancements

- **Mapping flow**: Add one column at a time instead of displaying all columns at once
- **Preview controls**: Add ability to select the number of rows to preview (backend already supports `limit` parameter)
- **Column toggles**: Ability to enable/disable columns for JSON output (currently, if a JSON path exists, the column is included)
- **Mapping cleanup**: UI for clearing/resetting mappings (methods already exist in store)
- **Debouncing**: Debounce JSON path inputs for better performance

### Validation & error handling

- **JSON path validation**: Validate dot notation syntax (e.g., `user.name.first`)
- **Better error messages**: Improve user-facing error messages
- **Better logging**: Enhanced logging for debugging and monitoring

### Performance & architecture

- **Table availability**: Make tables available as soon as the connection string is validated (not requiring explicit connection test)
- **Narrowed CORS configuration**: enabled from all origins for test assignment scope only
- **Backend tests**: Expand test coverage beyond validation and utilities
- **Frontend tests**: Add hooks and components tests
