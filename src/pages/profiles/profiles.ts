

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

	email:string;

  constructor(public navCtrl: NavController,
		 public navParams: NavParams,
		  public storageService: StorageService) {
  }

  ionViewDidLoad() {
		let LocalUser = this.storageService.getLocalUser();
    if(LocalUser  && LocalUser.email){
			this.email = LocalUser.email
		}
  }

}
