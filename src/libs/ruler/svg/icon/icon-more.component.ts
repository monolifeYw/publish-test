import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-more',
    templateUrl: './icon-more.component.html',
})
export class RulerSVGIconMoreComponent extends SVG {
    stroke = '#5D5D5D';
    strokeWidth = '3';
}
