'use strict';

/*
  This file contains DB schema for warehouse  table . key value pais and their dataTypes
  After running node code , node will check for existing tables in dbo database , if this warehouse  table is not present it will automatically create a new table based
  on below given schema
*/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
      'warehouses',
      {
        wname: { type: DataTypes.STRING, allowNull: false },
        wmanager: { type: DataTypes.TEXT, allowNull: false },
        wmobile: { type: DataTypes.STRING, allowNull: true },
        wemail: { type: DataTypes.STRING, allowNull: true },
        waddress: { type: DataTypes.TEXT, allowNull: true }
      },
      {
        timestamps: false
      }
  );
