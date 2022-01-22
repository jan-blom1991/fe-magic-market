import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing-module';
import {DefaultModule} from './layouts/default/default.module';
import {MaintainProductComponent} from './layouts/default/maintain-product/maintain-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from './services/product.service';
import {UserService} from './services/user.service';
import {FileService} from './services/file.service';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { ManageProductComponent } from './layouts/default/manage-product/manage-product.component';

@NgModule({
  declarations: [
    AppComponent,
    MaintainProductComponent,
    ManageProductComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    DefaultModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [
    ProductService,
    UserService,
    FileService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
