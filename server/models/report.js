'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    report: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Country)
  };
  return Report;
};