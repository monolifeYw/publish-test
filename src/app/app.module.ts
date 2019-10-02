import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyApiGatewayService } from './my-api-gateway.service';
import { API_URL_TOKEN } from './app.tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MyApiGatewayService,
    // 공통의 api 주소 입력
    {
      provide: API_URL_TOKEN,
      useValue: '/api'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
