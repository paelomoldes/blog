export async function onRequest({ env, next, request }) {
  try {
    return await next();
  } catch (e) {
    const status = 500;
    if (request.headers.get("x-api-key") == env.API_KEY) return new Response(`${e.message}\n${e.stack}`, { status });
    else return new Response(null, { status });
  }
}