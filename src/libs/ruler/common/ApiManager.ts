import { environment } from './environments/environment';

export enum ApiType {
    Api,
    Dummy,
    Portal,
    WWW,
}

// API Manager class, using with service name when 29CM NEXT APIs and using type and service when legacy APIs
export class ApiManager {
    // For singletone instance
    static _shared: ApiManager = null;
    static get shared(): ApiManager {
        if (null === ApiManager._shared) {
            ApiManager._shared = new ApiManager();
        }

        return ApiManager._shared;
    }

    // Returns API url `protocol://host/{prefix}/{service}` like `https://api-portal.29cm.co.kr/video/commerce/`
    apiUrl(service: string, cache: boolean = false): string {
        const baseUrl = environment.apiProtocol + '://' + (cache ? environment.apiCacheHost : environment.apiHost);
        return baseUrl + '/' + (
            environment.apiPrefix && environment.apiPrefix.length > 0 ? (
                environment.apiPrefix + '/'
            ) : (
                ''
            )) + service;
    }

    // Returns legacy APIs `http://www.29cm.co.kr/api/~` or `http://api.29cm.co.kr/~`
    apiUrlWithType(type: ApiType, service: string): string {
        if (type === ApiType.Portal) {
            return this.apiUrl(service);
        }
        switch (type) {
        case ApiType.WWW:
            return environment.apiLegacyWWWPrefix + service;
        case ApiType.Api:
            return environment.apiLegacyApiPrefix + service;
        case ApiType.Dummy:
        default:
            return '';
        }
    }

    // Returns Service Front url `protocol://host/{service}` like `https://www.29cm.co.kr/video/commerce/`
    serviceUrl(service: string, serviceHostName?: string): string {
        const baseUrl = environment.apiProtocol + '://' + (serviceHostName ? (
            // post-dev.29cm.co.kr
            serviceHostName + (environment.apiPrefix ? ('-' + environment.apiPrefix) : '') + '.29cm.co.kr'
        ) : (
            environment.serviceHost
        ));
        if (serviceHostName === 'search') {
            const searchPrefix = `?keyword=`;
            return baseUrl + '/' + searchPrefix + service;
        }
        return baseUrl + '/' + service;
    }

}
