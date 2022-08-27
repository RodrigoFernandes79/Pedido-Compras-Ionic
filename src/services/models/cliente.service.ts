import { ImageUtilService } from './../image-util.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dev_Config } from '../../config/dev.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from '../storage.service';






@Injectable()
export class ClienteService{

	constructor(public http:HttpClient, public storage: StorageService, public imageUtilService: ImageUtilService ){

	}

	findByEmail( email: string){
		return this.http.get(`${Dev_Config.baseUrl}/clientes/email?email=${email}`)

	}
	findById( id: string){
		return this.http.get(`${Dev_Config.baseUrl}/clientes/${id}`)

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
uploadPicture(picture){
	let imageBlob = this.imageUtilService.dataUriToBlob(picture)
	let formData :FormData = new FormData()

	formData.set('file',imageBlob,'file.png')

	return this.http.post(
		`${Dev_Config.baseUrl}/clientes/picture`,
		formData,
		{
				observe: 'response',
				responseType: 'json',

		}
);
}

}
