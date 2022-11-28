'use strict';

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
