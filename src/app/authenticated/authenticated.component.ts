import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from "../services/authenticate.service";
import {UserService} from "../services/user.service";
import AppConstant from "../utilities/app-constant";

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {

  isAdmin: boolean = false;
  constructor(private auth: AuthenticateService,
              private user: UserService) { }

  ngOnInit(): void {
    this.auth.getAuth(localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION)).subscribe(
      res => {
        if(res.status === 200){
          let id = res.data.userId
          this.user.getUser(id).subscribe(
            res1 => {
              if(res1.status === 200){
                this.isAdmin = (res1.data.role === 'ADMIN')?true:false;
              }
            }
          )
        }
      }
    )
  }

}
