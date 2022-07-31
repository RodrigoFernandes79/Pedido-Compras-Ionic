import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dev_Config } from '../../app/config/dev.config';
import { ClienteDTO } from '../../app/models/cliente.dto';
import { StorageService } from '../storage.service';


@Injectable()
export class ClienteService{

	constructor(public http:HttpClient, public storage: StorageService){

	}

	findByEmail( email: string):Observable<ClienteDTO>{

		let token = this.storage.getLocalUser().token
		let authHeader = new HttpHeaders({'Authorization':`Bearer ${token}`})

		return this.http.get<ClienteDTO>(`${Dev_Config.baseUrl}/clientes/email?email=${email}`,
		{'headers' : authHeader})

	}

	getImageFromBucket(id: string): Observable<any>{
		let url = `${Dev_Config.bucketBaseUrl}/cp${id}.jpg`;
		return this.http.get(url,{responseType: 'blob'});
	}
}
