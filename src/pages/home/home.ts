import { CredenciaisDTO } from './../../app/models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	creds: CredenciaisDTO ={

		email:'',
		senha:''
	}

  constructor(public navCtrl: NavController, public menu: MenuController, public auth:AuthService) {

  }

	login(){
		this.auth.authenticate(this.creds)
		.subscribe(response=>{
			this.auth.sucessfullLogin(response.headers.get("Authorization"));
			this.navCtrl.setRoot('CategoriasPage')
		},
		error=>{})

	}

	ionViewWillEnter(): void {
		this.menu.swipeEnable(false);
		}

	ionViewDidLeave(): void {
		this.menu.swipeEnable(true);
		}
}
