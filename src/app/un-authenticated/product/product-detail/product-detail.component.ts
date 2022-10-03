import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from 'src/app/services/products.service';
import {CartService} from "../../../services/cart.service";
import AppConstant from "../../../utilities/app-constant";
import AppUtil from "../../../utilities/app-util";
import {ShowMessageService} from "../../../services/show-message.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: any;
  isId: boolean = false;
  quantity: number = 1;
  product: any = {
    productName: '',
    productImage: '',
    author: '',
    price: '',
    quantity: '',
    manufacture: '',
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private showMessage: ShowMessageService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION)?this.isId=true:this.isId=false
    this.getDetail();
  }

  getDetail() {
    this.productService.getProduct(this.id).subscribe((res) => {
      if (res.status === 200) {
        this.product = res.data;
      }
    });
  }

  addToCart(productId: any) {
    let params = {
      authToken: localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION),
      productId: productId,
      quantity: this.quantity
    }
    if(params.quantity > 0){
      this.cartService.addToCart(AppUtil.toSnakeCaseKey(params)).subscribe(
        res => {
          if (res.status === 200) {
            this.showMessage.showMessage('success', 'message.add_cart_success')
            this.router.navigate(['/']).then(r => {
            })
          } else {
            this.showMessage.showMessage('error', 'message.add_cart_error')
          }
        }
      );
    }else {
      this.showMessage.showMessage('success', 'message.quantity<0')
    }
  }
}
