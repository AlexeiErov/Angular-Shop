import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = 'Phone'
  cartProducts: Product[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/product.json`, product)
    .pipe(map((response : FbResponse) => {
      return{
        ...product,
        id: response.name,
        date: new Date(product.date)
      }
    }))
  } 

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/product.json`)
    .pipe(map(response => {
      return Object.keys(response)
      .map( key => ({
        ...response[key],
        id:key,
        date: new Date(response[key].date)
      }))
    }))
  }

  getById(id) {
    return this.http.get(`${environment.fbDbUrl}/product/${id}.json`)
    .pipe(map((response: Product )=> {
      return {
        ...response,
        id,
        date: new Date(response.date)
      }
    }))
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUrl}/product/${id}.json`)
  }

  update(product: Product) {
    return this.http.patch(`${environment.fbDbUrl}/product/${product.id}.json`, product)
  }

  setType(type) {
    this.type = type
  }

  addProduct(product) {
    this.cartProducts.push(product)
  } 
}
