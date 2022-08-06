import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoDTO } from './../../models/estado.dto';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
		 public cidadeService: CidadeService) {

		this.formGroup = this.formBuilder.group({
			nome:['Ex: João da Silva', [Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
			email:['Ex: Joao@mail.com',[Validators.required,Validators.email]],
			senha:['111',[Validators.required]],
			CpfOuCnpj:['23623364896',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
			telefone1:['36665954',[Validators.required]],
			telefone2:['',[]],
			telefone3:['',[]],
			logradouro:['Rua Tucunaré',[Validators.required]],
			numero:['22',[Validators.required]],
			complemento:['',[]],
			bairro:['',[]],
			cep:['25103625',[Validators.required]],
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
	 error =>{})
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
		console.log("form enviado")
	}
}


