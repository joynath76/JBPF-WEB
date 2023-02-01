export interface MockApi{
    apiCollection: string;
    requestMethod: string;
    requestURL: string;
    responseCode: number;
    contentType: string;
    responseBody: string;
    createdOn: Date;
    updatedOn: Date;
}