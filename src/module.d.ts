// lumiCloud [core-backend] module.d.ts
// Module declaration

import type { NextFunction, Request, Response } from 'express'
import type { AppErrorProps } from './errors.ts'

declare module 'core-backend' {
	export type { AppErrorProps }

	export class AppError extends Error {
		status?: string
		code: number
		details?: unknown

		constructor(props: AppErrorProps)
	}

	export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction): void

	export function getTokenMiddleware(req: Request, res: Response, next: NextFunction): void
}
