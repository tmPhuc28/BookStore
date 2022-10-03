import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { OrderDetailService } from '../../../../services/order-detail.service';
import { result } from 'lodash';
import AppUtil from '../../../../utilities/app-util';
import * as moment from 'moment';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  id: any;
  order: any = {
    addressReceive: '',
    id: '',
    phoneReceive: '',
    receiveName: '',
    total: 0,
    userId: '',
  };
  user: any = {
    fistName: '',
    lastName: '',
    phone: '',
    address: '',
  };
  orderDetails: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderDetail: OrderDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.getOrder();
    this.getDetail();
    this.getUser();
  }

  getOrder() {
    this.orderService
      .getOrder(AppUtil.toSnakeCaseKey(this.id))
      .subscribe((res) => {
        if (res.status === 200) {
          this.order.id = res.data.id;
          this.order.addressReceive = res.data.addressReceive;
          this.order.phoneReceive = res.data.phoneReceive;
          this.order.receiveName = res.data.receiveName;
          this.order.total = res.data.total;
          this.order.userId = res.data.userId;
        }
      });
  }

  getDetail() {
    this.orderDetail.getDetail(this.id).subscribe((res) => {
      if (res.status === 200) {
        this.orderDetails = res.data;
      }
    });
  }

  getUser() {
    let id = this.order.userId;
    this.userService.getUser(AppUtil.toSnakeCaseKey(id)).subscribe((res) => {
      if (res.status === 200) {
        this.user.fistName = res.data.fistName;
        this.user.lastName = res.data.lastName;
        this.user.phone = res.data.phone;
        this.user.address = res.data.address;
      }
    });
  }

  parseDate(date: any, format: string) {
    return moment(date).format(format);
  }
}
