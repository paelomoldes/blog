export async function onRequestGet({ env, request }) {
  return Response.json(request.headers.get("x-api-key") != env.API_KEY);
}