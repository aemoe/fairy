'use strict'

export default function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        uid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV1
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {freezeTableName: true});

    return User;
};
