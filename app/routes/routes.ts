// deno-lint-ignore-file no-explicit-any
import { Context, Router } from "oak";
import { Reflect } from "reflect_metadata";
import { TesteController } from "../controllers/teste.controller.ts";
import { RouterInterface } from "../interfaces/router.interface.ts";
import { AuthGuard } from "../auth.guard.ts";

export class Routes {
  router: any = new Router();
  controllers = [TesteController];

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.controllers.forEach((Controller) => {
      const instance: any = new Controller();
      const prefix = Reflect.getMetadata("prefix", Controller);
      const routes = Reflect.getMetadata("routes", Controller);
      routes.forEach((item: RouterInterface) => {
        this.router[item.requestMethod](
          prefix + item.path, (ctx: Context, next: any) => new AuthGuard().verificarAcesso(item.roles, ctx, next),
          (ctx: Context, next: any) => { instance[item.methodName](ctx, next) }
        );
      });
    });
  }

  init() {
    this.router.allowedMethods();
    return this.router.routes();
  }
}
