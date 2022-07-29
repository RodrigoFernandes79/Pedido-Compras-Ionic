import { Dev_Config } from './../../app/config/dev.config';

import { CategoriaService } from './../../services/models/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../app/models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

	items: CategoriaDTO;
	bucketUrl:string = Dev_Config.bucketBaseUrl;

  constructor(public navCtrl: NavController,
		 public navParams: NavParams,
		 public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
		.subscribe(response => {
			this.items = response;
			console.log(response)
		},
		error =>{console.log(error)
	});
}

}
