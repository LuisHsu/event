import {Sequelize, DataTypes} from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

const Guest = sequelize.define("Guest", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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

export default Guest