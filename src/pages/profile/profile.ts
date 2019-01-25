import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/cliente.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let user = this.storage.getLocalUser();
    if(user && user.email){
      this.clienteService.findByEmail(user.email).subscribe(response => {
        this.cliente = response;
      },
      error => {});
    }
  }
}
