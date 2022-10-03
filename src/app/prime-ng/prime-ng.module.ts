import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoFocusModule } from 'primeng/autofocus';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { CarouselModule } from 'primeng/carousel';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import {InputSwitchModule} from "primeng/inputswitch";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {MessagesModule} from "primeng/messages";

@NgModule({
  declarations: [],
  imports: [
    AccordionModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    AutoFocusModule,
    CardModule,
    TableModule,
    ScrollTopModule,
    ToastModule,
    ToolbarModule,
    DropdownModule,
    InputTextareaModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    PasswordModule,
    MessagesModule,
    CarouselModule,
    RippleModule,
    ConfirmPopupModule,
    PanelModule,
    ImageModule,
    InputNumberModule,
    CalendarModule,
    InputMaskModule,
    InputSwitchModule
  ],
  exports: [
    AccordionModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    AutoFocusModule,
    CardModule,
    TableModule,
    ScrollTopModule,
    ToastModule,
    ConfirmPopupModule,
    ToolbarModule,
    DropdownModule,
    InputTextareaModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MessagesModule,
    FileUploadModule,
    HttpClientModule,
    PasswordModule,
    CarouselModule,
    RippleModule,
    PanelModule,
    ImageModule,
    InputNumberModule,
    CalendarModule,
    InputMaskModule,
    InputSwitchModule
  ],
})
export class PrimeNgModule {}
