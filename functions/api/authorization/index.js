export function onRequestGet({ env, request }) {
  return Response.json(request.headers.get("cookie").split('; ').find((row) => row.startsWith('__Http-Authorization='))?.split('=')[1] == env.API_KEY);
}