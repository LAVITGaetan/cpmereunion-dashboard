const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addContact = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        titre: req.body.titre,
        nom: req.body.titre,
        prenom: req.body.email,
        email: req.body.email,
        telephone: req.body.telephone,
        linkedin: req.body.linkedin,
        id_adherent: req.body.id_adherent,
    }
    instance.post(`/contacts`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} ajouté à la liste des contacts`);
            res.redirect(`/profil-adherent?id=${req.body.id_adherent}`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add contact' })
        })
}

exports.editContact = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        titre: req.body.titre,
        nom: req.body.titre,
        prenom: req.body.email,
        email: req.body.email,
        telephone: req.body.telephone,
        linkedin: req.body.linkedin,
        id_adherent: req.body.id_adherent,
    }
    instance.patch(`/contacts/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} modifié`);
            res.redirect(`/profil-adherent?id=${req.body.id_adherent}`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit contact' })
        })
}

exports.deleteContact = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/contacts/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', `Contact supprimé`);
            res.redirect(`/profil-adherent?id=${req.body.id_adherent}`)
        })
        .catch((error) => {
            res.send({ error: 'Impossible de supprimer cet contact' })
        })
}
