import { ClienteService } from './../../services/models/cliente.service';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeService } from '../../services/models/cidade.service';
import { EstadoService } from '../../services/models/estado.service';




@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	formGroup:FormGroup
	estados:EstadoDTO
	cidades:CidadeDTO


  constructor(public navCtrl: NavController, public navParams: NavParams,
		 public formBuilder:FormBuilder, public estadoService:EstadoService,
		 public cidadeService: CidadeService, public clienteService:ClienteService,
		 public alertCtrl: AlertController) {

		this.formGroup = this.formBuilder.group({
			nome:['Fujiro Kujikawa', [Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
			email:['kujikawa@mail.com',[Validators.required,Validators.email]],
			tipo : ['1', [Validators.required]],
			senha:['1187',[Validators.required]],
			cpfOuCnpj:['02704479461',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
			telefone1:['996356987',[Validators.required]],
			telefone2:['',[]],
			telefone3:['',[]],
			logradouro:['Rua Jirayame',[Validators.required]],
			numero:['242',[Validators.required]],
			complemento:['702',[]],
			bairro:['Jaspomesa',[]],
			cep:['51098563',[Validators.required]],
			estadoId:[null,[Validators.required]],
			cidadeId:[null,Validators.required]

		})
	}

  ionViewDidLoad() {
   this.estadoService.findAll()
	 .subscribe(response =>{
		console.log(response)
		this.estados = response
		this.formGroup.controls.estadoId.setValue(this.estados[0].id);
		this.updateCidades()

	 },
	 error =>{

	 })
  }


	updateCidades() {
		let estado_id = this.formGroup.value.estadoId;
		this.cidadeService.findAll(estado_id)
		.subscribe(response =>{
			console.log(response)
			this.cidades =response;

		},
		error =>{})
	}
	signupUser(){
		console.log(this.formGroup.value)
		this.clienteService.insert(this.formGroup.value)
		.subscribe(response=>{
		this.showInsertOk();

		},
		error=>{
			console.log(error)
if(error.error.mensagem==='cpfOuCNPJ  já existe'){
			let alert = this.alertCtrl.create({
				title: 'Erro '+ error.status+ ' !',
				message:"Erro na Validação! "+ error.error.mensagem,
				enableBackdropDismiss: false,
				buttons: ['Ok']
			});
			alert.present();
		}
		else{
			let alert = this.alertCtrl.create({
				title: 'Erro '+ error.status+ ' !',
				message:"Erro na Validação! "+ error.error.erro,
				enableBackdropDismiss: false,
				buttons: ['Ok']
			});
			alert.present();
		}

	})
	}

showInsertOk() {
	let alert = this.alertCtrl.create({
		title: 'Sucesso!',
		message: 'Cadastro efetuado com sucesso',
		enableBackdropDismiss: false,
		buttons: [
			{
				text: 'Ok',
				handler: () => {
					this.navCtrl.setRoot('HomePage');
				}
			}
		]
	});
	alert.present();
}

}

