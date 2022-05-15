import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class RecordNotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            return throwError(() => new NotFoundException(e.meta.cause));
          }
        }

        return throwError(() => e);
      }),
    );
  }
}
