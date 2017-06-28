"use strict";

function getProductionConfig() {

  /* ===================================== */
  /* THIS IS YOUR PRODUCTION CONFIGURATION */
  /* ===================================== */
  var productionConfig = {
    environment: "PRODUCTION",
    apiUrl: "YourProdURL",
    baseUrl: "/",
      endpoints: {
          ltmb:"F5 URI",
          ltmc:"F5 URI",
          ltmd:"F5 URI"
      }
  };
  /* ===================================== */

  return productionConfig;
};

function getPreProductionConfig() {

  /* ========================================= */
  /* THIS IS YOUR PRE-PRODUCTION CONFIGURATION */
  /* ========================================= */
  var preProductionConfig = {
    environment: "PRE-PRODUCTION",
    apiUrl: "YourPreProdURL",
    baseUrl: "/",
      endpoints: {
          ltmb: "F5 URI",
          ltmc: "F5 URI"
      }
  };
  /* ========================================= */

  return preProductionConfig;
};

function getLocalConfig() {

  /* ================================ */
  /* THIS IS YOUR LOCAL CONFIGURATION */
  /* ================================ */
  var localConfig = {
    environment: "LOCAL",
    apiUrl: "YourLocalURL",
    baseUrl: "/",
      endpoints: {
          ltmb: "F5 URI",
          ltmc: "F5 URI"
      }
  };
  /* ================================ */

  return localConfig;
};

// EXPORT FUNCTIONS
module.exports = {
  getProductionConfig: getProductionConfig,
  getPreProductionConfig: getPreProductionConfig,
  getLocalConfig: getLocalConfig
};
