/**
 * URL 중 중복되는 구분
 * - 공통되는 부분을 설정으로 추출
 * - /api/v1 같은 정적인 텍스트는 injectable 을 활용
*/

import { InjectionToken } from '@angular/core';

export const API_URL_TOKEN = new InjectionToken<string>('API_URL');
