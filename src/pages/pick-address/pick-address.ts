import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/models/cart.service';
import { ClienteService } from '../../services/models/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

	items:EnderecoDTO[]
	pedido:PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams,
		public storageService:StorageService, public clienteService:ClienteService,
		public cartService:CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser  && localUser.email){
			this.clienteService.findByEmail(localUser.email)
			.subscribe(response =>{
			this.items = response['enderecos']

			let cart = this.cartService.getCart()

			this.pedido ={
				cliente : {id:response['id']},
				enderecoDeEntrega: null,
				pagamento: null,
				itens: cart.items.map(x=>{return{quantidade: x.quantidade , produto:{id: x.produto.id}}})
			}


			},
			error=>{}
			);
			}
  }
	nextPage(item:EnderecoDTO){
		this.pedido.enderecoDeEntrega = {id: item.id};
		console.log(this.pedido)
	}
  }


