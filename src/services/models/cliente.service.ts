import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dev_Config } from '../../config/dev.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';






@Injectable()
export class ClienteService{

	constructor(public http:HttpClient, public storage: StorageService ){

	}

	findByEmail( email: string):Observable<ClienteDTO>{
		return this.http.get<ClienteDTO>(`${Dev_Config.baseUrl}/clientes/email?email=${email}`)

	}

	getImageFromBucket(id: string): Observable<any>{
		let url = `${Dev_Config.bucketBaseUrl}/cp${id}.jpg`;
		return this.http.get(url,{responseType: 'blob'});
	}

	insert(obj : ClienteDTO){
		return this.http.post(
				`${Dev_Config.baseUrl}/clientes`,
				obj,
				{
						observe: 'response',
						responseType: 'json',

				}
		);
}
}
