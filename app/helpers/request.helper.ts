// deno-lint-ignore-file no-explicit-any
import { Reflect } from "reflect_metadata";
import { RouterInterface } from "../interfaces/router.interface.ts";

export const Controller = (prefix: string): ClassDecorator => {
  return (target: any): any => {
    Reflect.defineMetadata("prefix", prefix, target);

    // Since routes are set by our methods this should almost never be true (except the controller has no methods)
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
};

export const Get = (path?: string, roles?: string) => {
  if ((!path) || (path == "/")) {
    path = "";
  }
  return (target: any, propertyKey: string) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor,
    ) as RouterInterface[];
    routes.push({
      requestMethod: "get",
      roles,
      path,
      methodName: propertyKey,
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Post = (path?: string, roles?: string) => {
  if ((!path) || (path == "/")) {
    path = "";
  }
  return (target: any, propertyKey: string) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor,
    ) as RouterInterface[];
    routes.push({
      requestMethod: "post",
      roles,
      path,
      methodName: propertyKey,
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Put = (path?: string, roles?: string) => {
  if ((!path) || (path == "/")) {
    path = "";
  }
  return (target: any, propertyKey: string) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor,
    ) as RouterInterface[];
    routes.push({
      requestMethod: "put",
      roles,
      path,
      methodName: propertyKey,
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};

export const Delete = (path?: string, roles?: string) => {
  if ((!path) || (path == "/")) {
    path = "";
  }
  return (target: any, propertyKey: string) => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      "routes",
      target.constructor,
    ) as RouterInterface[];
    routes.push({
      requestMethod: "delete",
      roles,
      path,
      methodName: propertyKey,
    });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
};