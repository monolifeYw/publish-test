import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-my',
    templateUrl: './icon-my.component.html',
})
export class RulerSVGIconMyComponent extends SVG {
    stroke = '#303033';
}
