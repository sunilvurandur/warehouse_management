'use strict';

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
