import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as Blazy from 'blazy';

export class BlazyParam {
    el: HTMLElement;
    msg?: string;
}

const viewportHeight = (window.innerHeight / 2) || 500;

@Injectable()
export class RulerBlazyService {

    // TODO: 삭제할 코드. 기존 코드 중 _shared 를 참조하고 있는 코드가 있을 수 있어 추후 삭제할 예정입니다.
    static _shared: RulerBlazyService = null;
    static get shared(): RulerBlazyService {
        if (null === RulerBlazyService._shared) {
            RulerBlazyService._shared = new RulerBlazyService();
        }
        return RulerBlazyService._shared;
    }

    private blazySubject = new Subject<BlazyParam>();

    bLazy: Blazy;
    blazyState = this.blazySubject.asObservable();

    constructor() {
        this.setup();
    }

    setup(offset = viewportHeight, root = document, validateDelay = 10, container = 'window') {
        if (this.bLazy) {
            return;
        }
        this.bLazy = new Blazy({
            src: 'data-blazy',
            offset: offset,
            root: root,
            validateDelay: validateDelay,
            container: container,
            success: (el: HTMLElement) => {
                this.blazySubject.next({el});
            },
            error: (el: HTMLElement, msg: string) => {
                this.blazySubject.next({el, msg});
            }
        });
    }

    revalidate() {
        if (this.bLazy) {
            this.bLazy.revalidate();
        }
    }

    destroy() {
        if (this.bLazy) {
            this.bLazy.destroy();
            this.bLazy = null;
        }
    }
}
