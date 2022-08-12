import { Categoria } from './../../models/categoria';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/models/categoria.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

	items:Categoria[]=[]

  constructor(public navCtrl: NavController, public navParams: NavParams ,
		public catService:CategoriaService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('cat_id')
		this.catService.findById(categoria_id)
		.subscribe(response=>{

		this.items = response['content']
		console.log(this.items)
this.items.map((resposta)=> {
	this.items =resposta.produtos
	console.log(resposta.produtos)


})
return this.items


			})





		}


		}
