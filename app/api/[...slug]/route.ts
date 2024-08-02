export async function POST(request: Request) {
  const url = new URL(request.url);
  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = {};
  }

  const baseURL = process.env.API_URL;

  return fetch(baseURL + url.pathname.replace(/^\/api/, ''), {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify(body || {}),
  });
}
