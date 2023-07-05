import { DataSource } from 'typeorm'
import { logger } from './log.helper.ts'

const listaDatabases = ['acorde']

export const initDatbase = async () => {
	window.database = []
	logger().info('Banco de dados -> iniciando')
	for (const item of listaDatabases) {
		window.database[item] = new DataSource({
			type: 'postgres',
			host: 'acorde.postgresql.dbaas.com.br',
			port: 5432,
			username: item,
			password: 'Acorde@22',
			database: item,
			entities: [],
			synchronize: false,
			logging: false,
		})
		await window.database[item].initialize()
		logger().info(`Banco de dados -> ${item}: OK`)
	}
	logger().info('Banco de dados -> PRONTO')
}

export const getDatbase = (name: string) => {
	return window.database[name]
}
