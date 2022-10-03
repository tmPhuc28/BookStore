import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnAuthenticatedComponent } from './un-authenticated.component';
import { UnAuthenticatedRoutingModule } from './un-authenticated-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart/cart-detail/cart-detail.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';

@NgModule({
  declarations: [
    UnAuthenticatedComponent,
    SignInComponent,
    SignUpComponent,
    HeaderMenuComponent,
    FooterMenuComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CartDetailComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    UnAuthenticatedRoutingModule,
    TranslateModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
})
export class UnAuthenticatedModule {}
