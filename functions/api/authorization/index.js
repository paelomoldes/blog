import { isAdmin } from '../../../inc/functions.js';

export function onRequestGet(context) {
  return Response.json(isAdmin(context));
}