import { HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("Request arrived");
        console.log(req.url);
        console.log(req.headers);
        return next.handle(req).pipe(tap(event => {
            if(event.type === HttpEventType.Response){
                console.log('Response arrived, body data:');
                console.log(event.body);
            }
        }));

    }
}