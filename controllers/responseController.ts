import { Response } from 'express';

export const statusResponse = (response: Response, statusCode: number, success: boolean, message: string, data: any) => {
    response.status(statusCode).send({
        success: success,
        message: message,
        payload: data
    });
}