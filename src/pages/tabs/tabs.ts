import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ShopCarPage} from "../shop-car/shop-car";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab4Root = AboutPage;
  tab3Root  = ShopCarPage;

  constructor() {

  }

}
