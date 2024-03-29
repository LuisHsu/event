import {Sequelize, DataTypes} from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false,
    define:{
        timestamps: false
    }
});

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    question: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answers: {
        type: DataTypes.JSON,
        allowNull: false
    },
    answer_index: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

await Question.sync()

export default Question;