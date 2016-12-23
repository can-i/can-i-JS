import { JobSettings } from './../Work/index';
import { injectWith } from './InjectWith';
import { InternalDocumentationStructure } from './../help/InternalDocumentStructure';
import { MiddleWareFunction } from '../MiddleWare';
import { Provider } from './index';
export interface InternalAccessorStructure {
    inject: {
        [key: string]: any[];
    };
    methods: any;
    route_prefix: string;
    documentation: InternalDocumentationStructure;
    middleware: {
        global?: MiddleWareFunction[];
        route?: {
            [key: string]: MiddleWareFunction[];
        };
    };
    singleton?: boolean;
    injectWith: injectWith;
    provider: Provider;
    view: {
        [key: string]: boolean;
    };
    job: JobSettings[];
}
