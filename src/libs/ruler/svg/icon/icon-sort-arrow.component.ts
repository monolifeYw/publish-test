import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-sort-arrow',
    templateUrl: './icon-sort-arrow.component.html',
})
export class RulerSVGIconSortArrowComponent extends SVG {
    stroke = '#303033';
}
