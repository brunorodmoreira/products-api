import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';
import { RecordNotFoundInterceptor } from './interceptors/record-not-found.interceptor';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: NotFoundInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useClass: RecordNotFoundInterceptor,
    },
  ],
})
export class CoreModule {}
