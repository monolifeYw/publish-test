import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-menu',
    templateUrl: './icon-menu.component.html',
})
export class RulerSVGIconMenuComponent extends SVG {
    stroke = '#303033';
}
