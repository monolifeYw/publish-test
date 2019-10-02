import { Component } from '@angular/core';

import { SVG } from '../svg';

@Component({
    selector: 'ruler-svg-icon-setting',
    templateUrl: './icon-setting.component.html',
})
export class RulerSVGIconSettingComponent extends SVG {
    stroke = '#303033';
}
