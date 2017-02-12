import { CommunicationController } from './CommunicationController';
import AppGetter from '../App/AppGetter';
import * as express from 'express';



/**
 * Provides access to the express application
 */
export class ApplicationController{
    get App(): express.Application {
        return AppGetter()
    }
}