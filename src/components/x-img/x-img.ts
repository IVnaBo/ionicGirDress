import { Component } from '@angular/core';
import {IonicModule} from 'ionic-angular';

/**
 * Generated class for the XImgComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'x-img',
  templateUrl: 'x-img.html'
})
export class XImgComponent {

  text: string;

  constructor() {
    console.log('Hello XImgComponent Component');
    this.text = 'Hello World';
  }

}
