import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HateoasInterceptor } from './interceptors/hateoas.interceptor';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: HateoasInterceptor },
    { provide: APP_INTERCEPTOR, useClass: NotFoundInterceptor },
  ],
})
export class CoreModule {}
