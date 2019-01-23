import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/Credenciais.dto';
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

  login(){
    this.auth.authenticate(this.creds).subscribe(response => {
      console.log(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

}
