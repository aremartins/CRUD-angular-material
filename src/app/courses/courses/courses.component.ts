import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';
import { DeleteSuccessComponent } from 'src/app/shared/components/delete-success/delete-success.component';
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
  durationInSeconds = 3;

  constructor(
    private coursesServices: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.courses$ = this.coursesServices.list().pipe(
      catchError((error) => {
        this.openDialog('Erro ao carregar dados');
        return of([]);
      })
    );
  }

  onRefresh() {
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

  openSnackBar() {
    this._snackBar.openFromComponent(DeleteSuccessComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openCoursesModal() {
    const dialogRef = this.dialog.open(CoursesFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.coursesServices.list().subscribe();
      console.log(`Dialog result: ${result}`);
    });
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(course: Course) {
    debugger;
    this.openConfirmDelete('Are you sure to delete this record?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.coursesServices.remove(course.id).subscribe(
            (success) => {
              this.openSnackBar(), this.onRefresh();
            },
            (error) =>
              this.openDialog('Erro ao deletar, tente novamente mais tarde!')
          );
        }
      });
  }

  openConfirmDelete(msg: string) {
    return this.dialog.open(DeleteModalComponent, {
      width: '300px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }
}
