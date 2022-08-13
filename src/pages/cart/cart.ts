import { ProdutoService } from './../../services/models/produto.service';
import { StorageService } from './../../services/storage.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cartItem';

import { Dev_Config } from '../../config/dev.config';
import { CartService } from '../../services/models/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

	items:CartItem[]

  constructor(public navCtrl: NavController, public navParams: NavParams,
		public produtoService:ProdutoService, public cartService:CartService,
		public storageService:StorageService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart()
		this.items= cart.items
     console.log(cart)
		this.loadImageUrls()
  }

	loadImageUrls(){
		for(var i=0;i<this.items.length;i++){
			let item = this.items[i];

			this.produtoService.getImageFromBucket(item.produto.id)
			.subscribe(resposta=>{
				item.produto.imageUrl = `${Dev_Config.bucketBaseUrl}/prod${item.produto.id}.jpg`;
			},
			error=>{
		})
		}
}
removeItem(produto: ProdutoDTO) {
	this.items = this.cartService.removeProduto(produto).items;
}

increaseQuantity(produto: ProdutoDTO) {
	this.items = this.cartService.increaseQuantity(produto).items;
}

decreaseQuantity(produto: ProdutoDTO) {
	this.items = this.cartService.decreaseQuantity(produto).items;
}

total() : number {
	return this.cartService.total();
}

goOn(){
	this.navCtrl.setRoot('CategoriasPage')
}
}
