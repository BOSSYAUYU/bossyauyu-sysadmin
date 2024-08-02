export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = await request.formData();

  const baseURL = process.env.API_URL;

  return fetch(baseURL + url.pathname.replace(/^\/api\/upload/, ''), {
    method: 'POST',
    body,
  });
}
