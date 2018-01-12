import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  params = {
    userName:'',
    passWord:''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private toast:ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /***登录按钮操作
   *
   */
  loginBtnAction(){
    if(this.params.userName != ''&& this.params.passWord !=''){
      console.log(this.params);
      /** 本地化存储 */
       this.storage.set("userInfo",this.params);

      this.navCtrl.pop();//退回到进入的页面
    }else {
      let toast = this.toast.create({
        message: '输入有误',
        duration: 3000
      });
      toast.present();
    }
  }

  /***
   * 找回密码 注册
   */
  forgotBtnAction(type){
    //{ id: 42 };
   this.navCtrl.push("ForgotPwdPage",{type:type});
  }

}
