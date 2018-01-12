import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPwdPage } from './forgot-pwd';

@NgModule({
  declarations: [
    ForgotPwdPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPwdPage),
  ],
})
export class ForgotPwdPageModule {}
