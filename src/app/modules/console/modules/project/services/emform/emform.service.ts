import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class EmformService {

  constructor(private http: HttpService) { }

  setConfig(data: {apiId: number, name: string, config: any}) {
    const formData = new FormData();
    formData.append('api_id', data.apiId.toString());
    formData.append('name', data.name);
    formData.append('config', data.config);
    return this.http.post('/emforms/v1/config/', formData).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }

  getConfig(apiId: number) {
   return this.http.get(`/emforms/v1/config/?api_id=${apiId}`).pipe(map(res => {
    try {
      return new ResponseCollector(res);
    } catch(e) {
      return ResponseCollector.localErrorResponse();
    }
   })); 
  }

  getContent(emformId: number) {
    return this.http.get(`/emforms/v1/content/${emformId}/`).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
     })); 
  }
}
