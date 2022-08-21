import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/models/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cartItem';
import { PedidoDTO } from '../../models/pedido.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/models/cliente.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

	pedido: PedidoDTO
	cartItems:CartItem[]
	cliente: ClienteDTO
	endereco: EnderecoDTO

  constructor(public navCtrl: NavController, public navParams: NavParams,
		public CartService: CartService, public clienteService:ClienteService) {

		this.pedido = this.navParams.get('pedido')
  }

  ionViewDidLoad() {
    this.cartItems = this.CartService.getCart().items

		this.clienteService.findById(this.pedido.cliente.id)
		.subscribe(response => {
			this.cliente = response as ClienteDTO
			this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id,response['enderecos'])
		},
		error =>{
			this.navCtrl.setRoot('HomePage')
		}
		);
  }

private findEndereco(id:string, list:EnderecoDTO[]):EnderecoDTO {
	let position = list.findIndex(x=> x.id === id)
	return list[position]
}
total(){
return this.CartService.total()
}
}
