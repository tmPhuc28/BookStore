import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../../services/cart.service";
import {OrderService} from "../../../services/order.service";
import {OrderDetailComponent} from "../../../authenticated/admin/order/order-detail/order-detail.component";
import {OrderDetailService} from "../../../services/order-detail.service";
import AppUtil from "../../../utilities/app-util";
import AppConstant from "../../../utilities/app-constant";
import {ShowMessageService} from "../../../services/show-message.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  Items: any[] = [];
  formCheckOut: FormGroup = new FormGroup({})
  params: any = {
    pageNumber: 1,
    pageSize: 10
  }
  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private orderService: OrderService,
              private orderDetail: OrderDetailService,
              private showMessage: ShowMessageService) {
    this.formCheckOut = this.fb.group({
      receiveName: ['', Validators.required],
      phoneReceive: ['', Validators.required],
      addressReceive: ['', Validators.required],
      // total: [0]
    })
  }

  ngOnInit(): void {
    this.formCheckOut.setValue({
      receiveName: this.formCheckOut.value.receiveName,
      phoneReceive: this.formCheckOut.value.phoneReceive,
      addressReceive: this.formCheckOut.value.addressReceive,
      // total: this.getTotal()
    });
    this.getAllItem();
  }

  onSubmitCheckOut(){

    let params = {
      authToken: localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION),
      receiveName: this.formCheckOut.value.receiveName,
      phoneReceive: this.formCheckOut.value.phoneReceive,
      addressReceive: this.formCheckOut.value.addressReceive,
      total: this.getTotal()
    }
    this.orderService.newOrder(AppUtil.toSnakeCaseKey(params)).subscribe(
      res =>{
        if(res.status === 200){
          let orderId = res.data.id
          let id = res.data.userId
          this.cartService.getAllItems(id).subscribe(
            res1 => {
              if(res1.status === 200){

                console.log(res1 + "res1")
                let details = res1.data
                let paramDetails = [];
                for (let i = 0; i < details.length; i++){
                  let detail = {
                    orderId: orderId,
                    productId: details[i].productId,
                    quantity: details[i].quantity
                  }

                  paramDetails.push(detail)
                }
                this.orderDetail.createDetail(AppUtil.toSnakeCaseKey(paramDetails)).subscribe(
                  res2 => {
                    if(res2.status === 200){
                      this.cartService.removeAllCartItems().subscribe(
                        res3 => {
                          if (res3.status === 200) {
                            this.showMessage.showMessage('success', 'message.order_successfully')
                            this.getAllItem()
                            this.getTotal()
                            this.formCheckOut.reset()
                          }
                        }
                      )
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
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
}
