
import { Accessor } from "../win";

export { Stack } from "./Stack";

import { MiddleWareFunction } from "./Stack";

export function MiddleWare(func: MiddleWareFunction) {
    return function (target: Object, key: string) {
        let access = Accessor(target);
        access.middleware = access.middleware || [];
        let store: MiddleWareFunction[];
        if (key) {
            access.middleware.route = access.middleware.route || {};
            store = access.middleware.route[key] = access.middleware.route[key] || [];
            store.push(func);
        } else {
            store = access.middleware.global = access.middleware.global || [];
        }
        store.push(func);
    }
}