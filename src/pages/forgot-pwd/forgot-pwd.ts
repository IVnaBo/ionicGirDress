import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';

/**
 * Generated class for the ForgotPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-pwd',
  templateUrl: 'forgot-pwd.html',
})
export class ForgotPwdPage {

  headTitle:String;
  isShowIcon:boolean;

  params = {
    usertel: '',
    newpass: '',
    vcode: '',
    sure_pwd: ''
  }
  codeParam = {
    fromflag: 2,
    usertel: ""
  }
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,private toast:ToastController){
   console.log(this.navParams.get('type'));
    this.headTitle = this.navParams.get('type');
    this.isShowIcon = true;
    if( this.headTitle == "注册"){
      this.isShowIcon = false;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  // 倒计时
  settime() {
    if (this.verifyCode.countdown == 1) { /** 倒计时完成*/
      this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
      this.settime();
    }, 1000);
  }

  /***
   * 获取验证码.....
   */
  getCode() {
    /***
     * 手机号码非空验证，正则验证
     */

    if( this.codeParam.usertel == ''|| !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.codeParam.usertel))){

      let toast = this.toast.create({
        message: '手机号码输入有误',
        duration: 3000
      });
      toast.present();
      return ;
    }
    /// 加载状态....
    var loading = this.loadingCtrl.create({ showBackdrop: false,
      content: 'Please wait...'
    });
    loading.present();
    //发送验证码成功后开始倒计时
    this.verifyCode.disable = false;
    this.settime();
    setTimeout(()=>{
      loading.dismiss();
    },2000);

  }

  /***
   * 重置
   */
  doReset() {
    this.params.usertel = this.codeParam.usertel;

    if (this.params.usertel == "") {
      console.log("请输入手机号");
      return;
    }

    if (this.params.vcode == "") {
      console.log("请输入验证码");
      return;
    }

    if (this.params.newpass == this.params.sure_pwd) {

    } else {
      console.log("两次密码输入不一致");
    }
    console.log(this.params);
  }

}
