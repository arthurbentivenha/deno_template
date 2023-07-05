import { Context } from 'oak'

export const erroHelper = (err: Error, ctx: Context, status?: number) => {
	let message = err.message
	if (!status) {
		status = 500
	}
	if (err.name == 'ZodError') {
		message = JSON.parse(err.message)
	}
	ctx.response.status = status
	ctx.response.body = { status: err.name, message: message }
}
