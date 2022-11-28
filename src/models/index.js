'use-strict'
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
/**
 * @typedef {import('sequelize').ModelType} ModelType
 * @typedef {ModelType} Model
 */

/**
 * @typedef {Object} Models
 */

const models = {};
// const dbName = process.env.DATABASE;
const dialect = 'mssql';
// const host = process.env.HOST;
// const userName= process.env.USER;
// const password = process.env.PASSWORD;

const dbName = "dbo";
// const dialect = 'mssql';
const host = "localhost";
const userName= "root";
const password = "admin";

const dbPoolMax = 50;
const dbPoolMin = 20;

const sequelizeOptions = {
    dialect: 'mysql',
    
    host: host,
    pool: {
      max: dbPoolMax,
      min: dbPoolMin,
    },
    freezeTableName: true,
    logging: false, // Comment this line out if you want verbose pgsql console logs
  };
const sequelize = new Sequelize(dbName, userName, password, sequelizeOptions);
// loop through all the models in this directory to load the model
fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach((file) => {
      const makeModel = require(path.join(__dirname, file));
      const model = makeModel(sequelize, Sequelize.DataTypes);
      models[model.name] = model;
    });

// console.log("models",models);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    // models['system_es_index'].DataTypes
    models[modelName].associate(models);
  }
});



models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = {
  models
};
