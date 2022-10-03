import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import AppUtil from "../../utilities/app-util";
import * as CryptoJS from 'crypto-js';
import {AuthenticateService} from "../../services/authenticate.service";
import {Router} from "@angular/router";
import {ShowMessageService} from "../../services/show-message.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticateService,
    private showMessage: ShowMessageService
  ) {
    this.formSignUp = this.fb.group({
      fistName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      dob: [''],
      address: [''],
      phoneNumber: ['', Validators.required],
      email: [''],
      gender: [true],
      passwordHash: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['CUSTOMER']
    })
  }

  ngOnInit(): void {
    this.formSignUp.setValue({
      fistName: this.formSignUp.value.fistName,
      lastName: this.formSignUp.value.lastName,
      userName: this.formSignUp.value.userName,
      email: this.formSignUp.value.email || null,
      dob: this.formSignUp.value.dob || null,
      gender: this.formSignUp.value.gender?'MALE':'FEMALE',
      address: this.formSignUp.value.address || null,
      phoneNumber: this.formSignUp.value.phoneNumber,
      passwordHash: this.formSignUp.value.passwordHash,
      confirmPassword: this.formSignUp.value.confirmPassword,
      role: 'CUSTOMER'
    })
  }

  onSubmitSignUp() {
    if(this.formSignUp.value.passwordHash === this.formSignUp.value.confirmPassword){
      let params = {
        fistName: this.formSignUp.value.fistName,
        lastName: this.formSignUp.value.lastName,
        userName: this.formSignUp.value.userName,
        email: this.formSignUp.value.email,
        dob: this.formSignUp.value.dob,
        gender: this.formSignUp.value.gender?'MALE':'FEMALE',
        address: this.formSignUp.value.address,
        phoneNumber: this.formSignUp.value.phoneNumber,
        passwordHash: CryptoJS.MD5(this.formSignUp.value.passwordHash).toString(),
        role: 'CUSTOMER'
      }
      this.userService.createUser(AppUtil.toSnakeCaseKey(params)).pipe().subscribe(
        res => {
          if (res.status === 200) {
            let paramSignIn = {
              userName: res.data.userName,
              password: res.data.passwordHash
            }
            this.userService.verifyUser(res.data.id).pipe().subscribe(
              res1 => {
                if(res1.status === 200){
                  this.authService.login(AppUtil.toSnakeCaseKey(paramSignIn)).subscribe(
                    res2=>{
                      if(res2.status === 200){
                        this.router.navigate(['/']).then(r=>{})
                      }
                    }
                  )
                }
              }
            )
          }
        });
    } else {
      this.showMessage.showMessage('error', 'message.password_and_confirm_password_invalid');
    }
  }
}
