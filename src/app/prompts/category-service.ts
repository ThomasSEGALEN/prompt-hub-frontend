import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Category } from './category.model'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  httpsClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'categories'

  getCategories(): Observable<Category[]> {
    return this.httpsClient.get<Category[]>(this.baseUrl)
  }
}
