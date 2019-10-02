import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-search-big',
    templateUrl: './icon-search-big.component.html',
})
export class RulerSVGIconSearchBigComponent extends SVG {
    stroke = '#000';
    strokeWidth = '6';
}
