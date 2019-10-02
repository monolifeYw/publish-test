import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-bi-small',
    templateUrl: './bi-small.component.html',
})
export class RulerSVGBISmallComponent extends SVG {
    fill = '#000';
}
