import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkingProjectService {
  private static workingProjectId$ = new BehaviorSubject<string | null>(null);

  constructor() { }

  private updateProject(id: string | null) {
    WorkingProjectService.workingProjectId$.next(id);
  }

  get getWorkingProjectId$() {
    return WorkingProjectService.workingProjectId$;
  }

  changeWorkingProject(id: string | null) {
    this.updateProject(id);
  }
}
