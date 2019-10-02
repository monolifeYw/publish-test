export class RObject {
    static InitError(context: any, initializerName: string, argTypeNames: string[] = []) {
        const className = context.constructor.name;
        const funcString = [
            className,
            '(',
            argTypeNames.map((type, index) => 'arg' + (index + 1) + ': ' + type.toLowerCase()).join(', '),
            ')'].join('');
        console.error('There is no initializer of', className + '.' + initializerName, 'but it called', funcString);
    }

    static Types(args: any[]): string[] {
        const types: string[] = [];
        for (const arg of args) {
            const argType: string = typeof arg;
            let argName: string;
            if (argType === 'object') {
                argName = arg.constructor.name;
            } else {
                argName = argType.charAt(0).toUpperCase() + argType.slice(1);
            }
            types.push(argName);
        }
        return types;
    }

    static InitializerName(args: any[]): string {
        let name = 'init';
        const types: string[] = RObject.Types(args);
        let isFirst = true;
        for (const type of types) {
            if (type === 'Undefined') {
                continue;
            }
            name += (isFirst ? 'With' : 'And') + type;
            isFirst = false;
        }
        return name;
    }

    constructor(...args: any[]) {
        const initializerName = RObject.InitializerName(args);
        if (typeof this[initializerName] === 'function') {
            this[initializerName](...args);
        } else {
            RObject.InitError(this, initializerName, RObject.Types(args));
        }
    }

}
