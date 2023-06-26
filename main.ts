import { App } from "./app/app.ts";

declare global {
  interface Window {
    database: any;
  }
}

new App();