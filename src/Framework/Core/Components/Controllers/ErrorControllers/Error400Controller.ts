import { Controller } from "../Controller";

/**
 * All of these might not get implemented but it's good to have them
 */
export class Error400Controller extends Controller {
  BadRequest(body: any) {
    this.status(400).send(body);
  }

  Unauthorized(body: any) {
    this.status(401).send(body);
  }

  PaymentRequired(body: any) {
    this.status(402).send(body);
  }

  Forbidden(body: any) {
    this.status(403).send(body);
  }

  NotFound(body: any) {
    this.status(404).send(body);
  }

  MethodNotAllowed(body: any) {
    this.status(405).send(body);
  }

  NotAcceptable(body: any) {
    this.status(406).send(body);
  }

  ProxyAuthenticationRequired(body: any) {
    this.status(407).send(body);
  }

  RequestTimeout(body: any) {
    this.status(408).send(body);
  }

  Conflict(body: any) {
    this.status(409).send(body);
  }

  Gone(body: any) {
    this.status(410).send(body);
  }

  LengthRequired(body: any) {
    this.status(411).send(body);
  }

  PreconditionFailed(body: any) {
    this.status(412).send(body);
  }

  RequestEntityTooLarge(body: any) {
    this.status(413).send(body);
  }

  RequestURITooLong(body: any) {
    this.status(414).send(body);
  }

  UnsupportedMediaType(body: any) {
    this.status(415).send(body);
  }

  RequestedRangeNotSatisfiable(body: any) {
    this.status(416).send(body);
  }

  ExpectationFailed(body: any) {
    this.status(417).send(body);
  }

  EnhanceYourCalm(body: any) {
    this.status(420).send(body);
  }

  UnprocessableEntity(body: any) {
    this.status(422).send(body);
  }

  Locked(body: any) {
    this.status(423).send(body);
  }

  FailedDependency(body: any) {
    this.status(424).send(body);
  }

  UpgradeRequired(body: any) {
    this.status(426).send(body);
  }

  PreconditionRequired(body: any) {
    this.status(428).send(body);
  }

  TooManyRequests(body: any) {
    this.status(429).send(body);
  }

  RequestHeaderFieldsTooLarge(body: any) {
    this.status(431).send(body);
  }

  NoResponse(body: any) {
    this.status(444).send(body);
  }

  RetryWith(body: any) {
    this.status(449).send(body);
  }

  BlockedbyWindowsParentalControls(body: any) {
    this.status(450).send(body);
  }

  UnavailableForLegalReasons(body: any) {
    this.status(451).send(body);
  }

  ClientClosedRequest(body: any) {
    this.status(499).send(body);
  }
}
