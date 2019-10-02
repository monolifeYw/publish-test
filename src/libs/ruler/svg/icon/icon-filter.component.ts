import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-filter',
    templateUrl: './icon-filter.component.html',
})
export class RulerSVGIconFilterComponent extends SVG {
    stroke = '#303033';
}
