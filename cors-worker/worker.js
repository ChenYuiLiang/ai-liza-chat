export default {
  async fetch(req) {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }
    const url = new URL(req.url);
    const target = 'https://opencode.ai' + url.pathname + url.search;
    const headers = new Headers(req.headers);
    headers.set('host', 'opencode.ai');
    headers.delete('origin');
    const resp = await fetch(target, { method: req.method, headers, body: req.body });
    const newHeaders = new Headers(resp.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    return new Response(resp.body, { status: resp.status, headers: newHeaders });
  },
};
