import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let headers = new HttpHeaders({
    "Accept": "Application/json",
    "Authorization": "Bearer ",
    "ngrok-skip-browser-warning": "any value",
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  });

  const httpRequest = req.clone({ headers });
  return next(httpRequest);
};