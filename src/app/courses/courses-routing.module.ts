import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesFormComponent } from './courses-form/courses-form.component';

import { CoursesComponent } from './courses/courses.component';
import { CoursesResolverGuard } from './guards/courses-resolver.guard';

const routes: Routes = [
  {
    path:'',
    component: CoursesComponent,
  },
  {
    path:'novo',
    component: CoursesFormComponent,
    resolve: {
      course: CoursesResolverGuard
    }
  },
  {
    path:'editar/:id',
    component: CoursesFormComponent,
    resolve: {
      course: CoursesResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
