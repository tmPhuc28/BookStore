import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import AppConstant from '../../utilities/app-constant';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit {
  id: any;
  isId: boolean = false;
  icon: any;
  fistName: any;
  lastName: any;
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private userService: UserService,
    private primengConfig: PrimeNGConfig
  ) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION)
      ? (this.isId = true)
      : (this.isId = false);
    this.id = localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION);
    if (this.id) {
      this.authService.getAuth(this.id).subscribe((res) => {
        if (res.status === 200) {
          let id = res.data.userId;
          this.userService.getUser(id).subscribe((res1) => {
            if (res1.status === 200) {
              this.icon =
                res1.data.fistName.charAt(0) + res1.data.lastName.charAt(0);
              this.fistName = res1.data.fistName;
              this.lastName = res1.data.lastName;
            }
          });
        }
      });
    }
  }

  onSignOut() {
    this.authService
      .logout(localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION))
      .subscribe((res) => {
        if (res.status === 200) {
          this.router.navigate(['/sign-in']).then((r) => {});
        }
      });
    this.authService.deleteToken();
  }
}
