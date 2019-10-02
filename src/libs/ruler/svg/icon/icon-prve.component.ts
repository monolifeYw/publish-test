import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-prve',
    templateUrl: './icon-prve.component.html',
})
export class RulerSVGIconPrveComponent extends SVG {
    stroke = '#303033';
    strokeWidth = '5';
}
