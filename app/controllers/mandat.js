const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addMandat = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        label: req.body.label,
        nom: req.body.nom,
        composition: req.body.composition,
        categorie: req.body.categorie,
        mission: req.body.mission,
        duree: req.body.duree,
        renouvellement: req.body.renouvellement,
        logo: path
    }
    instance.post(`/mandats`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.label} ajouté à la liste des mandats`);
            res.redirect(`/mandats`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add mandat' })
        })
}

exports.editMandat = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        label: req.body.label,
        nom: req.body.nom,
        categorie: req.body.categorie,
        composition: req.body.composition,
        mission: req.body.mission,
        duree: req.body.duree,
        renouvellement: req.body.renouvellement,
        logo: path
    }
    instance.patch(`/mandats/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} modifié`);
            res.redirect(`/mandats`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit mandat' })
        })
}

exports.deleteMandat = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/mandats/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', `Mandat supprimé`);
            res.redirect(`/mandats`)
        })
        .catch((error) => {
            res.send({ error: 'Impossible de supprimer cet mandat' })
        })
}