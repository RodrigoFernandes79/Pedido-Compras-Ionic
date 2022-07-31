

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev_Config } from '../../config/dev.config';



import { CategoriaDTO } from '../../models/categoria.dto';


@Injectable()
export class CategoriaService{



	constructor(public http:HttpClient){
	}

		findAll(): Observable<CategoriaDTO>{
			return this.http.get<CategoriaDTO>(`${Dev_Config.baseUrl}/categorias`);
		}


}
