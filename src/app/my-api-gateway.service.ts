import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL_TOKEN } from './app.tokens';

const JSON_MAPPER_FN = res => res.json();

@Injectable()
export class MyApiGatewayService {
  /**
   * RequestOptionsArgs
   * - request 에 필요한 설정을 선언
   * - url 정보, Query string parameter, Header Info, body
   */
  reqOptions: RequestOptionsArgs = {};

  constructor(
    private http: Http,
    @Inject(API_URL_TOKEN) private ApiURL: string
  ) {
    this.makeDefaultHttpOption();
  };

  makeDefaultHttpOption(): void {
    const headerInfo = new Headers();
    headerInfo.set('Content-Type', 'application/json');
    this.reqOptions.headers = headerInfo;
  }

  get(url: string, params?: any): Observable<any> {
    // Promise pattern
    /* return this.http.get(url, this.reqOptions)
      .toPromise() // import rxjs/add/operator/toPromise
      .then(JSON_MAPPER_FN)
      .catch(err => {
        console.log('err', err);
      }); */

    this.reqOptions.params = params || null;

    console.log('Inject', this.ApiURL);
    return this.http.get(url, this.reqOptions)
      .map(JSON_MAPPER_FN);
  }
}
