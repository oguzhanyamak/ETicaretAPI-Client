import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(param: Partial<RequestParameters>): string {
    return `${param.baseUrl ? param.baseUrl : this.baseUrl}/${param.controller}${param.action ? `/${param.action}` : ""}`;
  }


  get<T>(param: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = "";
    if (param.fullEndPoint)
      url = param.fullEndPoint
    else
      url = `${this.url(param)}${id ? `/${id}` : ""}`

    return this.httpClient.get<T>(url, { headers: param.headers })
  }

  //Authorization", "Bearer " + accessToken

  post<T>(param: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (param.fullEndPoint)
      url = param.fullEndPoint
    else
      url = `${this.url(param)}`
    return this.httpClient.post<T>(url, body, { headers: param.headers })
  }

  put<T>(param: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = "";
    if (param.fullEndPoint)
      url = param.fullEndPoint
    else
      url = `${this.url(param)}`
    return this.httpClient.put<T>(url, body, { headers: param.headers })
  }

  delete<T>(param:Partial<RequestParameters>,id:string){
    let url: string = "";
    if (param.fullEndPoint)
      url = param.fullEndPoint
    else
      url = `${this.url(param)}/${id}`;
    return this.httpClient.delete<T>(url,{headers:param.headers});
  }

}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}
