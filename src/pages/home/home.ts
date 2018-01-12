import { AppService, AppGlobal } from './../../app/app.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides: Array<any> = [];
  categories: Array<any> = [];
  products: Array<any> = [];
//  显示加载动画
  spinner1: boolean = true;

  params = {
    favoritesId: 2054400,
    pageNo: 1,
    pageSize: 20
  }

  constructor(public appService: AppService, public navCtrl: NavController) {
    this.getSlides();
    this.getCategories();
    this.getProducts();
  }
  //获取幻灯片
  getSlides() {
    var params = {
      favoritesId: 2056439,
      pageNo: 1,
      pageSize: 5
    }
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs => {
      console.debug(rs);
      this.slides = rs.data;
      this.spinner1 = false;
    })
  }
  //获取分类
  getCategories() {
    this.appService.httpGet(AppGlobal.API.getCategories, { appTag: 'dress' }, rs => {
      // console.debug(rs);
      // console.log(rs);
      this.categories = rs.data;
    })
  }
  //获取首页推荐列表
  getProducts() {
    this.appService.httpGet(AppGlobal.API.getProducts, this.params, rs => {
      console.debug(rs);
      this.products = rs.data;
    })
  }
  //商品详情
  goDetails(item) {
    /***
     * 跳转并向下传递数据...
     */
    console.log(item.PictUrl);

  }

  /****
   * 跳转到列表页
   * @param c 列表页需要传递参数
   */
  goProductList(c){
    this.navCtrl.push('ProductListPage', { item: c });
  }



}

