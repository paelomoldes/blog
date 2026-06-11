export function onRequest({ request, next }) {
  const tokenX = request.headers.get('x-csrf-token'),
        tokenY = request.headers.get('cookie')?.split('; ').find((row) => row.startsWith('csrf-token='))?.split('=')[1];
  if (tokenX && tokenY && tokenX == tokenY) return next();
  return new Response(null, { status: 403 });
}