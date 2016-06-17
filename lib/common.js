
_ = lodash;

log = console.log.bind(console);


isProductionMode = function() {
  return process.env.NODE_ENV == "production";
}
