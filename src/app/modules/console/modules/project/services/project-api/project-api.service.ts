import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(private http: HttpService) { }

  createApi(projectId: string, productId: number, host: string) {
    return this.http.post(`/project/v1/project/${projectId}/project-api/`, {
      product_id: productId,
      host: host
    }).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  listApis(projectId: string) {
    return this.http.get(`/project/v1/project/${projectId}/project-api/`).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }
}
