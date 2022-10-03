import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { UserService } from '../../../../services/user.service';
import AppUtil from '../../../../utilities/app-util';
import {ConfirmationService, MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ShowMessageService} from "../../../../services/show-message.service";

@Component({
  selector: 'app-user-cus-emp-form',
  templateUrl: './user-cus-emp-form.component.html',
  styleUrls: ['./user-cus-emp-form.component.css'],
})
export class UserCusEmpFormComponent implements OnInit {
  id: any;
  formUser: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private showMessageService: ShowMessageService
  ) {
    this.formUser = this.fb.group({
      fistName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      gender: [false],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      status: [false],
      role: [false],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();

    if (this.id) {
      this.userService.getUser(this.id).subscribe((res) => {
        if (res.status === 200) {
          this.formUser.setValue({
            fistName: res.data.fistName,
            lastName: res.data.lastName,
            userName: res.data.userName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            password: res.data.passwordHash,
            gender: res.data.gender === 'MALE' ? true : false,
            address: res.data.address,
            dob: res.data.dob,
            status: res.data.status === 'ACTIVE' ? true : false,
            role: res.data.role === 'ADMIN' ? true : false,
          });
        }
      });
    }
  }

  initForm() {
    this.formUser.setValue({
      fistName: this.formUser.value.fistName,
      lastName: this.formUser.value.lastName,
      userName: this.formUser.value.userName,
      email: this.formUser.value.email,
      phoneNumber: this.formUser.value.phoneNumber,
      password: this.formUser.value.password,
      gender: this.formUser.value.gender,
      address: this.formUser.value.address,
      dob: this.formUser.value.dob,
      status: this.formUser.value.status,
      role: this.formUser.value.role,
    });
  }

  onSubmitForm() {
    let params = {
      fistName: this.formUser.value.fistName,
      lastName: this.formUser.value.lastName,
      userName: this.formUser.value.userName,
      email: this.formUser.value.email,
      phoneNumber: this.formUser.value.phoneNumber,
      passwordHash: CryptoJS.MD5(this.formUser.value.password).toString(),
      gender: this.formUser.value.gender ? 'MALE' : 'FEMALE',
      address: this.formUser.value.address,
      dob: moment(this.formUser.value.dob).format('YYYY-MM-DD'),
      status: this.formUser.value.status ? 'ACTIVE' : 'IN_ACTIVE',
      role: this.formUser.value.role ? 'ADMIN' : 'CUSTOMER',
    };

    if (this.id) {
      this.userService
        .updateUser(this.id, AppUtil.toSnakeCaseKey(params))
        .subscribe((res) => {
          if (res.status === 200) {
            this.showMessageService.showMessage('success', 'message.update_user_success')
            this.router.navigate(["/admin/user/"])
          }else {
            this.showMessageService.showMessage('error', 'message.update_user_error')
            this.router.navigate(["/admin/user/"])
          }
        });
    } else {
      this.userService
        .createUser(AppUtil.toSnakeCaseKey(params))
        .subscribe((res) => {
          if(res.status === 200){
            this.showMessageService.showMessage('success', 'message.add_user_success')
            this.router.navigate(['/admin/user/'])
          }else {
            this.showMessageService.showMessage('error', 'message.add_user_error')
            this.router.navigate(['/admin/user/'])
          }
        });
    }
  }

  onDelete(){
    if(this.id){
      this.confirmationService.confirm({
        message: AppUtil.translate(
          this.translateService,
          'message.delete_user'
        ),
        accept: ()=>{
          this.userService.deleteUser(this.id).subscribe(
            res => {
              if(res.status === 200){
                this.showMessageService.showMessage('success', 'message.delete_user_success')
                this.router.navigate(['/admin/user/'])
              }else {
                this.showMessageService.showMessage('error', 'message.delete_user_error')
                this.router.navigate(['/admin/user/'])
              }
            }
          )
        }
      })
    }
    else this.router.navigate(['/admin/user/'])
  }
}
