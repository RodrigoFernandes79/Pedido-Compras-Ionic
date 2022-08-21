import { Dev_Config } from './../../config/dev.config';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoDTO } from '../../models/pedido.dto';



@Injectable()
export class PedidoService{



	constructor(public http:HttpClient){
	}

	insert(obj:PedidoDTO){
		return this.http.post(
			`${Dev_Config.baseUrl}/pedidos`,
			obj,
			{
				observe:'response',
				responseType: 'text'
			}
		)
	}
}
