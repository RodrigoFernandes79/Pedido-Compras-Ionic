import { ClienteDTO } from '../../models/cliente.dto';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/models/cliente.service';
import { Dev_Config } from '../../config/dev.config';



@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

	cliente : ClienteDTO

  constructor(public navCtrl: NavController,
		 public navParams: NavParams,
		  public storageService: StorageService,
			public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
		let localUser = this.storageService.getLocalUser();
    if(localUser  && localUser.email){
			this.clienteService.findByEmail(localUser.email)
			.subscribe(response =>{
				this.cliente = response as ClienteDTO;
				this.clienteService.getImageFromBucket(this.cliente.id)
				.subscribe(response =>{
					this.cliente.imageUrl = `${Dev_Config.bucketBaseUrl}/cp${this.cliente.id}.jpg`
				}),
				error=>{}

			}),
			error=>{}
			}
		}

	}




