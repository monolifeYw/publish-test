import { Injectable } from '@angular/core';
import { MyApiGatewayService } from './my-api-gateway.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadDataService {
  constructor(private apiGateway: MyApiGatewayService, private _http: Http) {}

  getData(page: number): Observable<any> {
    /* const search = new URLSearchParams();
    search.set('page', page); */

    // console.log('sadas', JSON.stringify(params));
    // return this.apiGateway.get('https://reqres.in/api/users', params);
    return this.apiGateway.get('https://reqres.in/api/users', { page });
  }

  getData1(page) {
    return this._http.get(
      // 'https://reqres.in/ap',
      'https://reqres.in/api/users',
      {
        params: {
          page
        }
      }
    ).map(res => res.json());
  }
}


/*
getData(page) {
    return this.http.get(
      // 'https://reqres.in/ap',
      'https://reqres.in/api/users',
      {
        params: {
          page
        }
      }
    ).map(res => res.json());
    .subscribe(res => {
      console.log('res', res);
    }, err => {
      console.log('err', err);
    });
  }
*/
