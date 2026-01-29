// lumiCloud [core-backend] express.d.ts
// Express Request type expansion 

import 'express-serve-static-core'

declare module 'express-serve-static-core' {
	interface Request {
		tokens: {
			prefers: boolean
            cookie?: string
            specified?: string
		}
	}
}
