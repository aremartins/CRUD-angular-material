import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.components';
import { SaveSuccessComponent } from './components/save-success/save-success.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    SaveSuccessComponent
  ],
  imports: [
    CommonModule,
    MaterialModule

  ],
  exports: [
    ErrorDialogComponent,
    SaveSuccessComponent
  ]
})
export class SharedModule { }
