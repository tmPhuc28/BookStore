import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import AppUtil from 'src/app/utilities/app-util';
import AppConstant from "../../../utilities/app-constant";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  getParams: any = {
    pageNumber: 1,
    pageSize: 10,
  };
  isLogin: boolean = false;
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.isLogin = localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION)?true:false
    this.getProducts();
    console.log(this.isLogin)
  }

  getProducts() {
    this.productService
      .getProducts(AppUtil.toSnakeCaseKey(this.getParams))
      .subscribe((res) => {
        if (res.status === 200) {
          this.products = res.data.content;
        }
      });
  }
}
