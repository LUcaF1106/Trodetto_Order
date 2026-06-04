import { AngularAppEngine } from '@angular/ssr';

const angularApp = new AngularAppEngine();

export default {
  async fetch(request: Request): Promise<Response> {
    const response = await angularApp.handle(request, {
      server: { trustProxyHeaders: true }
    });
    return response ?? new Response('Not found', { status: 404 });
  },
};
