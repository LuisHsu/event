import {Sequelize, DataTypes} from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false,
    define:{
        timestamps: false
    }
});

const Guest = sequelize.define("Guest", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    answer_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    correct_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    speak_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

await Guest.sync()

export default Guest