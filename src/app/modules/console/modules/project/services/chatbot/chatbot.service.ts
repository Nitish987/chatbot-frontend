import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpService) { }

  setConfig(data: {apiId: number, config: any, data: any}) {
    return this.http.post('/chatbot/v1/config/', {
      api_id: data.apiId,
      config: data.config,
      data: data.data
    }).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }
}
