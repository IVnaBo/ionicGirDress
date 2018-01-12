import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";

/**
 * Generated class for the IonProductsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-products',
  templateUrl: 'ion-products.html'
})
export class IonProductsComponent {

  text: string;

  @Input() products: Array<any>;
  constructor(public navCtrl: NavController) {
    console.log('Hello IonProducts Component');
  }
  goDetails(item) {

    this.navCtrl.push('ProductDetailsPage', { item: item });
  }


}
