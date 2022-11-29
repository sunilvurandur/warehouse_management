'use strict';

/*
  This file contains DB schema for Store Requests table . key value pais and their dataTypes
  After running node code , node will check for existing tables in dbo database , if this Store Requests table is not present it will automatically create a new table based
  on below given schema
*/

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
      'store_requests',
      {
        req_desc: { type: DataTypes.TEXT, allowNull: false },
        qty_req: { type: DataTypes.INTEGER, allowNull: false },
        req_status: { type: DataTypes.STRING, allowNull: true },
        wh_comments: { type: DataTypes.TEXT, allowNull: true },
        pname: { type: DataTypes.STRING, allowNull: true },
        sname: { type: DataTypes.STRING, allowNull: true },
        wname: { type: DataTypes.STRING, allowNull: true },
      },
      {
      }
  );
