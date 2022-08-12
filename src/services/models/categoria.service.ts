

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev_Config } from '../../config/dev.config';
import { Categoria } from '../../models/categoria';



import { CategoriaDTO } from '../../models/categoria.dto';


@Injectable()
export class CategoriaService{



	constructor(public http:HttpClient){
	}

		findAll(): Observable<CategoriaDTO>{
			return this.http.get<CategoriaDTO>(`${Dev_Config.baseUrl}/categorias`);
		}

		findById(categoria_id:string):Observable<Categoria>{
			return this.http.get<Categoria>(`${Dev_Config.baseUrl}/categorias/pages/${categoria_id}`)
		}

		getSmallImageFromBucket(id: string): Observable<any>{
			let url = `${Dev_Config.bucketBaseUrl}/prod${id}-small.jpg`;
			return this.http.get(url,{responseType: 'blob'});
		}
}
