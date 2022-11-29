'use strict';

/*
  This file contains DB schema for Products table . key value pais and their dataTypes
  After running node code , node will check for existing tables in dbo database , if this products table is not present it will automatically create a new table based
  on below given schema
*/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
      'products',
      {
        pname: { type: DataTypes.STRING, allowNull: false },
        doexpiry: { type: DataTypes.TEXT, allowNull: true },
        baseprice: { type: DataTypes.INTEGER, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        supname: { type: DataTypes.STRING, allowNull: true },
        qty: { type: DataTypes.INTEGER, allowNull: true },
      },
      {
        timestamps: false
      }
  );
