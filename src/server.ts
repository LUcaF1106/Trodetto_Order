import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

const angularApp = new AngularAppEngine({ allowedHosts: ['*'] });

const handler = createRequestHandler(async (request: Request) => {
  return await angularApp.handle(request);
});

export default { fetch: handler };
