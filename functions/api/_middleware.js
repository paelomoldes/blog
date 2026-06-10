export function onRequest({ request, next }) {
  if (request.headers.get('x-csrf-token') != request.headers.get("cookie").split('; ').find((row) => row.startsWith('__Secure-csrf-token='))?.split('=')[1]) return new Response(null, { status: 403 });
  return next();
}