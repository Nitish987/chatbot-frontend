import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { ResponseCollector } from 'src/app/utils/response-collector';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpService) { }

  setConfig(data: {apiId: number, name: string, photo: File, greeting: string, engine: string, model: string, sysPrompt: string, knowledge: string, config: any, data: any}) {
    const formData = new FormData();
    formData.append('api_id', data.apiId.toString());
    formData.append('name', data.name);
    formData.append('photo', data.photo);
    formData.append('greeting', data.greeting);
    formData.append('engine', data.engine);
    formData.append('model', data.model);
    formData.append('sys_prompt', data.sysPrompt);
    formData.append('knowledge', data.knowledge);
    formData.append('config', data.config);
    formData.append('data', data.data);
    return this.http.post('/chatbot/v1/config/', formData).pipe(map(res => {
      try {
        return new ResponseCollector(res);
      } catch(e) {
        return ResponseCollector.localErrorResponse();
      }
    }));
  }
}
