import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { buildHateoasLinks, buildHeatoasLinksForItem } from 'src/utils/hateoas';

@Injectable()
export class HateoasInterceptor implements NestInterceptor {
  constructor(private collectionWrapper: string = 'items') {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => this.addHateoasLinks(data, context)));
  }
  addHateoasLinks(data: any, context: ExecutionContext) {
    const { url } = context.getArgByIndex<{ url: string }>(0);

    const parsedData = Array.isArray(data)
      ? {
          [this.collectionWrapper]: data.map((item) => ({
            ...item,
            _links: buildHeatoasLinksForItem(url, item.id),
          })),
        }
      : data;

    return {
      ...parsedData,
      _links: buildHateoasLinks({ self: url }),
    };
  }
}
