# Lab4 Local (In-memory)

This is a local in-memory implementation of the Lab4 product manager so you can run and test the UI without AWS.

Quick start:

1. Install dependencies:

```
npm install
```

2. Run server:

```
npm start
```

Open http://localhost:3000 to access the app.

Setup secrets for development:

1. Copy `.env.example` to `.env` and edit values:

```
SESSION_SECRET=your_session_secret_here
ADMIN_PW=admin123
STAFF_PW=staff123
```

2. Start the server:

```
npm start
```

Notes:
- Do NOT commit your `.env` file — it is included in `.gitignore`.
- If you don't provide passwords via environment variables, the app will generate temporary passwords on first run and print them to the console (dev-only).
- Images uploaded are stored in `uploads/` (this folder is ignored by git).

