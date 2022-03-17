import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesFormComponent } from './courses-form/courses-form.component';

@NgModule({
  declarations: [CoursesComponent, CoursesFormComponent],
  imports: [CommonModule, CoursesRoutingModule, FormsModule, MaterialModule, SharedModule, ReactiveFormsModule, FormsModule],
  exports:[CoursesFormComponent]
})
export class CoursesModule {}
