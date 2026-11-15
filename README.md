# BookNook Client

The BookNook frontend is a Next.js App Router application styled with Tailwind CSS. Its UI is organized into reusable `layout`, `books`, and `ui` components, keeping the client separate from the Express backend.

## Getting Started

Install dependencies and configure the public API URL:

```powershell
npm install
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
```

Set `NEXT_PUBLIC_API_URL` to the backend origin. It defaults to `http://localhost:8000` for local development. This value is public and must not contain credentials or server secrets.

The Express server handles Better Auth. Configure its `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and optional Google OAuth credentials in the server's private `.env` file. Never put those values in the client project.

The login and registration pages use email/password and Google sign-in. Protected pages validate the Better Auth session with the backend before rendering. The profile page also demonstrates a JWT-authenticated request to `GET /api/me`.

The protected **My Books** page lists, edits, and removes books from the signed-in user's shelf. Books stay private unless their owner enables catalog sharing and sets available copies. Browse shared books, borrow from a book's details page, and manage active or returned loans on **My Borrows**.

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
npm run build
```
