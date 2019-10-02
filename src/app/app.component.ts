import { Component } from '@angular/core';
import { LoadDataService } from './load-data.service';
import { LoadModel } from './load.model';

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoadDataService]
})

export class AppComponent {
  datas: LoadModel[] = [];

  constructor(private loadService: LoadDataService) {}

  getData(evt: MouseEvent): void {
    console.log('getData', evt);

    this.loadService.getData(3).subscribe(res => {
      console.log('res', res);
      // this.datas = res.data;
    }, err => {
      console.log('err', err);
    });
  }
}
