
import { Dev_Config } from './../../config/dev.config';
import { Categoria } from './../../models/categoria';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../services/models/categoria.service';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

	items:Categoria[]=[]

  constructor(public navCtrl: NavController, public navParams: NavParams ,
		public catService:CategoriaService, public alertCtrl:AlertController,
		public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('cat_id')
		let loader = this.presentLoading()
		this.catService.findById(categoria_id)
		.subscribe(response=>{

		this.items = response['content']

	this.items.map((resposta)=> {
	this.items =resposta.produtos
	this.loadImageUrls()

	}
	)
	loader.dismiss()
},
error=>{
	loader.dismiss()
})
}

loadImageUrls(){
	for(var i=0;i<this.items.length;i++){
		let item = this.items[i];

		this.catService.getSmallImageFromBucket(item.id)
		.subscribe(resposta=>{
			item.imageUrl = `${Dev_Config.bucketBaseUrl}/prod${item.id}-small.jpg`;
		},
		error=>{
	})
	}

}


showDetails(produto_id:string){
	this.navCtrl.push('ProdutoDetailPage',{prod_id:produto_id})
}

presentLoading() {
	const loader = this.loadingCtrl.create({
		content: "Aguarde um momento...",

	});
	loader.present();
	return loader
}

		}
