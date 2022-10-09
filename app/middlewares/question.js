const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addQuestion = (req, res, next) => {
    const token = req.cookies.token;
    let payload = {
        label: req.body.nom,
        required: req.body.titre,
        description: req.body.description,
        type: req.body.type,
        order: req.body.order,
        form_id: req.body.form_id
    }
    instance.post(`/questions`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add question' })
        })
}

exports.editQuestion = (req, res, next) => {
    const token = req.cookies.token;
    let payload = {
        label: req.body.nom,
        required: req.body.titre,
        description: req.body.description,
        type: req.body.type,
        order: req.body.order,
        form_id: req.body.form_id
    }
    instance.patch(`/questions/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit question' })
        })
}

exports.deleteQuestion = (req, res, next) => {
    const token = req.cookies.token;
    instance.delete(`/questions/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Impossible de supprimer ce question' })
        })
}

exports.deleteQuestions = (req, res, next) => {
    const token = req.cookies.token;
    instance.delete(`/questions/all/${req.params.form}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Impossible de supprimer ce question' })
        })
}