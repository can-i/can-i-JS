import { Controller } from "./Controller";
import * as express from "express";

export type ControllerConstructor = { new (): Controller };
export class ControllerFactory {
  static CreateBaseController(
    ControllerClass: ControllerConstructor,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let c = new ControllerClass();
    c.req = req;
    c.res = res;
    c.next = next;

    return c;
  }
}
