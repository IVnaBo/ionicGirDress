import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ThemeableBrowser} from "@ionic-native/themeable-browser";
import {AppShare} from "../../app/app.share";
import { Storage } from '@ionic/storage';
/**通知类*/
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  selectedItem: any;
  imgs: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appShare: AppShare,
              public  actionSheetCtrl: ActionSheetController,
              private storage: Storage,private events:Events) {
    this.selectedItem = this.navParams.get("item");
    var smallImgs = this.selectedItem["SmallImages"];
    if (smallImgs != null) {
      this.imgs = smallImgs;
    }
    console.log(this.selectedItem);

    console.log(111);

  }

  ngOnInit() {
    console.log(222);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  /***
   * 加入购物车
    */
  addShopCar(){
    let tempStrorage = this.storage;
    let copyThis = this;
    tempStrorage.get("shop").then((val)=>{
      if(val == null){ // 初始的时候 购物车 无数据....
        let arr = [];

        let json = {
          shopItem:this.selectedItem,
          isCheck : false,
          num :1
        };
        // console.log("zzzzzzzzzzzzzzzzzzzz");
        arr.push(json);
        tempStrorage.set("shop",arr); // 重新设置数据 回传
        copyThis.events.publish("CarIsChange"); /// 刚开始把这句直接放在外面... 数据没添加完成  就发送通知了 更新界面....
      }else{
        let json = {
          shopItem:this.selectedItem,
          isCheck : false,
          num :1
        }
        // console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
        val.push(json);
        tempStrorage.set("shop",val); // 重新设置数据 回传
        copyThis.events.publish("CarIsChange");
      }
    });

  }

  /****
   * 立即购买
   */
  goBuy() {
    let options = {
      statusbar: {
        color: '#f8285c'
      },
      toolbar: {
        height: 44,
        color: '#f8285c'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      backButtonCanClose: true
    };
    /**
     * 创建主题浏览器
     */
    new ThemeableBrowser().create(this.selectedItem.ClickUrl, "_blank", options);

  }

  share(event) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '分享',
      buttons: [
        {
          text: 'QQ好友',
          handler: () => {
            // this.appShare.qqShare(0);

            this.appShare.qqShare();
            // alert("dianjile");
          }
        },
        {
          text: 'QQ空间',
          handler: () => {
            // this.appShare.qqShare(1);
          }
        },
        {
          text: '微信好友',
          handler: () => {
            // this.appShare.wxShare(0);
          }
        },
        {
          text: '朋友圈',
          handler: () => {
            // this.appShare.wxShare(1);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
