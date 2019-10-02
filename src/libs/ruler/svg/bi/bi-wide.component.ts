import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-bi-wide',
    templateUrl: './bi-wide.component.html',
})
export class RulerSVGBIWideComponent extends SVG {
    fill = '#000';
}
