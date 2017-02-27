import { CommunicationController } from "../Controller";
export declare class Error500Controller extends CommunicationController {
    InternalServerError(body: any): void;
    NotImplemented(body: any): void;
    BadGateway(body: any): void;
    ServiceUnavailable(body: any): void;
    GatewayTimeout(body: any): void;
    HTTPVersionNotSupported(body: any): void;
    VariantAlsoNegotiates(body: any): void;
    InsufficientStorage(body: any): void;
    LoopDetected(body: any): void;
    BandwidthLimitExceeded(body: any): void;
    NotExtended(body: any): void;
    NetworkAuthenticationRequired(body: any): void;
    NetworkReadTimeoutError(body: any): void;
    NetworkConnectTimeoutError(body: any): void;
}
