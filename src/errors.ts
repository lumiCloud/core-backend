// lumiCloud [core-backend] errors.ts
// Error middleware and error definition

import { type Request, type Response, type NextFunction } from 'express'
import { ZodError } from 'zod'

export interface AppErrorProps {
	status?: string
	code: number
	message: string
	details?: unknown
}

/**
 * Http error, status is a lc status like IVLD_SESS, code is the associated http code, message is a description of the error to be sent to the client
 */
export class AppError extends Error {
	status?: string
	code: number
	details?: unknown

	constructor({ status, code, message, details }: AppErrorProps) {
		super(message)
		this.name = 'AppError'
		if (status !== undefined) this.status = status
		this.code = code
		if (details !== undefined) this.details = details
	}
}
/** Middleware for handling errors */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
	if (err instanceof AppError) {
		res.status(err.code).json({
			status: err.status,
			message: err.message,
			details: err.details,
		})
	} else if (err instanceof ZodError) {
		res.status(400).json({ message: 'Bad Request' })
	} else {
		res.status(500).json({ message: 'Internal Server Error' })
		throw err
	}
}
