export async function onRequestGet({ next }) {
  const response = (await next()).clone();
  response.headers.set('cache-control', 'public, max-age=31536000, immutable');
  return response;
}