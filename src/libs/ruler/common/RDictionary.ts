export interface IRDictionary {
    keys: string[];
    values: any[];
    length: number;
    add(key: string, value: any): void;
    remove(key: string): void;
    containsOfKey(key: string): boolean;
    containsOfValue(value: any): boolean;
    keysForValue(value: any): string[];
}

export class RDictionary {
    _keys: string[] = [];
    _values: any[] = [];

    constructor(init: Object = {}) {
        for (const key in init) {
            if (init[key]) {
                const value = init[key];
                this[key] = value;
                this._keys.push(key);
                this._values.push(value);
            }
        }
    }

    public get length(): number {
        return this._keys.length;
    }

    public get keys(): string[] {
        return this._keys;
    }

    public get values(): any[] {
        return this._values;
    }

    add(key: string, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        const index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    containsOfKey(key: string): boolean {
        if (typeof this[key] === 'undefined') {
            return false;
        }

        return true;
    }

    containsOfValue(value: any): boolean {
        if (this._values.indexOf(value) >= 0) {
            return true;
        }

        return false;
    }

    keysForValue(value: any): string[] {
        const keys: string[] = [];
        let i;
        const count = this._values.length;
        for (i = 0; i < count; ++i) {
            const item = this._values[i];
            if (item === value) {
                keys.push(this._keys[i]);
            }
        }

        return keys;
    }

    toLookup(): IRDictionary {
        return this;
    }
}
