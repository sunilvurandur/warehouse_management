'use strict';

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
