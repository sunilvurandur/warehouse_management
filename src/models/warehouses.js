'use strict';

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
