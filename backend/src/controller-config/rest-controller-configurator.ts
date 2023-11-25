import {Express} from "express";
import {logger} from "../services/s9logger";
import {userService} from "../server";
import {getForbiddenErrorResponseHandling} from "../util/util";
import {ERROR_USER_IS_NOT_ADMIN} from "../constants/error-texts";

export const cors = require('cors');
export class ErrorResponse {
    code: ResponseCode;
    message: string;

    constructor(init: Partial<ErrorResponse>) {
        this.code = init.code;
        this.message = init.message;
    }

    toPromise() {
        return Promise.resolve(this);
    }
}


export const APP_REST_PREFIX = '/em/api/rest';

export enum ResponseCode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    CONFLICTING = 409,
    INTERNAL_ERROR = 500
}

export const RESPONSE_CODES = [ResponseCode.INTERNAL_ERROR, ResponseCode.BAD_REQUEST, ResponseCode.NOT_FOUND, ResponseCode.FORBIDDEN, ResponseCode.UNAUTHORIZED, ResponseCode.CONFLICTING];

export class RestControllerConfigurator {

    app: Express;
    prefix: string = '';
    readonly corsOptions = {
        origin: process.env.WEBAPP_ORIGIN,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

    constructor(app: Express, prefix?: string) {
        this.app = app;
        this.prefix = prefix ? prefix : '';
    }

    addPrefix(prefix: string) {
        this.prefix = prefix;
        return this;
    }

    addGetEndPoint(path: string, handleRequest: (req: any, res?: any) => Promise<any>) {
        this.app.get(this.prefix + path, cors(this.corsOptions), this.requestHandling.bind(this, handleRequest));
        return this;
    }

    addPostEndPoint(path: string, handleRequest: (req: any, res: any) => Promise<any>) {
        this.app.post(this.prefix + path, cors(this.corsOptions), this.requestHandling.bind(this, handleRequest));
        return this;
    }

    addAdminGetEndPoint(path: string, handleRequest: (req: any, res?: any) => Promise<any>) {
        this.app.get(this.prefix + path, cors(this.corsOptions), this.adminRequestHandling.bind(this, handleRequest));
        return this;
    }

    addAdminPostEndPoint(path: string, handleRequest: (req: any, res?: any) => Promise<any>) {
        this.app.post(this.prefix + path, cors(this.corsOptions), this.adminRequestHandling.bind(this, handleRequest));
        return this;
    }

    requestHandling(handleRequest: (req: any, res: any) => any, req: any, res: any) {
        try {
            return handleRequest(req, res).then((responseObject: any) => responseHandling(res, responseObject)).catch((e: any) => {
                return onUnknownError(e, res);
            });
        } catch (e) {
            logger.internalError(e);
            return res.sendStatus(Number(ResponseCode.INTERNAL_ERROR));
        }
    }

    adminRequestHandling(handleRequest: (req: any, res: any) => any, req: any, res: any) {
        try {
            return userService.isAdmin(req.user.id)
                .then(isAdmin => {
                    if (isAdmin) {
                        return handleRequest(req, res).then((responseObject: any) => responseHandling(res, responseObject)).catch((e: any) => {
                            return onUnknownError(e, res);
                        });
                    }
                    return responseHandling(res, getForbiddenErrorResponseHandling(ERROR_USER_IS_NOT_ADMIN));
                })
        } catch (e) {
            logger.internalError(e);
            return res.sendStatus(Number(ResponseCode.INTERNAL_ERROR));
        }
    }

}

function onUnknownError(e: any, res: any) {
    logger.internalError(e);
    return res.sendStatus(Number(ResponseCode.INTERNAL_ERROR));
}

//                res.status(400).send("All input is required");

export function responseHandling(res: any, responseObject: any) {
    try {
        if (!responseObject) {
            return;
        }

        if (responseObject instanceof ErrorResponse) {
            if (responseObject.message) {
                return res.status(responseObject.code).send(responseObject.message);
            } else {
                return res.sendStatus(Number(responseObject));
            }
        }

        if (RESPONSE_CODES.includes(responseObject)) {
            return res.sendStatus(Number(responseObject));
        }

        if (typeof responseObject === 'string') {
            return res.send(responseObject);
        }

        if (responseObject instanceof Map) {
            const stringifiedMap = JSON.stringify(Array.from(responseObject.entries()));
            return res.send(stringifiedMap)
        }

        return res.send(JSON.stringify(responseObject));
    } catch (e) {
        logger.internalError(e);
        return res.status(ResponseCode.INTERNAL_ERROR).send('could not send/process response');
    }
}