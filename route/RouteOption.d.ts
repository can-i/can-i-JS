/// <reference types="express" />
import Express = require("express");
export interface RouteOption {
    route_name: string;
    route_function: Express.RequestHandler;
}
