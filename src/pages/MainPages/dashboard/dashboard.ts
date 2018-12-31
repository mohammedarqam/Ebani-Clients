import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { query } from '@angular/core/src/render3/instructions';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {


  colRef = this.db.collection("Clients");
  numClients : number = 0;

  constructor(
    public db: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
  ) {
    this.menuCtrl.enable(true);
    this.getClients();
  }

  getClients() {
    this.colRef.get().subscribe((querySnapshot) => {
      this.numClients = querySnapshot.size;
  });

  }

}
