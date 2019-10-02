import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-zigzag-line',
    templateUrl: './icon-zigzag-line.component.html',
})
export class RulerSVGIconZigzagLineComponent extends SVG {
    stroke = '#303033';
}
