import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeleteClientPage } from './delete-client';

@NgModule({
  declarations: [
    DeleteClientPage,
  ],
  imports: [
    IonicPageModule.forChild(DeleteClientPage),
  ],
})
export class DeleteClientPageModule {}
