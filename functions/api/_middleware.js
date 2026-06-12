import { getCookie } from '../../inc/functions.js';

export function onRequest({ request, next }) {
  const tokenX = request.headers.get('x-csrf-token'),
        tokenY = getCookie(context, 'csrf-token');
  if (tokenX && tokenY && tokenX == tokenY) return next();
  return new Response(null, { status: 403 });
}