import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('scroll') scrollElement: any;
  @ViewChild('spinner') spinnerElement: any;

  categories: Array<any> = [];
  selectedMenuTarget: any;
  products: Array<any> = [];
  hasmore = true;

  islock = false;

  params = {
    favoritesId: 0,
    pageNo: 1
  }

  constructor(public navCtrl: NavController,
              public appService: AppService) {

  }

  ionViewDidLoad() {
    this.getCategories();
    this.addScrollEventListener();
  }

  addScrollEventListener() {
    this.scrollElement._scrollContent.nativeElement.onscroll = event => {
      if (this.spinnerElement) {
        //元素顶端到可见区域顶端的距离
        var top = this.spinnerElement.nativeElement.getBoundingClientRect().top;
        //可见区域高度
        var clientHeight = document.documentElement.clientHeight;
        if (top <= clientHeight) {
          console.log("ready loadmore...");
          this.doInfinite();
        }
      }
    }
  }

  // 获取左侧菜单
  getCategories() {
    this.appService.httpGet(AppGlobal.API.getCategories, { appTag: 'dress' }, rs => {
      console.debug(rs);
      this.categories = rs.data;
      //默认获取第一个分类的商品列表
      this.params.favoritesId = this.categories[0].FavoritesId;
      this.getProducts();
    })
  }

  // 选中左侧菜单
  itemClick(c, event) {

    var initSelected: any = document.getElementsByClassName('menuItem');
    if (initSelected[0].classList.contains("active")) {
      initSelected[0].classList.remove("active")
    }

    //移除上次选中菜单的样式
    if (this.selectedMenuTarget) {
      this.selectedMenuTarget.classList.remove("active")
    }

    //修改本次选中菜单的样式
    event.currentTarget.classList.add("active");

    //将本次选中的菜单记录
    this.selectedMenuTarget = event.currentTarget;

    this.hasmore = true;

    this.params.favoritesId = c.FavoritesId;
    this.params.pageNo = 1;

    this.getProducts();
  }

  getProducts() {
    this.appService.httpGet(AppGlobal.API.getProducts, this.params, rs => {
      // console.log(rs.data);
      this.products = rs.data;
      this.params.pageNo += 1;
    })
  }

  /***
   * 下拉加载更多
   */
  doInfinite() {
    if (this.islock) {
      return;
    }
    if (this.hasmore == false) {
      return;
    }
    this.islock = true;
    this.appService.httpGet(AppGlobal.API.getProducts, this.params, d => {
      this.islock = false;
      if (d.data.length > 0) {
        /// 拼接数据
        this.products = this.products.concat(d.data);
        this.params.pageNo += 1;
      } else {
        this.hasmore = false;
        console.log("没有数据啦！")
      }
    });
  }

  goDetails(item) {
    this.navCtrl.push('ProductDetailsPage', { item: item });
  }



}
