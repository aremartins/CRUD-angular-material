import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveSuccessComponent } from 'src/app/shared/components/save-success/save-success.component';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  durationInSeconds = 2;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.coursesService.list();
    this.form = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      category: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  onSave() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.coursesService.create(this.form.value).subscribe(
        (success) => {
          console.log(success);
          this.openSnackBar();
        },
        (error) => console.log(error),
        () => console.log('request completo')
      );
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SaveSuccessComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    console.log('cancelado');
    //this.router.navigate(['courses'])
  }
}
