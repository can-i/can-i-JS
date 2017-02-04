import { Controller } from "../Controller";

export class Error500Controller extends Controller {
    
  InternalServerError(body: any) {
    this.status(500).send(body);
  }

  NotImplemented(body: any) {
    this.status(501).send(body);
  }

  BadGateway(body: any) {
    this.status(502).send(body);
  }

  ServiceUnavailable(body: any) {
    this.status(503).send(body);
  }

  GatewayTimeout(body: any) {
    this.status(504).send(body);
  }

  HTTPVersionNotSupported(body: any) {
    this.status(505).send(body);
  }

  VariantAlsoNegotiates(body: any) {
    this.status(506).send(body);
  }

  InsufficientStorage(body: any) {
    this.status(507).send(body);
  }

  LoopDetected(body: any) {
    this.status(508).send(body);
  }

  BandwidthLimitExceeded(body: any) {
    this.status(509).send(body);
  }

  NotExtended(body: any) {
    this.status(510).send(body);
  }

  NetworkAuthenticationRequired(body: any) {
    this.status(511).send(body);
  }

  NetworkReadTimeoutError(body: any) {
    this.status(598).send(body);
  }

  NetworkConnectTimeoutError(body: any) {
    this.status(599).send(body);
  }
}
