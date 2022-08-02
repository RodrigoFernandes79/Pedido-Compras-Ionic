import { CredenciaisDTO } from '../../models/credenciais.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

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

  constructor(public navCtrl: NavController, public menu: MenuController, public auth:AuthService,
		public alertCtrl: AlertController, public storage:StorageService) {

  }

	login(){
		this.auth.authenticate(this.creds)
		.subscribe(response=>{
			this.auth.sucessfullLogin(response.headers.get("Authorization"));
			this.navCtrl.setRoot('CategoriasPage')
		},
		error=>{

			const alert = this.alertCtrl.create({
				title: 'Erro 401! Falha na autenticação',
				subTitle: 'Email e/ou senha inválidos!',
				buttons: ['OK']
			});
			alert.present();
     console.log(error)

		})

	}
	ionViewDidEnter():void{
		if(this.storage.getLocalUser() !== null){
		this.auth.refreshToken()
		.subscribe(response=>{
			this.auth.sucessfullLogin(response.headers.get("Authorization"));
			this.navCtrl.setRoot('CategoriasPage')

		},
		error=>{

			const alert = this.alertCtrl.create({
				title: 'Erro 401! Falha na autenticação',
				subTitle: 'Email e/ou senha inválidos!',
				buttons: ['OK']
			});
			alert.present();
     console.log(error)
		})
	}
	}
	ionViewWillEnter(): void {
		this.menu.swipeEnable(false);
		}

	ionViewDidLeave(): void {
		this.menu.swipeEnable(true);
		}
}
