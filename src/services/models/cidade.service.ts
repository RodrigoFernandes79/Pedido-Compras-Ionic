
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev_Config } from '../../config/dev.config';

import { CidadeDTO } from '../../models/cidade.dto';


@Injectable()
export class CidadeService{



	constructor(public http:HttpClient){
	}

		findAll(estado_id:string): Observable<CidadeDTO>{
			return this.http.get<CidadeDTO>(`${Dev_Config.baseUrl}/estados/${estado_id}/cidades`);
		}


}
