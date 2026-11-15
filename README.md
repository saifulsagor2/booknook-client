# BookNook Client

The BookNook frontend is a Next.js App Router application styled with Tailwind CSS. Its UI is organized into reusable `layout`, `books`, and `ui` components, keeping the client separate from the Express backend.

## Getting Started

Install dependencies and configure the public API URL:

```powershell
npm install
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
```

Set `NEXT_PUBLIC_API_URL` to the backend origin. It defaults to `http://localhost:8000` for local development. This value is public and must not contain credentials or server secrets.

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
npm run build
```
