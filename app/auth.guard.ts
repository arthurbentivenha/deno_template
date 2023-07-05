import { Context } from 'https://deno.land/x/oak@v12.5.0/mod.ts'
import { erroHelper } from './helpers/erro.helper.ts'

export class AuthGuard {
    constructor() { }

    async verificarAcesso(
        roles: [],
        ctx: Context,
        next: () => Promise<unknown>,
    ) {
        //new Error("teste");
        try {
            if (!roles) {
                return next()
            }
            ctx.state.database = 'acorde'
            await next()
            delete ctx.state.database

            if (ctx.state.err) {
                throw new Error(ctx.state.err.message)
            }
        } catch (err) {
            let errTemp = err
            if (ctx.state.err) {
                errTemp = ctx.state.err
                delete ctx.state.err.message
            }
            erroHelper(errTemp, ctx, 401)
        }
    }
}
