import { APIDetail } from './APIDetail';
export interface InternalDocumentationStructure {
    enabled: boolean;
    classname: string;
    class: APIDetail;
    methods: {
        [key: string]: APIDetail;
    };
    properties: {
        [key: string]: APIDetail;
    };
}
