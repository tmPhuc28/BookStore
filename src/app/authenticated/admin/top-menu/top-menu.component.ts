import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../../../services/authenticate.service";
import AppConstant from "../../../utilities/app-constant";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit {
  icon: any;
  constructor(private authService: AuthenticateService,
              private router: Router,
              private userService: UserService) {}
  ngOnInit(): void {
    let id = localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION);
    if(id){
      this.authService.getAuth(id).subscribe(
        res => {
          if (res.status === 200) {
            let id = res.data.userId;
            this.userService.getUser(id).subscribe(
              res1 => {
                if (res1.status === 200) {
                  this.icon = res1.data.fistName.charAt(0) + res1.data.lastName.charAt(0);
                }
              }
            )
          }
        }
      )
    }
  }

  onSignOut(){
    this.authService.logout(localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION)).subscribe(
      res => {
        if(res.status === 200){
          this.router.navigate(['/']).then(r=>{});
        }
      }
    )
    this.authService.deleteToken();
  }
}
