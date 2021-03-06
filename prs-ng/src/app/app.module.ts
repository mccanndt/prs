import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from '@feature/user/user-list/user-list.component';
import { MenuComponent } from '@core/menu/menu.component';
import { AboutComponent } from '@core/about/about.component';
import { VendorListComponent } from '@feature/vendor/vendor-list/vendor-list.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { PrCreateComponent } from './feature/pr/pr-create/pr-create.component';
import { PrDetailComponent } from './feature/pr/pr-detail/pr-detail.component';
import { PrEditComponent } from './feature/pr/pr-edit/pr-edit.component';
import { PrListComponent } from './feature/pr/pr-list/pr-list.component';
import { SortPipe } from '@pipe/sort.pipe';
import { PrLinesComponent } from './feature/pr/pr-lines/pr-lines.component';
import { PrliCreateComponent } from './feature/prli/prli-create/prli-create.component';
import { PrliEditComponent } from './feature/prli/prli-edit/prli-edit.component';
import { PrApproveComponent } from './feature/pr/pr-approve/pr-approve.component';
import { PrReviewComponent } from './feature/pr/pr-review/pr-review.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MenuComponent,
    AboutComponent,
    VendorListComponent,
    ProductListComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserEditComponent,
    VendorCreateComponent,
    VendorEditComponent,
    VendorDetailComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailComponent,
    PrCreateComponent,
    PrDetailComponent,
    PrEditComponent,
    PrListComponent,
    SortPipe,
    PrLinesComponent,
    PrliCreateComponent,
    PrliEditComponent,
    PrApproveComponent,
    PrReviewComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    // old way
    // Not necessary if @Injectable in service?
    // UserService,
    // VendorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
