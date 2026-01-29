// lumiCloud [core-backend] get-sess.ts
// Middleware for getting session tokens from incoming requests

import { type NextFunction, type Request, type Response } from 'express'

/**
 * Get session token from incoming request (if present)
 */
export default function getTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
	const cookieToken = req.cookies?.sess as string | undefined
	const authHeaderToken = (req.headers.authorization || req.headers.Authorization) as string | undefined

	let bodyToken: string | undefined
	if (req.body && typeof req.body === 'object') {
		const maybeToken = (req.body as any).token
		if (typeof maybeToken === 'string') {
			bodyToken = maybeToken
		}
	} else if (typeof req.body === 'string') {
		try {
			const parsed = JSON.parse(req.body)
			if (parsed && typeof parsed.token === 'string') {
				bodyToken = parsed.token
			}
		} catch {}
	}

	const hasPrefersTokensHeader =
		typeof req.header === 'function'
			? Boolean(req.header('X-Prefers-Tokens'))
			: Boolean((req.headers['x-prefers-tokens'] || req.headers['X-Prefers-Tokens']) as string | undefined)

	req.tokens.prefers = hasPrefersTokensHeader

	if (cookieToken) {
		req.tokens.cookie = cookieToken
	}

	if (authHeaderToken) {
		req.tokens.specified = authHeaderToken
	} else if (bodyToken) {
		req.tokens.specified = bodyToken
	}

	return next()
}
