import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-nav-open',
    templateUrl: './icon-nav-open.component.html',
})
export class RulerSVGIconNavOpenComponent extends SVG {
    stroke = '#303033';
    strokeWidth ='2'
}
