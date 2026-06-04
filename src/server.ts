import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

(AngularAppEngine as any)['ɵdisableAllowedHostsCheck'] = true;

const angularApp = new AngularAppEngine({
  allowedHosts: ['*'],
  trustProxyHeaders: true,
} as any);

const handler = createRequestHandler(async (request: Request) => {
  return await angularApp.handle(request);
});

export default { fetch: handler };
