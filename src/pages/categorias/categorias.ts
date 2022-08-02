

import { Dev_Config } from '../../config/dev.config';

import { CategoriaService } from './../../services/models/categoria.service';
import { Component,  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';


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
		 public categoriaService: CategoriaService, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
		.subscribe(response => {
			this.items = response;
			console.log(response)
		},
		error =>{
			const alert = this.alertCtrl.create({
				title: 'Erro ' +error.status+' Not found!',
				subTitle: 'Não Encontrado',
				buttons: ['OK']
			});
			alert.present();
			console.log(error);

		}
	);
}
}




