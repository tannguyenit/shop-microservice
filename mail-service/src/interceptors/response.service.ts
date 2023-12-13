import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode
        let status = false;
        if (statusCode >= 200 && statusCode < 300) {
          status = true;
        }
        return {
          status,
          message: data?.message || '',
          data: data,
        }
      }
    ))
  }
}
