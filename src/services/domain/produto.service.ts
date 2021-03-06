import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";


@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){

    }

    findByCategorias(categoriaId: string,page: number,elementsPerPage: number) : Observable<ProdutoDTO []> {
        return this.http.get<ProdutoDTO []>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoriaId}&page=${page}&elementsPerPage=${elementsPerPage}`);
    }

    findById(produtoId: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
    }

}