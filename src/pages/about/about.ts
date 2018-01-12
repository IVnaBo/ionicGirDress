import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ImagePicker} from "@ionic-native/image-picker";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  listArr:Array<any>;
  isLogin:boolean; ///是否登录
  constructor(public navCtrl: NavController,private storage:Storage,private imagePicker: ImagePicker) {
    console.log("about页面被加载");
    this.listArr = ['我的淘宝','购物车','订单','待付款','待发货','待收货','待评价'];

  }
  ionViewWillEnter(){
    console.log("2.0 ionViewWillEnter 顾名思义，当将要进入页面时触发");
    this.storage.get('userInfo').then((val) => {
      console.log("登录信息:" + val);
      if(val != null){ // 取值不为空 再进行下一步动作....
        if(val.userName != '' && val.userName != null){
          this.isLogin = true;
          console.log("1111111111111111111");
        }
      }else{
        this.isLogin = false;
      }

    });
    console.log("登录状态:" + this.isLogin);
  }

  /***
   * 跳转到设置
   */
  toSettingPage(){
    this.navCtrl.push("SettingPage");
}

  listItemClick(index){

  }
  /***
   * 登录按钮点击
   */
  loginBtnAction(){
   this.navCtrl.push("LoginPage");
  }
  takePhoto(){
    let options = {
      maximumImagesCount:1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }

}
