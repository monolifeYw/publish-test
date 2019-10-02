import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-cart',
    templateUrl: './icon-cart.component.html',
})
export class RulerSVGIconCartComponent extends SVG {
    stroke = '#303033';
}
