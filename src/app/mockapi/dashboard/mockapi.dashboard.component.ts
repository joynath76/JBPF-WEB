import { Component, OnInit } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { MockapiService } from 'src/app/services/mockapi.service';
import { Router } from '@angular/router';
import { MockApi } from '../models/MockApi';

@Component({
    selector: 'app-mockapi',
    templateUrl: './mockapi.dashboard.component.html'
})
export class MockapiDashboardComponent implements OnInit {

    collection: string = '';
    mockApis$: Observable<MockApi[]>;
    contentTypes: SelectItem[] = [];
    selectedContentType: string = 'application/json';
    methods: SelectItem[] = [];
    selectedMethod: string = "GET";
    language: string = 'json';

    mockApi: MockApi;
    action: string;
    editorOptions = <MonacoEditorConstructionOptions>{ theme: 'vs-dark', language: this.language, readonly: true, minimap: { enabled: false } };
    code: string = '';
    constructor(private mockApiService: MockapiService, private router: Router) { }
    ngOnInit(): void {
        this.mockApis$ = this.mockApiService.getAllMockApis();
    }

    fetchCollectionData() {
        this.mockApis$ = this.mockApiService.fetchMockApisByCollectio(this.collection);
    }

    selectedMockApi(mockApi: MockApi) {
        this.mockApi = mockApi
        this.code = JSON.stringify(mockApi.responseBody);
    }

    onContentTypeChange(selectedValue: SelectItem) {
        switch (selectedValue.value) {
            case "application/json": this.language = 'json'; break;
            case "text/plain": this.language = 'text'; break;
        }
    }

    onView(mockApi: MockApi) {
        this.router.navigate(['mockapis/view'], {
            state: mockApi
        })
    }
    onEdit(mockApi: MockApi) {
        this.router.navigate(['mockapis/edit'], {
            state: mockApi
        })
    }

    onDelete() {

    }

    onCreate(){
        this.mockApi = {
            apiCollection: this.collection,
            requestMethod: '',
            requestURL: '',
            responseCode: 0,
            contentType: '',
            responseBody: '',
            createdOn: new Date(),
            updatedOn: new Date()
        }
        this.router.navigate(['mockapis/new'], {
            state: this.mockApi
        })
    }
}
