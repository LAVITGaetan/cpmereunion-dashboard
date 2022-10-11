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
            if(req.params.ressource === 'mandats') {
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
            if(req.params.ressource === 'mandats') {
                res.redirect(`/profil-mandat?id=${req.body.id_mandat}`)
            }
            else {
                res.redirect(`/profil-mandataire?id=${req.body.id_mandataire}`)
            }
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit representation' })
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
            req.flash('message', `Representation supprimée`);
            console.log('hey : ' + req.params.ressource);
            if(req.params.ressource === 'mandats') {
                res.redirect(`/mandats`)
            }
            else {
                res.redirect(`/mandataires`)
            }
        })
        .catch((error) => {
            res.send({ error: 'Impossible de supprimer le representation' })
        })
}