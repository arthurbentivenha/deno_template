import { Context } from 'https://deno.land/x/oak@v12.5.0/mod.ts'
import { Controller, Get } from '../helpers/request.helper.ts'

@Controller('/teste')
export class TesteController {
	constructor() {}

	@Get('/')
	consultar(ctx: Context) {
		ctx.response.body = 'teste'
	}
}
