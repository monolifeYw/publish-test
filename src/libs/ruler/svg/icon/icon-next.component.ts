import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-next',
    templateUrl: './icon-next.component.html',
})
export class RulerSVGIconNextComponent extends SVG {
    stroke = '#303033';
    strokeWidth = '5';
}
