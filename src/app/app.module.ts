import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { ViewClientsPage } from '../pages/MainPages/view-clients/view-clients';
import { AddClientsPage } from '../pages/Clients/add-clients/add-clients';
import { DeleteClientPage } from '../pages/Clients/delete-client/delete-client';
import { EditClientsPage } from '../pages/Clients/edit-clients/edit-clients';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ClientDetailsPage } from '../pages/Clients/client-details/client-details';



export const firebaseCred = {
  apiKey: "AIzaSyAGwSMgvYpJv5_ga100sN2SKD-CXEdbk3c",
  authDomain: "ebani-clients.firebaseapp.com",
  databaseURL: "https://ebani-clients.firebaseio.com",
  projectId: "ebani-clients",
  storageBucket: "ebani-clients.appspot.com",
  messagingSenderId: "217509734938"
};
firebase.initializeApp(firebaseCred);


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    ViewClientsPage,
    AddClientsPage,
    DeleteClientPage,
    EditClientsPage,
    ClientDetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseCred),
    AngularFirestoreModule.enablePersistence(),

    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    ViewClientsPage,
    AddClientsPage,
    DeleteClientPage,
    EditClientsPage,
    ClientDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
