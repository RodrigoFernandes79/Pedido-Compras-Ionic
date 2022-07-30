import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dev_Config } from '../app/config/dev.config';
import { CredenciaisDTO } from '../app/models/credenciais.dto';
import { LocalUser } from '../app/models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService{

	constructor(public http:HttpClient, public storage: StorageService){

	}

	authenticate(creds:CredenciaisDTO){

		return this.http.post(`${Dev_Config.baseUrl}/login`,creds,{observe:'response',responseType:'text'});
	}

	sucessfullLogin(authorizationValue : string){
		let tok = authorizationValue.substring(7)
		let user : LocalUser ={
			token : tok
		}
	 this.storage.setLocalUser(user)
	}

	logout(){
		this.storage.setLocalUser(null)
	}
}
