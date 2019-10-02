import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-back-arrow',
    templateUrl: './icon-back-arrow.component.html',
})
export class RulerSVGIconBackArrowComponent extends SVG {
    stroke = '#303033';
}
