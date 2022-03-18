import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolverGuard implements Resolve<Course>{

  constructor(private service: CoursesService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course | Observable<Course> | Promise<Course> | Observable<any>{
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    }

    return of( {
      id: null,
      name: null,
      category: null
    })
  }


}
