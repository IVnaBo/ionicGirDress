import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductListPage } from './product-list';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),ComponentsModule
  ],
})
export class ProductListPageModule {}
