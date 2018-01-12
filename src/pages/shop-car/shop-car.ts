import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ShopCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-car',
  templateUrl: 'shop-car.html',
})
export class ShopCarPage {
  shopArr:Array<any>;
  isAllCheck:boolean;
  allPrice:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage:Storage,
              private events:Events) {

   this.allPrice = 0;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopCarPage');
    var copyThis = this;
    this.storage.get("shop").then((val)=>{
      copyThis.shopArr = val;// 数据赋值
    });
    /// 接收通知 更新购物车数据....
    this.events.subscribe("CarIsChange",()=>{
      console.log("接收到通知!!");
      copyThis.storage.get("shop").then((val)=>{
        copyThis.shopArr = val;
        console.log(copyThis.shopArr);
      });
    });
  }
  ngOnInit(){

    // console.log();
  }

  /**
   * 单元格点击事件
   * @param index 索引
   */
  carItemClick(index,$event){
    // $event.stopPropagation();
    let shop = this.shopArr[index];
    console.log(shop);
  }
  /***
   * 点击了 " - "
   * @param index 当前索引
   */
  reduceAction(index,$event){
    let copyThis = this;
    // console.log(event);
    event.stopPropagation(); //阻止 事件向下响应
    var num = this.shopArr[index].num;
    if(num == 1){
      return;
    }else {
      num -= 1;
    }
     this.storage.get("shop").then((val)=>{
       val[index].num = num;
       copyThis.storage.set("shop",val);
    });

    this.shopArr[index].num = num;  ///回传数据
  }

  /***
   * 点击了+
   * @param index 当前索引
   */
  addAction(index,$event){
    let copyThis = this;
    event.stopPropagation();// 阻止 事件向下响应
    var num = this.shopArr[index].num;

    num += 1;

    this.shopArr[index].num = num; /// 回传数据

    this.storage.get("shop").then((val)=>{
      val[index].num = num;
      copyThis.storage.set("shop",val);
    });

  }

  /***
   * 单选按钮事件
   * @param i 当前索引
   */
  updateCheckState(i){
    let check = this.shopArr[i].isCheck;
    check = !check;
    this.shopArr[i].isCheck = check;
  }

  ///结算按钮事件
  calculatorAction(){

  }

  /***
   * 全选按钮事件
   */
  allCheck(){

    this.isAllCheck = !this.isAllCheck;
    // for (let i = 0 ; i < this.shopArr.length;i ++){
    //   let check = this.shopArr[i].isCheck;
    //   // check = !check;
    //   if(this.isAllCheck){
    //      check = true;
    //   }else {
    //     check = false;
    //   }
    //   this.shopArr[i].isCheck = check; /// 改状态 UI
    // }
    let copyThis = this;
    this.storage.forEach((value,key,num)=>{
      // console.log(value);
      for(var i = 0 ; i < value.length;i++){
        if(copyThis.isAllCheck){
          //item.shopItem?.ZkFinalPriceWap
          copyThis.allPrice += value[i].num * value[i].shopItem.ZkFinalPriceWap;
          // console.log(value[i].shopItem.ZkFinalPriceWap *);
          value[i].isCheck = true;
        }else {
          value[i].isCheck = false;
          copyThis.allPrice =  0;
        }
      }

      copyThis.shopArr = value;

      // console.log(num);
    });

  }
  ionViewWillUnload() {

    console.log('界面销毁');

    this.events.unsubscribe('CarIsChange'); ///移除监听
  }

}
