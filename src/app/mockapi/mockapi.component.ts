import { Component, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { MockapiService } from '../services/mockapi.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MockApi } from './models/MockApi';

@Component({
  selector: 'app-mockapi',
  templateUrl: './mockapi.component.html',
  styleUrls: ['./mockapi.component.css']
})
export class MockapiComponent implements OnInit {
  collection: string = '';
  mockApis$ = new BehaviorSubject<MockApi[]>([]);
  contentTypes: SelectItem[] = [];
  selectedContentType: string = 'application/json';
  methods: SelectItem[] = [];
  selectedMethod: string = "GET";
  language: string = 'json';

  mockApi: MockApi;
  action: string;
  editorOptions = <MonacoEditorConstructionOptions>{theme: 'vs-dark', language: this.language, readonly: true, minimap: {enabled: false}};
  code: string = '';
  constructor(private mockApiService: MockapiService, private router: Router) {
    this.mockApi = <MockApi>router.getCurrentNavigation()?.extras.state;
   }
  ngOnInit(): void {
    if(!this.mockApi){
      
    }
    this.contentTypes.push({ label: "APPLICATION/JSON", value: "application/json"})
    this.contentTypes.push({ label: "TEXT/PLAIN", value: "text/plain"})
    this.methods.push({ label: "GET", value: "GET"})
    this.methods.push({ label: "POST", value: "POST"})
    this.methods.push({ label: "PUT", value: "PUT"})
    this.methods.push({ label: "PATCH", value: "PATCH"})
    this.methods.push({ label: "DELETE", value: "DELETE"})
  }

  addMockApi(mockApi: MockApi){
    this.mockApis$.next([...this.mockApis$.value, mockApi]);
  }

  selectedMockApi(mockApi: MockApi){
    this.mockApi = mockApi
    this.code = JSON.stringify(mockApi.responseBody);
  }

  onContentTypeChange(selectedValue: SelectItem){
    switch(selectedValue.value){
      case "application/json": this.language = 'json'; break;
      case "text/plain": this.language = 'text'; break; 
    }
  }

  onSubmit(){
    switch(this.action){
      case 'create': {
        if(this.mockApi){
          this.addMockApi(this.mockApi); 
        }
        break;
      };
      case 'update': {
        break;
      }
    }
  }
  onCancel(){
  }
}
