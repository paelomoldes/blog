export async function onRequest(context) {
  try {
    return await context.next();
  } catch (e) {
    return new Response(null, { status: 500 });
  }
}