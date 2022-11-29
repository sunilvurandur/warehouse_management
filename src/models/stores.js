'use strict';

/*
  This file contains DB schema for Store  table . key value pais and their dataTypes
  After running node code , node will check for existing tables in dbo database , if this Store  table is not present it will automatically create a new table based
  on below given schema
*/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
      'stores',
      {
        sname: { type: DataTypes.STRING, allowNull: false },
        smanager: { type: DataTypes.TEXT, allowNull: false },
        smobile: { type: DataTypes.STRING, allowNull: true },
        semail: { type: DataTypes.STRING, allowNull: true },
        saddress: { type: DataTypes.TEXT, allowNull: true }
      },
      {
        timestamps: false
      }
  );
