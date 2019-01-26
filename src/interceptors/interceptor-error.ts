import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).catch((error,caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro capturado pelo interceptor");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                this.handlerError403();
                break;

                case 401:
                this.handlerError401();
                break;

                default:
                this. handlerDefaultError();
                break;

            }   
            return Observable.throw(errorObj);
        }) as any;
    }

    handlerError403(){
        this.storage.setLocalUser(null);
    }

    handlerError401(){
        let alert = this.alertCtrl.create({
            title: 'Erro na autenticação',
            message: 'Email e/ou senha inválido(s)',
            enableBackdropDismiss: false,
            buttons: [
                {
                text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handlerDefaultError(){
        let alert = this.alertCtrl.create({
            title: 'Ops... algo de errado ocorreu.',
            message: 'Tente novamente mais tarde',
            enableBackdropDismiss: false,
            buttons: [
                {
                text: 'OK'
                }
            ]
        });
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
