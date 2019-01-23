import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/Credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController,public menuCtrl: MenuController) {

  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menuCtrl.swipeEnable(true)
  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

}
