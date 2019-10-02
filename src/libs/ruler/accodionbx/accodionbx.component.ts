import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'ruler-accodionbx',
    templateUrl: 'accodionbx.component.html',
    styleUrls: ['accodionbx.component.css']
})
export class RulerAccodionbxComponent {

    @Input() title: string;
    @Input() info: string;

    layerToggle(e) {
        e.target.classList.toggle('active');
    }
}
