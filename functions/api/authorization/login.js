export async function onRequestPost({ request }) {
  return new Response(null, { status: 204, headers: { 'set-cookie': `__Http-Authorization=${ await request.text() }; Domain=paelo.pages.dev; HttpOnly; Path=/api; Secure` } });
}