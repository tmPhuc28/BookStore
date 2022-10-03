import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductListComponent } from './admin/product/product-list/product-list.component';
import { ProductFormComponent } from './admin/product/product-form/product-form.component';
import { CategoryComponent } from './admin/category/category.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryFormComponent } from './admin/category/category-form/category-form.component';
import { OrderComponent } from './admin/order/order.component';
import { UserCusEmpComponent } from './admin/user-cus-emp/user-cus-emp.component';
import { UserCusEmpListComponent } from './admin/user-cus-emp/user-cus-emp-list/user-cus-emp-list.component';
import { UserCusEmpFormComponent } from './admin/user-cus-emp/user-cus-emp-form/user-cus-emp-form.component';
import { OrderListComponent } from './admin/order/order-list/order-list.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { AuthGuard } from '../interceptors/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            component: ProductComponent,
            children: [
              {
                path: '',
                component: ProductListComponent,
              },
              {
                path: 'form/:id',
                component: ProductFormComponent,
              },
              {
                path: 'new',
                component: ProductFormComponent,
              },
            ],
          },
          {
            path: 'category',
            component: CategoryComponent,
            children: [
              {
                path: '',
                component: CategoryListComponent,
              },
              {
                path: 'form/:id',
                component: CategoryFormComponent,
              },
              {
                path: 'new',
                component: CategoryFormComponent,
              },
            ],
          },
          {
            path: 'order',
            component: OrderComponent,
            children: [
              {
                path: '',
                component: OrderListComponent,
              },
              {
                path: ':id',
                component: OrderDetailComponent,
              },
            ],
          },
          {
            path: 'user',
            component: UserCusEmpComponent,
            children: [
              {
                path: '',
                component: UserCusEmpListComponent,
              },
              {
                path: 'form/:id',
                component: UserCusEmpFormComponent,
              },
              {
                path: 'new',
                component: UserCusEmpFormComponent,
              },
            ],
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
export class AuthenticatedRoutingModule {}
