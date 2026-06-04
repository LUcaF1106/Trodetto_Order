import { AngularAppEngine } from '@angular/ssr';

const angularApp = new AngularAppEngine();

export default {
  async fetch(request: Request): Promise<Response> {
    // Rimuove l'header host che causa problemi con AngularAppEngine
    const headers = new Headers(request.headers);
    headers.delete('host');

    const newRequest = new Request(request.url, {
      method: request.method,
      headers,
      body: request.body,
      redirect: request.redirect,
    });

    const response = await angularApp.handle(newRequest);
    return response ?? new Response('Not found', { status: 404 });
  },
};
