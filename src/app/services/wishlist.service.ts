import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { wishlistUrl } from 'src/app/config/api';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http : HttpClient) { }

  getWishList() {
    return this.http.get(wishlistUrl).pipe(
      map((result: any[]) => {
        let productIds = []

        result.forEach(item => productIds.push(item.id))

        return productIds;
      })
    )
  }

  addToWishList(productId) {
    return this.http.post(wishlistUrl, {id : productId})
  }

  removeFromWishList(productId) {
    return this.http.delete(wishlistUrl + '/' + productId);
  }
}
