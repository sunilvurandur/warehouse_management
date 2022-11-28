'use strict';

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
