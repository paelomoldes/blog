export async function onRequestPost({ request }) {
  return new Response(null, { status: 204, headers: { 'set-cookie': `__Http-Authorization=; Domain=paelo.pages.dev; Max-Age=0; Path=/api` } });
}