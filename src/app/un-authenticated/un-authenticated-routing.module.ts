import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthenticatedComponent } from './un-authenticated.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartDetailComponent } from './cart/cart-detail/cart-detail.component';
import { CartComponent } from './cart/cart.component';
import {CheckoutComponent} from "./cart/checkout/checkout.component";

const routes: Routes = [
  {
    path: '',
    component: UnAuthenticatedComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      {
        path: '',
        component: ProductComponent,
        children: [
          {
            path: '',
            component: ProductListComponent,
          },
          {
            path: 'detail/:id',
            component: ProductDetailComponent,
          },
        ],
      },
      {
        path: 'cart',
        component: CartComponent,
        children: [
          {
            path: '',
            component: CartDetailComponent,
          },
          {
            path: 'check-out',
            component: CheckoutComponent,
          }
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnAuthenticatedRoutingModule {}
