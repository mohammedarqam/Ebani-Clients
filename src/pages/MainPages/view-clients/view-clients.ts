import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { AddClientsPage } from '../../Clients/add-clients/add-clients';
import { AngularFirestore } from 'angularfire2/firestore';
import { ClientDetailsPage } from '../../Clients/client-details/client-details';


@IonicPage()
@Component({
  selector: 'page-view-clients',
  templateUrl: 'view-clients.html',
})
export class ViewClientsPage {

  mainArr : Array<any> = [];
  colRef = this.db.collection("Clients");

  loading = this.loadingCtrl.create({
    content: 'Loading Please Wait...'
  });



  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public db: AngularFirestore,
    public menuCtrl : MenuController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.getClients();
  }
  ionViewDidEnter(){
    this.menuCtrl.enable(true);
  }
  gtClientDetails(c){
    this.navCtrl.push(ClientDetailsPage,{client : c});
  }




  getClients() {
    this.loading.present();
    this.colRef.snapshotChanges().subscribe((querySnapshot) => {
      this.mainArr = [];
      querySnapshot.forEach((doc) => {
        var temp: any = doc.payload.doc.data();
        temp.id = doc.payload.doc.id;
        this.mainArr.push(temp);
      });
      this.loading.dismissAll();
    });
  }






  gtAddClient() {
    this.navCtrl.push(AddClientsPage);
  }

}
