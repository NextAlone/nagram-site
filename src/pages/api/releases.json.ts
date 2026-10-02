import type { APIRoute } from 'astro';
import { getReleases } from '../../lib/releases';

export const GET: APIRoute = async () => Response.json(await getReleases());
