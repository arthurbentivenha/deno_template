import { Context } from 'https://deno.land/x/oak@v12.5.0/mod.ts'
import { Controller, Get } from '../helpers/request.helper.ts'

@Controller('/teste')
export class TesteController {
	constructor() { }

	@Get('/')
	consultar(ctx: Context) {
		const teste: any = async () => await this.teste();
		//const teste2 = async () => await fetch('https://jsonplaceholder.typicode.com/todos/1')
		ctx.response.body = teste
	}

	teste() {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				const dados = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json());
				//console.log(dados);
				resolve(dados);
			}, 1000);
		});

	}
}
