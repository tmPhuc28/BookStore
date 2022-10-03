import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import AppUtil from "../../../utilities/app-util";
import {FormBuilder, FormGroup} from "@angular/forms";
import {result} from "lodash";
import {ShowMessageService} from "../../../services/show-message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  Items: any[] = [];
  quantity: any;
  params = {
    pageNumber: 1,
    pageSize: 10
  }
  formCart: FormGroup = new FormGroup({});
  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private showMessage: ShowMessageService,
              private router: Router) {
    this.formCart = this.fb.group({
      quantity: [0]
    })
  }

  ngOnInit(): void {
    this.getAllItem();
  }

  getAllItem(){
    this.cartService.getAllCartItems(AppUtil.toSnakeCaseKey(this.params)).subscribe(
      res =>{
        if(res.status === 200){
          this.Items = res.data.content
        }
      }
    )
  }

  getTotal(){
    let total = 0;
    for (let i = 0; i < this.Items.length; i++){
      total += (this.Items[i].quantity * this.Items[i].price);
    }
    return total;
  }

  removeItem(id: any){
    this.cartService.removeCartItem(id).subscribe(
      res =>{
        if(res.status === 200){
          this.showMessage.showMessage('success', 'message.remove_item_success')
          this.getAllItem();
        } else
        this.showMessage.showMessage('error', 'message.remove_item_error')
      }
    )
  }
}
