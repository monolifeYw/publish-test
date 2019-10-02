import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulerAccodionbxComponent } from './accodionbx.component';
import { RulerSVGModule } from '../svg/svg.module';

@NgModule({
    imports: [
        CommonModule,
        RulerSVGModule,

    ],
    declarations: [RulerAccodionbxComponent],
    exports: [RulerAccodionbxComponent]
})
export class RulerAccodionbxModule {

}
