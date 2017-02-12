/// <reference types="express" />
import { MiddleWareFunction } from '.';
import * as express from 'express';
export declare function Stack(...middleware: MiddleWareFunction[]): express.RequestHandler;
export default Stack;
