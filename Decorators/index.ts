import { Injectable, Provides } from '../IOC/index';
import { Singleton } from '../IOC/Singleton';
import { Document } from "../Help/Document";
import { Get, Post, Put, Delete, Use } from '../Route/Method';
import MiddleWare from '../MiddleWare/index';
import Stack from '../MiddleWare/Stack';


export module IOC {
    Injectable;
    Singleton;
    Provides;
}

export module Help {
    Document;
}

export module Route {
    Get;
    Post;
    Put;
    Delete;
    Use;
}

export module Plugin{
    MiddleWare;
    Stack;
}