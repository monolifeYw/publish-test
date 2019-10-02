import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-close',
    templateUrl: './icon-close.component.html',
})
export class RulerSVGIconCloseComponent extends SVG {
    stroke = '#000';
}
