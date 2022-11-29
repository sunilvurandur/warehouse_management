'use strict';

/*
  This file contains DB schema for Supplier table . key value pais and their dataTypes
  After running node code , node will check for existing tables in dbo database , if this Supplier table is not present it will automatically create a new table based
  on below given schema
*/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
      'supplies',
      {
        supname: { type: DataTypes.STRING, allowNull: false },
        supmanager: { type: DataTypes.TEXT, allowNull: false },
        supmobile: { type: DataTypes.STRING, allowNull: true },
        supemail: { type: DataTypes.STRING, allowNull: true }
      },
      {
        timestamps: false
      }
  );
