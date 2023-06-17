import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  getResult(searchInput: string):Observable<any> {
    return this.http.get("https://api.publicapis.org/entries?title="+searchInput)
  }

  constructor(private http:HttpClient) { }

}

