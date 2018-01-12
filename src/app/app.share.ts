import {QQSDK, QQShareOptions} from '@ionic-native/qqsdk';
import {Injectable} from "@angular/core";
import {LoadingController} from "ionic-angular";
@Injectable()
export class AppShare {

  //标题
  title: string = "女装尖货 - 单件月销1.8万"
  //描述
  description: string = "行业精选女装 好货任你挑";
  //分享链接
  link: string = "http://dress.tongedev.cn";
  //分享图片
  image: string = "https://mmbiz.qlogo.cn/mmbiz_png/khImeKLbVF7u5qdXdicpapLl9diadj5db6xHxdlVgxmYPxkYOR8WyVgOw4tn3EHEsvd9hlfu7zEpgVLYkLh28Nibg/0?wx_fmt=png";

  constructor(public loadingCtrl: LoadingController,private qqSdk:QQSDK) {
    // if (platform.is('ios')) {
    //   this.link = "https://itunes.apple.com/cn/app/女装尖货-单件月销1-8万/id1194942857?mt=8";
    // }
    // else if (platform.is('android')) {
    //   this.link = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.tongedev.dress";
    // } else {
    //   this.link = "http://dress.tongedev.cn";
    // }
  }
  shareTextOptions: QQShareOptions = {
    client: this.qqSdk.ClientType.QQ,
    text: 'This is Share Text',
    scene: this.qqSdk.Scene.QQ,
  };
  qqShare(){
    // this.qqSdk.shareText()
    this.qqSdk.shareText(this.shareTextOptions)
      .then(() => {
        console.log('shareText success');
        alert("success");
      })
      .catch(error => {
        console.log(error);
        alert("error == " + error);
      });

  }


}
