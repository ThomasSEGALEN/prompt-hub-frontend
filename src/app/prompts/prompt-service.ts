import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Prompt } from './prompt.model'

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  httpsClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'prompts'

  getPrompts(): Observable<Prompt[]> {
    return this.httpsClient.get<Prompt[]>(this.baseUrl)
  }
}
