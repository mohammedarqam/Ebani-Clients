import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, Loading, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { DashboardPage } from '../../MainPages/dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mail: string;
  pass: string;


  loading = this.loadingCtrl.create({
    content: 'Loading Please Wait...'
  });


  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public platform: Platform,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(false);
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.navCtrl.setRoot(DashboardPage);
        }
      });
    });
  }



  checkData() {
    if (this.mail) {
      if (this.pass) {
        this.login();
      } else { this.presentToast("Enter Password"); }
    } else { this.presentToast("Enter Email"); }
  }


  login() {
    this.loading.present();
    firebase.auth().signInWithEmailAndPassword(this.mail, this.pass).then(() => {
      this.navCtrl.setRoot(DashboardPage);
      this.loading.dismiss();
    }).catch((e) => {
      this.loading.dismiss();
      let err = e.message;
      this.presentToast(err)
    })
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}
