import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BlazyParam, RulerBlazyService } from './blazy.service';

@Component({
    selector: 'ruler-blazy',
    templateUrl: 'blazy.component.html',
    styleUrls: ['./blazy.component.css'],
})
export class RulerBlazyComponent implements OnInit, OnDestroy {

    @Input() src = 'https://img.29cm.co.kr/next29cm/blankimage_l.png';
    @Input() alt = '';
    @Input() offset = 50;
    @Input() root = document;
    @Input() validateDelay = 10;
    @Input() originalWidth: number;
    @Input() originalHeight: number;
    @Output() onSuccess = new EventEmitter<BlazyParam>();
    @Output() onError = new EventEmitter<BlazyParam>();

    bLazySubscription: Subscription;

    // TODO: 삭제할 코드. 기존 코드 중 bLazy 를 참조하고 있는 코드가 있을 수 있어 추후 삭제할 예정입니다.
    get bLazy() {
        return this.blazyService.bLazy;
    }

    @HostBinding('style.padding-bottom') paddingBotton: string;
    @HostBinding('style.height') height: string;

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
        if (this.originalHeight && this.originalWidth) {
            this.height = 0 + 'px';
            this.paddingBotton = 100 * this.originalHeight / this.originalWidth + '%';
        }
        this.bLazySubscription = this.blazyService.blazyState
            .filter(res => res.el.parentNode === this.elementRef.nativeElement)
            .subscribe(
                (res) => {
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

    revalidate() {
        this.blazyService.revalidate();
    }
}
