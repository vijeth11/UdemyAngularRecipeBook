import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators'
export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        // add if check with req.url so that it can be restricted to certain requests
        //console.log("request is on its way");
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth','xyz')
        });
        return next.handle(modifiedRequest);
        /*return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log('Response arrived, body data:');
                console.log(event.body);
            }
        }));*/
    }
}