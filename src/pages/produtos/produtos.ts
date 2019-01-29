import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produtos: ProdutoDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public produtoService: ProdutoService,
     public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoading();
    this.produtoService.findByCategorias(categoriaId).subscribe(response => {
      loader.dismiss();
      this.produtos = response['content'];
    },
    error => {
      loader.dismiss();
    });
  }

  showDetail(produtoId: string){
    this.navCtrl.push('ProdutoDetailPage',{produtoId : produtoId});
  }

  
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
