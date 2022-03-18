import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly url = environment.API;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Course[]>(this.url).pipe(
      first(),
      delay(2000),
      tap((courses) => console.log(courses))
    );
  }

  loadByID(id: any) {
    return this.http.get<Course>(`${this.url}/${id}`).pipe(take(1));
  }

  create(course: Course): Observable<Course[]> {
    return this.http.post<Course[]>(this.url, course).pipe(
      tap((course) => console.log(course)),
      take(1)
    );
  }

  update(course: Course) {
    return this.http.put(`${this.url}/${course.id}`, course).pipe(take(1));
  }
}
