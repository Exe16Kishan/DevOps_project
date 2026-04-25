import client from "prom-client";

const globalForMetrics = global as unknown as {
  register: client.Registry;
  signupCounter: client.Counter<string>;
  signinCounter: client.Counter<string>;
  pageViewCounter: client.Counter<string>;
  apiCounter: client.Counter<string>;
};

export const register =
  globalForMetrics.register || new client.Registry();

if (!globalForMetrics.register) {
  client.collectDefaultMetrics({
    register,
    prefix: "shop_app_",
  });

  globalForMetrics.signupCounter = new client.Counter({
    name: "signup_requests_total",
    help: "Total signup requests",
    labelNames: ["status"],
    registers: [register],
  });

  globalForMetrics.signinCounter = new client.Counter({
    name: "signin_requests_total",
    help: "Total signin requests",
    labelNames: ["status"], 
    registers: [register],
  });

  globalForMetrics.pageViewCounter = new client.Counter({
    name: "page_views_total",
    help: "Total page views",
    labelNames: ["page"], 
    registers: [register],
  });

  globalForMetrics.apiCounter = new client.Counter({
    name: "api_requests_total",
    help: "Total API requests",
    labelNames: ["route"], 
    registers: [register],
  });

  globalForMetrics.register = register;
}

export const signupCounter = globalForMetrics.signupCounter!;
export const signinCounter = globalForMetrics.signinCounter!;
export const pageViewCounter = globalForMetrics.pageViewCounter!;
export const apiCounter = globalForMetrics.apiCounter!;