import Question from "./model/question.js";

function get_questions(_, res){
    Question.findAll().then(questions => questions.map(question => question.toJSON()))
    .then(questions => {
        res.end(JSON.stringify(questions))
    })
}

function add_question(req, res){
    Question.create(req.body)
    .then(data => data.toJSON())
    .then(JSON.stringify)
    .then(data => {res.end(data)})
}

function delete_question(req, res){
    Question.destroy({where: req.body})
    .then(JSON.stringify)
    .then(data => {res.end(data)})
}

function update_question(req, res){
    Question.update(req.body, {where: {id: req.body.id}})
    .then(JSON.stringify)
    .then(data => {res.end(data)})
}

function QuestionAPI(app){
    app.get("/questions", get_questions)
    app.put("/question", add_question)
    app.delete("/question", delete_question)
    app.post("/question", update_question)
}

export default QuestionAPI;