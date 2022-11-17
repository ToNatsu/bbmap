'use strict';

module.exports = (sequelize, DataTypes) => {
    const Detail = sequelize.define('Detail', {
        type: DataTypes.STRING,
        name: DataTypes.STRING,
        lonlat: DataTypes.STRING,
        url: DataTypes.STRING
    }, {});
    Detail.associate = function(models) {
        // associations can be defined here
    };
    return Detail;
};