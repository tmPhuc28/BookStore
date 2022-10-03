import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticatedComponent} from './authenticated.component';
import {AdminComponent} from './admin/admin.component';
import {LeftMenuComponent} from './admin/left-menu/left-menu.component';
import {TopMenuComponent} from './admin/top-menu/top-menu.component';
import {AuthenticatedRoutingModule} from './authenticated-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProductComponent} from './admin/product/product.component';
import {ProductListComponent} from './admin/product/product-list/product-list.component';
import {ProductFormComponent} from './admin/product/product-form/product-form.component';
import {CategoryComponent} from './admin/category/category.component';
import {CategoryListComponent} from './admin/category/category-list/category-list.component';
import {CategoryFormComponent} from './admin/category/category-form/category-form.component';
import {OrderComponent} from './admin/order/order.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {UserCusEmpComponent} from './admin/user-cus-emp/user-cus-emp.component';
import {UserCusEmpListComponent} from './admin/user-cus-emp/user-cus-emp-list/user-cus-emp-list.component';
import {UserCusEmpFormComponent} from './admin/user-cus-emp/user-cus-emp-form/user-cus-emp-form.component';
import {OrderListComponent} from './admin/order/order-list/order-list.component';
import {OrderDetailComponent} from './admin/order/order-detail/order-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UnAuthenticatedModule} from "../un-authenticated/un-authenticated.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    AuthenticatedComponent,
    AdminComponent,
    LeftMenuComponent,
    TopMenuComponent,
    ProductComponent,
    ProductListComponent,
    ProductFormComponent,
    CategoryComponent,
    CategoryListComponent,
    CategoryFormComponent,
    UserCusEmpListComponent,
    UserCusEmpFormComponent,
    UserCusEmpComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailComponent
  ],
    imports: [
        CommonModule,
        AuthenticatedRoutingModule,
        UnAuthenticatedModule,
        TranslateModule,
        PrimeNgModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
    ],
})
export class AuthenticatedModule {
}
