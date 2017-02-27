import { CommunicationController } from "../Controller";
/**
 * All of these might not get implemented but it's good to have them
 */
export declare class Error400Controller extends CommunicationController {
    BadRequest(body: any): void;
    Unauthorized(body: any): void;
    PaymentRequired(body: any): void;
    Forbidden(body: any): void;
    NotFound(body: any): void;
    MethodNotAllowed(body: any): void;
    NotAcceptable(body: any): void;
    ProxyAuthenticationRequired(body: any): void;
    RequestTimeout(body: any): void;
    Conflict(body: any): void;
    Gone(body: any): void;
    LengthRequired(body: any): void;
    PreconditionFailed(body: any): void;
    RequestEntityTooLarge(body: any): void;
    RequestURITooLong(body: any): void;
    UnsupportedMediaType(body: any): void;
    RequestedRangeNotSatisfiable(body: any): void;
    ExpectationFailed(body: any): void;
    EnhanceYourCalm(body: any): void;
    UnprocessableEntity(body: any): void;
    Locked(body: any): void;
    FailedDependency(body: any): void;
    UpgradeRequired(body: any): void;
    PreconditionRequired(body: any): void;
    TooManyRequests(body: any): void;
    RequestHeaderFieldsTooLarge(body: any): void;
    NoResponse(body: any): void;
    RetryWith(body: any): void;
    BlockedbyWindowsParentalControls(body: any): void;
    UnavailableForLegalReasons(body: any): void;
    ClientClosedRequest(body: any): void;
}
