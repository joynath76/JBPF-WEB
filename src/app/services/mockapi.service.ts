import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MockApi } from '../mockapi/models/MockApi';

@Injectable({
  providedIn: 'root'
})
export class MockapiService {

  private basePath = "";
  private mockApis$ = new BehaviorSubject<MockApi[]>([]);
  constructor(private http: HttpClient) {
    this.basePath = environment.serverBasePath;
   }

  fetchMockApisByCollectio(collection: string): Observable<MockApi[]> {
    return this.http.get(`${this.basePath}/mockapi/${collection}`).pipe(map((response: any) => {
      this.mockApis$.next(response.data);
      return response.data;
    }))
  }

  getAllMockApis(): Observable<MockApi[]> {
    return this.mockApis$;
  }

  addMockApis(mockApi: MockApi) {
    let header = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(`${this.basePath}/mockapi`, mockApi, { headers: header }).pipe(map((response: any) => {
      this.mockApis$.next([...this.mockApis$.value, response.data]);
      return response.data
    }))
  }

  deleteMockApi(mockApi: MockApi){
    let header = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.delete(`${this.basePath}/mockapi`, { headers: header, body: mockApi }).pipe(map((response: any) => {
      let remainingApis = this.mockApis$.value.filter(mockapi => (mockapi.requestMethod != mockApi.requestMethod || mockapi.requestURL != mockapi.requestURL))
      this.mockApis$.next(remainingApis);
      return response.data;
    }))
  }
  
  editMockApi(mockApi: MockApi){
    let header = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(`${this.basePath}/mockapi`, mockApi, { headers: header }).pipe(map((response: any) => {
      let remainingApis = this.mockApis$.value.filter(mockapi => (mockapi.requestMethod != mockApi.requestMethod || mockapi.requestURL != mockapi.requestURL))
      this.mockApis$.next([remainingApis, response.data]);
      return response.data
    }))
  }

}
