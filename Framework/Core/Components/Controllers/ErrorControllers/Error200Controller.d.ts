import { CommunicationController } from '../Controller';
export declare class Error200Controller extends CommunicationController {
    OK(body: any): void;
    Created(body: any): void;
    Accepted(body: any): void;
    NonAuthoritativeInformation(body: any): void;
    NoContent(body: any): void;
    ResetContent(body: any): void;
    PartialContent(body: any): void;
    MultiStatus(body: any): void;
    AlreadyReported(body: any): void;
    IMUsed(body: any): void;
}
