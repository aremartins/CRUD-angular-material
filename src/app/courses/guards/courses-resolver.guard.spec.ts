import { TestBed } from '@angular/core/testing';

import { CoursesResolverGuard } from './courses-resolver.guard';

describe('CoursesResolverGuard', () => {
  let guard: CoursesResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoursesResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
