import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";




@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient,public storage: StorageService){

    }

    authenticate(creds: CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
        creds,
        {
        observe : 'response',
        responseType: 'text'
        });
    }

    successfulAuth(token: string){
        let tok = token.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        }
        this.storage.setLocalUser(user);
    }

    refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{},
        {
        observe : 'response',
        responseType: 'text'
        });
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}