import { Dev_Config } from './../../config/dev.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { ProdutoDTO } from '../../models/produto.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ProdutoService{

	constructor(public http:HttpClient){


	}
	findProdutosById(produto_id:string):Observable<ProdutoDTO>{
		return this.http.get<ProdutoDTO>(`${Dev_Config.baseUrl}/produtos/${produto_id}`);
	}

	getImageFromBucket(id: string): Observable<any>{
		let url = `${Dev_Config.bucketBaseUrl}/prod${id}.jpg`;
		return this.http.get(url,{responseType: 'blob'});
	}
}
