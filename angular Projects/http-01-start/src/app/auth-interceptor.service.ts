import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        // add if check with req.url so that it can be restricted to certain requests
        console.log("request is on its way");
        return next.handle(req);
    }
}