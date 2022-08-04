import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	formGroup:FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {

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
    console.log('ionViewDidLoad SignupPage');
  }
	signupUser(){
		console.log("form enviado")
	}
}
