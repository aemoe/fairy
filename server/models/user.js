export default function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username:{
            type:  DataTypes.STRING(20),
            allowNull: false,
            validate: {
              is:/^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{3,16}$/
            }
        },
        nickname: DataTypes.STRING(20),
        password: DataTypes.STRING,
        identifier: DataTypes.STRING(32),
        token: DataTypes.STRING(32),
        email: {
            type:  DataTypes.STRING(32),
            allowNull: false,
            validate: {
              isEmail: true
            }
        },
        regip: DataTypes.STRING(15),
        regdate: DataTypes.INTEGER,
        lastip: DataTypes.STRING(15),
        lastdate: DataTypes.INTEGER,
        UsActiveCode: DataTypes.STRING(36),
        UsActiveTime: DataTypes.INTEGER,
        UsMark: DataTypes.INTEGER,
        UsAuthorityStr: DataTypes.STRING(200)
    });
    User.sync();
    return User;
}
