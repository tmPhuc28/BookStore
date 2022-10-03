import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';
import * as Crypto from 'crypto-js';
import AppUtil from '../../utilities/app-util';
import AppConstant from '../../utilities/app-constant';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  formSignIn: FormGroup = new FormGroup({});

  constructor(
    private auth: AuthenticateService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formSignIn = this.fb.group({
      userName: [''],
      passwordHash: [''],
    });
  }

  ngOnInit(): void {}

  onSubmitSignIn() {
    this.formSignIn.setValue({
      userName: this.formSignIn.value.userName,
      passwordHash: this.formSignIn.value.passwordHash,
    });
    let params = {
      userName: this.formSignIn.value.userName,
      password: Crypto.MD5(this.formSignIn.value.passwordHash).toString(),
    };
    this.auth.login(AppUtil.toSnakeCaseKey(params)).subscribe((res) => {
      if (res.status === 200) {
        this.auth.setToken(res.data.id);
        if (res.data.role === 'ADMIN') {
          this.router.navigate(['/admin/']);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }
}
