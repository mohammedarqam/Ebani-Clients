import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditClientsPage } from './edit-clients';

@NgModule({
  declarations: [
    EditClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditClientsPage),
  ],
})
export class EditClientsPageModule {}
