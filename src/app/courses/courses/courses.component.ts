import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.components';

import { CoursesFormComponent } from '../courses-form/courses-form.component';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  preserveWhitespaces: true,
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;
  displayedColumns: string[] = ['position', 'nome', 'category', 'botoes'];

  constructor(
    private coursesServices: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.courses$ = this.coursesServices.list().pipe(
      catchError((error) => {
        this.openDialog('Erro ao carregar dados');
        return of([]);
      })
    );
  }

  openDialog(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  openCoursesModal() {
    const dialogRef = this.dialog.open(CoursesFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onEdit(id:any) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }
}
