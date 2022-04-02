import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.components';
import { SaveSuccessComponent } from './components/save-success/save-success.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    SaveSuccessComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule

  ],
  exports: [
    ErrorDialogComponent,
    SaveSuccessComponent,
    DeleteModalComponent
  ]
})
export class SharedModule { }
