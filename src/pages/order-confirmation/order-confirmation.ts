import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/models/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cartItem';
import { PedidoDTO } from '../../models/pedido.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/models/cliente.service';
import { PedidoService } from '../../services/models/pedido.service';


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

	codigoPedido:string

  constructor(public navCtrl: NavController, public navParams: NavParams,
		public CartService: CartService, public clienteService:ClienteService,
		public pedidoService: PedidoService) {

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

checkout() {
this.pedidoService.insert(this.pedido)
.subscribe(response => {
	this.CartService.createOrClearCart()
	this.codigoPedido = this.extractId(response.headers.get('location'))
	console.log(response.headers.get('location'))
},
error=>{
	console.log(error)
	this.navCtrl.setRoot('HomePage')
})
}
backPage(){
	this.navCtrl.setRoot('CartPage')
}
home(){
	this.navCtrl.setRoot('CategoriasPage')
}
//função para extrair o id do pedido
private extractId(location:string): string{
	let position = location.lastIndexOf('/')
	return location.substring(position +1 ,location.length)

}
}
