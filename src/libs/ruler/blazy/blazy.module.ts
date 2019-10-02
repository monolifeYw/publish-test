import { NgModule, ModuleWithProviders } from '@angular/core';

import { RulerBlazyService } from './blazy.service';
import { RulerBlazyComponent } from './blazy.component';
import { RulerBlazyDirective } from './blazy.directive';

@NgModule({
    declarations: [
        RulerBlazyComponent,
        RulerBlazyDirective,
    ],
    exports: [
        RulerBlazyComponent,
        RulerBlazyDirective,
    ],
    providers: [
        RulerBlazyService,
    ]
})
export class RulerBlazyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RulerBlazyModule,
            providers: [
                RulerBlazyService
            ]
        };
    }
}
