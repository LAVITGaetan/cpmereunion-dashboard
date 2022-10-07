const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addAdherent = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        entreprise: req.body.entreprise,
        activite: req.body.activite,
        adresse: req.body.adresse,
        section: req.body.section,
        email: req.body.email,
        identifiant: req.body.identifiant,
        telephone: req.body.telephone,
        siteweb: req.body.siteweb,
        nom: req.body.nom,
        prenom: req.body.prenom,
        logo: path
    }
    instance.post(`/adherents`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} ajouté à la liste des adherents`);
            res.redirect(`/adherents`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add adherent' })
        })
}

exports.editAdherent = (req, res) => {
    const token = req.cookies.token;
    let path = '';
    if (req.file) {
        path = req.file.path.substring(7);
    }
    else {
        path = '';
    }
    let payload = {
        entreprise: req.body.entreprise,
        activite: req.body.activite,
        adresse: req.body.adresse,
        section: req.body.section,
        email: req.body.email,
        identifiant: req.body.identifiant,
        telephone: req.body.telephone,
        siteweb: req.body.siteweb,
        nom: req.body.nom,
        prenom: req.body.prenom,
        logo: path
    }
    instance.patch(`/adherents/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} modifié`);
            res.redirect(`/adherents`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit adherent' })
        })
}

exports.deleteAdherent = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/adherents/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', `Adherent supprimé`);
            res.redirect(`/adherents`)
        })
        .catch((error) => {
            res.send({ error: 'Impossible de supprimer cet adherent' })
        })
}

exports.editParution = (req, res) => {
    const token = req.cookies.token;
    instance.patch(`/adherents/parution/${req.params.id}/${req.params.boolean}`, {}, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `Parution de l' adhérent modifiée`)
            res.redirect(`/adherents`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit parution' })
        })
}

exports.editStatus = (req, res) => {
    const token = req.cookies.token;
    instance.patch(`/adherents/status/${req.params.id}/${req.params.boolean}`, {}, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `Statut de l' adhérent modifié`)
            res.redirect(`/adherents`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit parution' })
        })
}