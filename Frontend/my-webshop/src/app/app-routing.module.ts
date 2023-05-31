import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './services/auth.guard';
import { UserResolverService } from './services/user.resolver';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate: [AuthGuard], resolve: { user: UserResolverService }  },
 
  
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], resolve: { user: UserResolverService } },
  { path:'products' ,component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserResolverService]
})
export class AppRoutingModule { }
