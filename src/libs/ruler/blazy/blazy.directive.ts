import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BlazyParam, RulerBlazyService } from './blazy.service';

@Directive({
    selector: '[rulerBlazy]',
})
export class RulerBlazyDirective implements OnInit, OnDestroy {

    @Output() onSuccess = new EventEmitter<BlazyParam>();
    @Output() onError = new EventEmitter<BlazyParam>();

    bLazySubscription: Subscription;

    @HostBinding('style.minHeight') minHeight = '1px';

    constructor(
        private elementRef: ElementRef,
        private blazyService: RulerBlazyService,
    ) { }

    ngOnInit() {
        if (!this.blazyService.bLazy) {
            this.blazyService.setup();
        } else {
            this.blazyService.revalidate();
        }
        this.bLazySubscription = this.blazyService.blazyState
            .filter(res => res.el === this.elementRef.nativeElement)
            .subscribe(
                res => {
                    this.onSuccess.emit(res);
                },
                err => {
                    this.onError.emit(err);
                }
            );
    }

    ngOnDestroy() {
        if (this.blazyService.bLazy) {
            this.blazyService.destroy();
        }
    }
}
