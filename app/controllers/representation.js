const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addRepresentation = (req, res) => {
    const token = req.cookies.token;
    let payload = {
        titre: req.body.titre,
        id_mandat: req.body.id_mandat,
        id_mandataire: req.body.id_mandataire,
    }
    instance.post(`/representations`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `Representation ajoutée`);
            if (req.params.ressource === 'mandats') {
                res.redirect(`/profil-mandat?id=${req.body.id_mandat}`)
            }
            else {
                res.redirect(`/profil-mandataire?id=${req.body.id_mandataire}`)
            }
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add representation' })
        })
}

exports.editRepresentation = (req, res) => {
    const token = req.cookies.token;
    let payload = {
        titre: req.body.titre,
        id_mandat: req.body.id_mandat,
        id_mandataire: req.body.id_mandataire,
    }
    instance.patch(`/representations/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `Représentation modifiée`);
            if (req.params.ressource === 'mandats') {
                res.redirect(`/profil-mandat?id=${req.body.id_mandat}`)
            }
            else {
                res.redirect(`/profil-mandataire?id=${req.body.id_mandataire}`)
            }
        })
        .catch((error) => {
            req.flash('message', `Impossible de modifier la représentation`);
            res.redirect(`/${req.params.ressource}`)
        })
}

exports.deleteRepresentation = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/representations/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', `Représentation supprimée`);
            if (req.params.ressource === 'mandats') {
                res.redirect(`/profil-mandat?id=${req.params.id_mandat}`)
            }
            else {
                res.redirect(`/profil-mandataire?id=${req.params.id_mandataire}`)
            }
        })
        .catch((error) => {
            req.flash('message', `Impossible d' ajouter la représentation`);
            res.redirect(`/${req.params.ressource}`)
        })
}