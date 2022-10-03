import { Component, OnInit } from '@angular/core';
import AppUtil from "../../../../utilities/app-util";
import { OrderService } from "../../../../services/order.service";
import * as moment from "moment";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderList: any[] = [];
  getParams = {
    pageNumber: 1,
    pageSize: 10
  }
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder(){
    this.orderService.getOrders(AppUtil.toSnakeCaseKey(this.getParams)).subscribe(
      res => {
        if(res.status === 200){
          this.orderList = res.data.content;
        }
      }
    )
  }

  parseDate(date: any, format: string){
    return moment(date).format(format);
  }
}
