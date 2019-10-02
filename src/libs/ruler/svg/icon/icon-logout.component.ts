import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-logout',
    templateUrl: './icon-logout.component.html',
})
export class RulerSVGIconLogoutComponent extends SVG {
    stroke = '#303033';
}
