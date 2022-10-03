import { Component, OnInit } from '@angular/core';
import AppUtil from '../../../../utilities/app-util';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-user-cus-emp-list',
  templateUrl: './user-cus-emp-list.component.html',
  styleUrls: ['./user-cus-emp-list.component.css'],
})
export class UserCusEmpListComponent implements OnInit {
  usersList: any[] = [];
  loading: boolean = true;
  first: number = 0;
  totalPages: number = 0;
  totalRecords: number = 0;
  getParams = {
    pageSize: 10,
    pageNumber: 1,
  };
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  loadUsers(event: any) {
    this.loading = true;
    if (event) {
      this.first = event.first / event.rows;
      this.getParams.pageSize = event.rows;
    }
    this.getParams.pageNumber = this.first + 1;
    this.userService
      .getUsers(AppUtil.toSnakeCaseKey(this.getParams))
      .subscribe((res) => {
        if (res.status === 200) {
          this.usersList = res.data.content;
          this.totalRecords = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        } else {
          this.usersList = [];
          this.totalRecords = 0;
          this.totalPages = 0;
        }
        this.loading = false;
      });
  }

  parseStatus(status: any) {
    return `STATUS.${status}`;
  }
}
