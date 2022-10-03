import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticateService} from "../../../services/authenticate.service";
import {UserService} from "../../../services/user.service";
import AppConstant from "../../../utilities/app-constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
})
export class LeftMenuComponent implements OnInit {
  icon: any[] = [];
  fistName: string = '';
  lastName: string = '';
  constructor(private authService: AuthenticateService,
              private router: Router) {}

  ngOnInit(): void {

  }
}
