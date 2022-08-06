
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dev_Config } from '../../config/dev.config';
import { EstadoDTO } from '../../models/estado.dto';






@Injectable()
export class EstadoService{



	constructor(public http:HttpClient){
	}

		findAll(): Observable<EstadoDTO>{
			return this.http.get<EstadoDTO>(`${Dev_Config.baseUrl}/estados`);
		}


}
