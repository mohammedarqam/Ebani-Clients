import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';



@IonicPage()
@Component({
  selector: 'page-add-clients',
  templateUrl: 'add-clients.html',
})
export class AddClientsPage {


  // Image Parameters
  img1: any;
  img2: any;
  url: any;

  // Image Parameters Ended


  admin: any;

  cName: string;
  mail: string;
  phone: string;
  pass: string = this.genPass();

  loading = this.loadingCtrl.create({
    content: 'Loading Please Wait...'
  });




  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.getAdmin();
    this.genPass();
  }

  getAdmin() {
    this.db.collection("Admin").doc(firebase.auth().currentUser.uid).snapshotChanges().subscribe(snap => {
      this.admin = snap.payload.data();
    })
  }



  checkData() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.cName) {
      if (this.mail.match(mailformat)) {
        if (this.phone) {
          this.addClient();
        } else { this.presentToast("Enter Client's Phone Number"); }
      } else { this.presentToast("Enter a Valid Email"); }
    } else { this.presentToast("Enter the Client's Name"); }
  }


  addClient() {

    this.loading.present();


    firebase.auth().createUserWithEmailAndPassword(this.mail, this.pass).then(() => {
      firebase.storage().ref("Clients").child(this.cName).put(this.img2).then(() => {
        firebase.storage().ref("Clients").child(this.cName).getDownloadURL().then((dURL) => {
          this.url = dURL;
        }).then(() => {
          this.db.collection("Clients").doc(firebase.auth().currentUser.uid).set({
            Name: this.cName,
            Email: this.mail,
            PhoneNumber: this.mail,
            Pass: this.pass,
            Logo : this.url,
          }).then(() => {
            console.log(this.admin.Email)
            console.log(this.admin.Pass)
            firebase.auth().signInWithEmailAndPassword(this.admin.Email, this.admin.Pass).then(() => {
              this.loading.dismissAll();
              this.presentToast("Client Added");
            }).catch((e) => {
              console.log(e)
            })
          })
        })
      });
    });





  }

  genPass() {
    let chars = "abcdefghijklmnopqrstuvwxyz!@#ABCDEFGHIJKLMNOP1234567890";
    let pass = "";
    for (var x = 0; x < 12; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  //Image Uploading Section
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
  }


  removeImage() {
    this.img1 = null;
  }
  //Image Uploading Section Ended
}
