import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dev_Config } from '../app/config/dev.config';
import { CredenciaisDTO } from '../app/models/credenciais.dto';

@Injectable()
export class AuthService{

	constructor(public http:HttpClient){

	}

	authenticate(creds:CredenciaisDTO){

		return this.http.post(`${Dev_Config.baseUrl}/login`,creds,{observe:'response',responseType:'text'});
	}
}
