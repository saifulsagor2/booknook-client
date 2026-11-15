# BookNook Client

The BookNook frontend is a Next.js App Router application built with TypeScript, React, and Tailwind CSS. Its UI is organized into reusable `layout`, `books`, `auth`, and `ui` components. It is deployed and versioned separately from the Express backend.

## Getting Started

Install dependencies and configure the public API URL:

```powershell
npm install
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
```

Set `NEXT_PUBLIC_API_URL` to the backend origin. It defaults to `http://localhost:8000` only during local development. Production builds do not fall back to localhost, so configure this variable in Vercel before building. This value is public and must not contain credentials or server secrets.

The Express server handles Better Auth. Configure its `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and optional Google OAuth credentials in the server's private `.env` file. Never put those values in the client project.

The login and registration pages use email/password and Google sign-in. Google authentication can succeed only when both provider credentials are configured in the backend. Protected pages validate the Better Auth session with the backend before rendering. The profile page also demonstrates a JWT-authenticated request to `GET /api/me`.

The protected **My Books** page lists, edits, and removes books from the signed-in user's shelf. Books stay private unless their owner enables catalog sharing and sets available copies. Browse shared books, borrow from a book's details page, and manage active or returned loans on **My Borrows**.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quality checks and production

Run ESLint and create a production build:

```bash
npm run lint
npm run build
```

`npm run build` also runs the Next.js TypeScript check. To serve the built app with Node.js, run:

```bash
npm start
```

There is no separate frontend unit-test script in this repository.

## Deployment

For Vercel, import the `booknook-client` repository as a Next.js project using the repository root and the standard `npm run build` build command. Set `NEXT_PUBLIC_API_URL` to the public backend origin in the Vercel project environment settings for every deployment environment, then redeploy so the value is included in the build. No credentials belong in this public variable. On the backend, set `CLIENT_URL` to the exact deployed frontend origin and `BETTER_AUTH_URL` to the public backend origin. Configure the Google OAuth callback as `${BETTER_AUTH_URL}/api/auth/callback/google` when Google sign-in is enabled.

`NEXT_PUBLIC_API_URL` is public and must not contain credentials. Keep MongoDB and Better Auth secrets only in the backend environment. This repository has no provider-specific deployment configuration, and a production deployment has not been verified.

### Post-deployment verification

These are checks to perform after deploying; production behavior has not yet been verified:

- Open the homepage, then directly open and refresh `/catalog` and a valid `/books/<id>` URL.
- Confirm signed-out visits to `/my-books`, `/my-borrows`, and `/profile` redirect to login; sign in and confirm those pages load.
- Register and log in with a disposable test account. Confirm the browser's network requests use the configured backend origin and do not report CORS or authentication errors.
- Create, edit, and delete an owned book. Confirm another account cannot edit or delete it.
- Borrow a shared book; verify the available-copy count decreases and a second active borrow is rejected. Return the book and verify the count is restored.
- Confirm **My Books** and **My Borrows** show the expected records and history.

## Image hosting

Book image upload and image-hosting integration are not implemented. There is no image provider configured or image credential to add to this frontend.
