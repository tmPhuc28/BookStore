import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../../services/products.service";
import AppUtil from "../../../../utilities/app-util";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: any[] = [];
  totalRecords: number = 0;
  totalPages: number = 0;
  loading: boolean = true;
  first: number = 0;
  getParams = {
    pageSize: 10,
    pageNumber: 1
  }
  constructor(private productService: ProductsService) {}


  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.productService.getProducts(AppUtil.toSnakeCaseKey(this.getParams)).subscribe(
      res => {
        if(res.status === 200){
          this.productList = res.data.content;
          this.totalPages = res.data.totalPages;
          this.totalRecords = res.data.totalRecords;
        }
      }
    )
  }

  loadProducts(event: any) {
    this.loading = true;
    if (event) {
      this.first = event.first / event.rows;
      this.getParams.pageSize = event.rows;
    }
    this.getParams.pageNumber = this.first + 1;
    this.productService
      .getProducts(AppUtil.toSnakeCaseKey(this.getParams))
      .subscribe((res) => {
        if (res.status === 200) {
          this.productList = res.data.content;
          this.totalRecords = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        } else {
          this.productList = [];
          this.totalRecords = 0;
          this.totalPages = 0;
        }
        this.loading = false;
      });
  }

  parseStatus(status: any){
    return `STATUS.${status}`
  }
}
