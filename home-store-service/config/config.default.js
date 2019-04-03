/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};
  config.env = "local";

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553153190620_932';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'homestore',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1001',
  };

  config.security = {
    csrf: {
      enable: false,
      // ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
  
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
