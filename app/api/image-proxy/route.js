// /app/api/image-proxy/route.js
import fetch from 'node-fetch';

export async function GET(req) {
    const url = new URL(req.url);
    const imageUrl = url.searchParams.get('url');

    if (!imageUrl) {
        return new Response('No URL provided', { status: 400 });
    }

    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return new Response(`Failed to fetch image: ${response.statusText}`, { status: response.status });
        }

        const contentType = response.headers.get('Content-Type');
        return new Response(response.body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
export const dynamic = 'auto'