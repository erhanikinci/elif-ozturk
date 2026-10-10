import handler from 'vinext/server/fetch-handler';

export default {
  async fetch(request: Request, env: Record<string, unknown>, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.hostname === 'www.elifozturk.av.tr') {
      url.hostname = 'elifozturk.av.tr';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    // Only the public page source is exported; there are no database bindings,
    // sign-in mocks, private records or appointment endpoints in this Worker.
    const response = await handler.fetch(request, env, ctx);
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  },
};
