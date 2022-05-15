import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { buildHateoasLinks, buildHateoasLinksForItem } from 'src/utils/hateoas';

@Injectable()
export class HateoasInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const hateoas = this.reflector.getAllAndOverride<{
      collectionWrapper: string;
    }>('hateoas', [context.getClass(), context.getHandler()]);

    if (!hateoas) {
      return next.handle();
    }

    return next
      .handle()
      .pipe(
        map((data) =>
          this.addHateoasLinks(data, context, hateoas.collectionWrapper),
        ),
      );
  }
  addHateoasLinks(
    data: any,
    context: ExecutionContext,
    collectionWrapper: string,
  ) {
    const { url } = context.getArgByIndex<{ url: string }>(0);

    const parsedData = Array.isArray(data)
      ? {
          [collectionWrapper]: data.map((item) => ({
            ...item,
            _links: buildHateoasLinksForItem(url, item.id),
          })),
        }
      : data;

    return {
      ...parsedData,
      _links: buildHateoasLinks({ self: url }),
    };
  }
}
