'use strict';

/*
  This file contains DB schema for Supplier Requests table . key value pais and their dataTypes
  After running node code , node will check for existing tables in dbo database , if this Supplier Requests table is not present it will automatically create a new table based
  on below given schema
*/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
      'supplier_requests',
      {
        req_desc: { type: DataTypes.TEXT, allowNull: false },
        qty_req: { type: DataTypes.INTEGER, allowNull: false },
        req_status: { type: DataTypes.STRING, allowNull: true },
        pname: { type: DataTypes.STRING, allowNull: true },
        supname: { type: DataTypes.STRING, allowNull: true },
        wname: { type: DataTypes.STRING, allowNull: true },
        sp_comments: { type: DataTypes.TEXT, allowNull: true },
      },
      {
      }
  );
