import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-close-arrow',
    templateUrl: './icon-close-arrow.component.html',
})
export class RulerSVGIconCloseArrowComponent extends SVG {
    stroke = '#303033';
}
