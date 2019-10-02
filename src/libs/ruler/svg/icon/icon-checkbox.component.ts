import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-checkbox',
    templateUrl: './icon-checkbox.component.html',
})
export class RulerSVGIconCheckboxComponent extends SVG {
    stroke = '#d8d8d8';
    strokeWidth = '1';
}
