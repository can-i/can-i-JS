import { Controller } from "../Controller";

export class Error300Controller extends Controller {
  MultipleChoices(body: any) {
    this.status(300).send(body);
  }

  MovedPermanently(body: any) {
    this.status(301).send(body);
  }

  Found(body: any) {
    this.status(302).send(body);
  }

  SeeOther(body: any) {
    this.status(303).send(body);
  }

  NotModified(body: any) {
    this.status(304).send(body);
  }

  UseProxy(body: any) {
    this.status(305).send(body);
  }

  TemporaryRedirect(body: any) {
    this.status(307).send(body);
  }

  PermanentRedirect(body: any) {
    this.status(308).send(body);
  }
}
