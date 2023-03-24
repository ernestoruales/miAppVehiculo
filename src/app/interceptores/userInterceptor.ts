import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    private keyUser:string="user-request";
    private user:string="ernesto.ruales";

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let resqNew = req.clone({
            headers: req.headers.append(this.keyUser, this.user)
        });
        return next.handle(resqNew);
    }
    
}
