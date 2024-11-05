import app from "./app";

Bun.serve({
  port: Bun.env.PORT!,
  fetch: app.fetch,
});

console.log(`Server running on http://localhost:${Bun.env.PORT!}`);
