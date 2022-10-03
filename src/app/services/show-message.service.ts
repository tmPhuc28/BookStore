import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import AppUtil from "../utilities/app-util";

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private messageService: MessageService,
              private translateService: TranslateService) { }



  showMessage(severity: string, contentToast: string){
    this.messageService.add({
      key: 'app-toast',
      severity: severity,
      detail: AppUtil.translate(
        this.translateService,
        contentToast
      )
    })
  }
}
