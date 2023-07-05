import { config } from 'dotenv'
import { Application, Context } from 'oak'
import { logger, logSetup } from './helpers/log.helper.ts'
import { Routes } from './routes/routes.ts'
import { initDatbase } from './helpers/database.helper.ts'

export class App {
	app = new Application()

	constructor() {
		logSetup()
		this.initRotas()
		this.setRotaPadrao()

		initDatbase().then(() => {
			this.start()
		})
	}

	initRotas() {
		this.app.use(new Routes().init())
	}

	setRotaPadrao() {
		this.app.use((ctx: Context) => {
			ctx.response.status = 404
			ctx.response.body = {
				status: 'NotFound',
				message: 'Solicitação não encontarda.',
			}
		})
	}

	start() {
		this.app.addEventListener('error', (evt) => {
			logger().error(`Erro - ${evt.error}`)
		})
		this.app.addEventListener('listen', (_evt) => {
			logger().info(`Pronto - Porta: ${config().PORT}`)
		})
		this.app.listen({ port: parseInt(config().PORT) })
	}
}
