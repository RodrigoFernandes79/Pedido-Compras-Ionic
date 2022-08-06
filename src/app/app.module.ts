import { CategoriaService } from './../services/models/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {  AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/models/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstadoService } from '../services/models/estado.service';
import { CidadeService } from '../services/models/cidade.service';


@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
		HttpClientModule,
    IonicModule.forRoot(MyApp),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
		CategoriaService,
		AuthInterceptorProvider,
		AuthService,
		StorageService,
		ClienteService,
		EstadoService,
		CidadeService,
  ]
})
export class AppModule {}
