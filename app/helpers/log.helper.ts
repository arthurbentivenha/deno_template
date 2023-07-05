import { getLogger, handlers, setup } from 'log'

export const logSetup = async () => {
	await setup({
		handlers: {
			console: new handlers.ConsoleHandler('DEBUG'),
		},
		loggers: {
			'app': {
				level: 'DEBUG',
				handlers: ['console'],
			},
		},
	})
}

export const logger = () => {
	return getLogger('app')
}
