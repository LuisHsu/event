import Question from "./model/question.js";

function get_questions(_, res){
    Question.findAll().then(questions => questions.map(question => question.toJSON()))
    .then(questions => {
        res.end(JSON.stringify(questions))
    })
}

function add_question(req, res){
    Question.create(req.body).then(() => res.end())
}

function QuestionAPI(app){
    app.get("/questions", get_questions)
    app.put("/question", add_question)
}

export default QuestionAPI;