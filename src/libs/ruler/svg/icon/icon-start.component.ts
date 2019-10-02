import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-start',
    templateUrl: './icon-start.component.html',
})
export class RulerSVGIconStartComponent extends SVG {
    stroke = '#d4d4d4';
    fill = '#d4d4d4';
    strokeWidth ='0';
}
