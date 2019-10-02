import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-combinedshape',
    templateUrl: './icon-combinedshape.component.html',
})
export class RulerSVGIconCombinedShapeComponent extends SVG {
    fill = '#303033';
    stroke = '#303033';
    width = '42px' ;
    height = '6px' ;
}
