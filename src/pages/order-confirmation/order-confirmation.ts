import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { CartItem } from '../../models/cart-item';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { PedidoService } from '../../services/domain/pedido.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  cartItems: CartItem[];
  codPedido: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoEntrega.id,response['enderecos']);
      this.cartItems = this.cartService.getCart().items;
    })
  }

  private findEndereco(id: string,list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(endereco => endereco.id == id);
    return list[position];
  }

  total(){
    return this.cartService.valorTotal();
  }

  checkout(){
    this.pedidoService.insert(this.pedido).subscribe(response => {
      this.cartService.createOrClearCart();
      this.codPedido = this.findCodPedido(response.headers.get('location'));
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    })
  }

  private findCodPedido(location: string) {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1,location.length);
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

}
