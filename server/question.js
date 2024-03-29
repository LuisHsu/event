import Question from "./model/question.js";

function QuestionAPI(app){
    app.get("/questions", (_, res) => {
        Question.findAll().then(questions => questions.map(question => question.toJSON()))
        .then(questions => {
            res.end(JSON.stringify(questions))
        })
    })
}

export default QuestionAPI;