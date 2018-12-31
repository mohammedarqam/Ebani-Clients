import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { ViewClientsPage } from '../pages/MainPages/view-clients/view-clients';
import { AddClientsPage } from '../pages/Clients/add-clients/add-clients';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  activePage: any;

  full: boolean = false;

  pages: Array<{ title: string, component: any, icon: any, color: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public db : AngularFirestore,
    public toastCtrl: ToastController,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'DashBoard', component: DashboardPage, icon: "ios-analytics", color: "yellowi" },
      { title: 'Clients', component: ViewClientsPage, icon: "ios-people", color: "white" },
    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {


      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {

      //     this.db.collection("Admin").doc(user.uid).snapshotChanges().subscribe(itemSnap=>{
      //       if (itemSnap.payload.exists) {
      //         this.rootPage = DashboardPage;
      //       } else {
      //         firebase.auth().signOut().then(() => {
      //           this.rootPage = LoginPage;
      //           this.presentToast("You are not registered a Admin")
      //         })
      //       }
            
      //     })

          // firebase.database().ref("Admin Data").child("Admins").child(user.uid).once('value', itemSnap => {
          //   if (itemSnap.exists()) {
          //     var welMsg = "Welcome" + " " + itemSnap.val().Name;
          //     this.rootPage = DashboardPage;
          //     this.presentToast(welMsg);
          //   } else {
          //     firebase.auth().signOut().then(() => {
          //       this.rootPage = LoginPage;
          //       this.presentToast("You are not registered a Admin")
          //     })
          //   }
          // });



      //   }
      //   else {
      //     this.rootPage = LoginPage;
      //   }
      // });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }
  collapse() {
    this.full = false;
  }
  expand() {
    this.full = true;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });


  }


}
