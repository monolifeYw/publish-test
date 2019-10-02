import { Injectable, Inject } from '@angular/core';
import { ConnectionBackend, Headers, Http, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from './environments/environment';

@Injectable()
export class HttpService extends Http {
    token: string;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        let token;
        const options = new RequestOptions(defaultOptions.merge({
            withCredentials: true,
        }));
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        // Cache API 호출 시 withCredentials 옵션을 제거한다
        if (url instanceof Request && !this.shouldUseCredentials(url)) {
            url.withCredentials = null;
        }

        if (!this.token) {
            return super.request(url, options);
        } else {
            if (this.shouldUseCredentials(url)) {
                if (typeof url === 'string') {
                    if (!options) {
                        options = { headers: new Headers() };
                    }
                    options.headers.set('Authorization', `Bearer ${this.token}`);
                    options.headers.set('Content-Type', 'application/json');
                } else {
                    url.headers.set('Authorization', `Bearer ${this.token}`);
                    url.headers.set('Content-Type', 'application/json');
                }
            }
            return super.request(url, options).catch(this.catchAuthError(this));
        }
    }

    // withCredentials 옵션이 필요한 경우를 체크한다
    // Cache API를 호출하지 않을 때 true 로 리턴한다
    shouldUseCredentials(url: string | Request): boolean {
        // // FIXME: production 환경이 아닌 경우로 테스트중이라서 production 환경인 경우에는 항상 true 로 리턴한다. (나중에 지울 예정임)
        // if (environment.name === 'production') {
        //     return true;
        // }
        const regex = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/;
        const hostname = typeof url === 'string' ? url.match(regex) : url.url.match(regex);
        if (hostname && hostname[1] !== environment.apiCacheHost) {
            return true;
        } else {
            return false;
        }
    }

    catchAuthError(self: HttpService) {
        return (res: Response) => {
            // TODO: Process authorization
            console.log('Authorization error', res);
            return Observable.throw(res);
        };
    }
}
