import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { RouterModule } from '@angular/router';
import { appConfig } from './app.config';
import { routes } from './app.routes';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
    ),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
