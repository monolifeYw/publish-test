import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-before',
    templateUrl: './icon-before.component.html',
})
export class RulerSVGIconBeforeComponent extends SVG {
    stroke = '#5D5D5D';
    strokeWidth = '2';
}
