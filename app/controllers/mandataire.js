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
            req.flash('message', `Impossible d\' ajouter le mandataire`);
            res.redirect(`/mandataires`)
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
            res.redirect(`/profil-mandataire?id=${req.params.id}`)
        })
        .catch((error) => {
            req.flash('message', `Impossible de modifier le mandataire`);
            res.redirect(`/profil-mandataire?id=${req.params.id}`)
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