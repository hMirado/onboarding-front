import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(
      () => {},
      (error: any) => {
        console.log(error);
        switch (error.status) {
          case 400:
            alert(error.error.message);
            break;
          case 409:
            alert("Information already exists in the database")
            break;
          default:
            alert(error.error.message)
            break;
        }
      }
    )
  );
};