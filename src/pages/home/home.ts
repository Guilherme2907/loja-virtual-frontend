import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController,public menuCtrl: MenuController,public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menuCtrl.swipeEnable(true)
  }

  ionViewDidEnter(){
    this.auth.refreshToken().subscribe(response => {
      this.auth.successfulAuth(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  login(){
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulAuth(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  } 
}
