# docker-starter

A small full-stack exercise run with Docker Compose: a PostgreSQL database with pgAdmin, a Node.js API that reads it, and a React page that displays the result.

**Status: archived.** Learning exercise from 2020, last activity 2020-11-15. Not maintained.

## What it shows

- A Compose file with three services: PostgreSQL, pgAdmin 4 (port 8080) and the API (port 3001). The database is initialised from [`database/init.sql`](database/init.sql), which creates a `products` and an `orders` table and one product: [`docker-compose.yml`](docker-compose.yml).
- An Express API with a `/health` route and a `/products` route that queries PostgreSQL through a connection pool: [`backend/index.js`](backend/index.js), [`backend/queries.js`](backend/queries.js).
- A React page that fetches `http://localhost:3001/products` and lists the products. It is not in Docker: [`frontend/src/App.js`](frontend/src/App.js).

## Stack

From [`docker-compose.yml`](docker-compose.yml) and the `package.json` files: the `postgres` and `dpage/pgadmin4` images (no tag, so `latest`), `node:slim` for the API, Express and `pg`, React 17 with `react-scripts` 4.0.0 for the front end.

## Run it

```bash
cp backend/.env.example backend/.env
cp database/.env.example database/.env
docker-compose up
```

The two `.env` files hold development values (`secret` as the database and pgAdmin password, `admin@mail.com` as the pgAdmin login). Change them if the ports are exposed beyond your machine.

Then, in another terminal, the front end:

```bash
cd frontend
yarn install
yarn start
```

Verified on 2026-10-06 with Node.js 22 and a locally installed PostgreSQL 16 instead of Docker: `npm ci` in `backend/`, then the API started with the variables of `backend/.env.example` pointed at `localhost` answers `/health` and `/products` (the one product from `init.sql`), and answers `500` with a JSON message when the database cannot be reached. Not run: `docker-compose up`, and everything in `frontend/`.

## Known issues

- The images are not pinned to a version.
- `backend/` has both a `package-lock.json` and a `yarn.lock`. The Dockerfile uses `npm ci`, so the npm one is the one that counts.
- The front end calls `http://localhost:3001` directly, so it only works from the machine that runs the API.
- The dependencies of the front end are from 2020 and `yarn audit` reports a large number of advisories for them. Do not deploy this as is.
- The only test is the default Create React App one.

## License

No license file in the repository.
