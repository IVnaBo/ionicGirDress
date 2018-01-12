import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  isLogin:boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private alert:AlertController,
              private events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
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
  getStorageData(){
    this.storage.get("shop").then((val)=>{
      console.log(val);
    });
  }
  /***
   * 注销 登录
   */
  logoutAction(){
    if(this.isLogin){ //已经是登录状态
      let storage = this.storage;
      let alert = this.alert.create({
        title:"提示",
        message:"退出登录?",
        buttons: [
          {
            text: '取消',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '确定',
            handler: data => {

              storage.remove("userInfo");
              // storage.remove("shop");
            }
          }
        ]

      });
      alert.present();
    }else {//跳转到登录页面
      this.navCtrl.push("LoginPage");
    }

  }
  removeShopInfo(){
    this.storage.remove("shop");
    this.events.publish("CarIsChange");
  }

}
