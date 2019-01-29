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

  produtos: ProdutoDTO[] = [];
  page: number = 0;
  elementsPerPage: number = 10;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public produtoService: ProdutoService,
     public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadProdutos();
  }

  loadProdutos(){
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoading();
    this.produtoService.findByCategorias(categoriaId,this.page,this.elementsPerPage).subscribe(response => {
      loader.dismiss();
      this.produtos = this.produtos.concat(response['content']);
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

  doRefresh(refresher) {
    this.page = 0;
    this.produtos = [];
    this.loadProdutos();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadProdutos();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
