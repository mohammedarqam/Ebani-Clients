import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-client-details',
  templateUrl: 'client-details.html',
})
export class ClientDetailsPage {

  client = this.navParams.get("client");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public menuCtrl : MenuController,
  ) {
    this.menuCtrl.enable(false);
    console.log(this.client);
  }


}
