import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Project } from 'src/app/models/project';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private static projects$ = new BehaviorSubject<Project[]>([]);
  private static projects: Project[] = [];

  constructor(private http: HttpService) { }

  private loadProjects(projects: Project[]) {
    ProjectService.projects = projects;
    ProjectService.projects$.next(ProjectService.projects);
  }

  private appendProject(project: Project) {
    ProjectService.projects.push(project);
    ProjectService.projects$.next(ProjectService.projects);
  }

  private modifyProject(project: Project) {
    const idx = ProjectService.projects.findIndex(p => p.id === project.id);
    ProjectService.projects[idx] = project;
    ProjectService.projects$.next(ProjectService.projects);
  }

  private removeProject(id: string) {
    ProjectService.projects = ProjectService.projects.filter(p => p.id !== id);
    ProjectService.projects$.next(ProjectService.projects);
  }

  getProject(id: string) {
    return ProjectService.projects$.pipe(map(projects => {
      const project = projects.find(p => p.id === id);
      if (project === undefined) return null;
      return project;
    }));
  }

  get getProjects$() {
    return ProjectService.projects$;
  }

  createProject(data: {name: string, description: string, envtype: string, host: string}) {
    return this.http.post('/project/v1/project/', data).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.appendProject(collector.data()['project']);
        }
        return collector;
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  listProject() {
    return this.http.get('/project/v1/project/').pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.loadProjects(collector.data()['projects']);
        }
        return collector;
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  updateProject(id: string, data: {name: string, description: string, envtype: string, host: string}) {
    return this.http.put(`/project/v1/project/?id=${id}`, data).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.modifyProject(collector.data()['project']);
        }
        return collector;
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  deleteProject(id: string) {
    return this.http.delete(`/project/v1/project/?id=${id}`).pipe(map(res => {
      try {
        const collector = new ResponseCollector(res);
        if (collector.success()) {
          this.removeProject(id);
        }
        return collector;
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }
}
