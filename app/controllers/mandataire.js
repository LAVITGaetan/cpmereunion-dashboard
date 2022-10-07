const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addMandataire = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        description: req.body.description,
        logo: path
    }
    instance.post(`/mandataires`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} ajouté à la liste des mandataires`);
            res.redirect(`/mandataires`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add mandataire' })
        })
}

exports.editMandataire = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        description: req.body.description,
        logo: path
    }
    instance.patch(`/mandataires/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} modifié`);
            res.redirect(`/mandataires`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit mandataire' })
        })
}

exports.deleteMandataire = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/mandataires/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', `Mandataire supprimé`);
            res.redirect(`/mandataires`)
        })
        .catch((error) => {
            res.send({ error: 'Impossible de supprimer le mandataire' })
        })
}