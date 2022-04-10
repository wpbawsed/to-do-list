import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm'
import {GqlArgumentsHost, GqlContextType} from '@nestjs/graphql';

const globalResponseError: (statusCode: number, message: string, request: Request) => IResponseError = (
	statusCode: number,
	message: string,
	request: Request
): IResponseError => {
	return {
		statusCode,
		message,
		timestamp: new Date().toISOString(),
		path: request.url,
		method: request.method
	}
}

interface IResponseError {
	statusCode: number
	message: string
	timestamp: string
	path: string
	method: string
}

interface ExceptionResponse {
	message: string
	errors: object
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const request = ctx.getRequest()
		let message = exception.message || 'error message not defined'
		let status = exception.status || 500
		let stack = exception.stack

		switch (exception.constructor) {
			case QueryFailedError:  // this is a TypeOrm error
				status = HttpStatus.UNPROCESSABLE_ENTITY
				message = (exception as QueryFailedError).message
				break
			case EntityNotFoundError:  // this is another TypeOrm error
				status = HttpStatus.UNPROCESSABLE_ENTITY
				message = (exception as EntityNotFoundError).message
				break
			case CannotCreateEntityIdMapError: // and another
				status = HttpStatus.UNPROCESSABLE_ENTITY
				message = (exception as CannotCreateEntityIdMapError).message
				break
			case HttpException:
				const exceptionRes = (exception as HttpException).getResponse() as ExceptionResponse
				const errors = exceptionRes.errors ? Object.keys(exceptionRes.errors).reduce((acc, key) => {
					return `${acc}${exceptionRes.errors[key]}\n`
				}, '') : ''
				stack = `${errors}${stack}`
				message = errors || message
				break
		}

		Logger.error(`${status}`, `${stack}`, `Error`)

		if (host.getType() === 'http') {
			response.status(status).json(globalResponseError(status, message, request))
		} else if (host.getType<GqlContextType>() === 'graphql') {
			if (!exception.type) {
				exception.type = exception.constructor?.name || exception.message;
			}
			if (!exception.code) {
				exception.code = exception.status;
			}
			return exception;
		}
	}
}
