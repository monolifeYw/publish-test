import { Input } from '@angular/core';

export class SVG {
    @Input() fill: string = 'none';
    @Input() fillRule: string = 'evenodd';
    @Input() stroke: string = 'none';
    @Input() strokeWidth: string = '1';
    @Input() width: string = '100%';
    @Input() height: string = '100%';
}
