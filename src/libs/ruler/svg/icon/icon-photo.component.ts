import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-photo',
    templateUrl: './icon-photo.component.html',
})
export class RulerSVGIconPhotoComponent extends SVG {
    fill = '#4A4A4A';
    width = '15px';
    height = '15px';
}
