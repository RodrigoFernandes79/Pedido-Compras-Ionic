import { ProdutoService } from './../../services/models/produto.service';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {  ProdutoDTO } from '../../models/produto.dto';
import { Dev_Config } from '../../config/dev.config';



@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

	item:ProdutoDTO


  constructor(public navCtrl: NavController, public navParams: NavParams,
		 public produtoService: ProdutoService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
		let produto_id =this.navParams.get('prod_id')
    this.produtoService.findProdutosById(produto_id)
		.subscribe(response=>{
			this.item = response;
			this.ifImageurlExists()
			console.log(response)
		},
		error=>{const alert = this.alertCtrl.create({
			title: 'Erro ' +error.status+' Not found!',
			subTitle: error.error.error,
			buttons: ['OK']
		});
		alert.present();
		console.log(error);
		this.navCtrl.setRoot('ProdutosPage')
	})
	}

ifImageurlExists(){
	this.produtoService.getImageFromBucket(this.item.id)
	.subscribe(response=>{
		this.item.imageUrl = `${Dev_Config.bucketBaseUrl}/prod${this.item.id}.jpg`;
	},
	error=>{
})
}

}
