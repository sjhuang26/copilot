export class MethodNotImplementedError extends Error {
    constructor(method?: string) {
        if(method) {
            super("Method " + method + " not implemented!");
        } else {
            super("Method not implemented!");
        }
    }
}

