import { NgModule } from '@angular/core';
import { IonProductsComponent } from './ion-products/ion-products';
import {IonicModule} from "ionic-angular";
import { XImgComponent } from './x-img/x-img';
@NgModule({
	declarations: [IonProductsComponent,
    XImgComponent],
	imports: [IonicModule],
	exports: [IonProductsComponent,
    XImgComponent]
})
export class ComponentsModule {}
