const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addSondage = (req, res) => {
    const token = req.cookies.token;
    let payload = {
        nom: req.body.nom,
        titre: req.body.titre,
        parution: req.body.parution,
    }
    instance.post(`/sondages`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} ajouté à la liste des sondages`);
            res.redirect(`/sondages`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot add sondage' })
        })
}

exports.editSondage = (req, res) => {
    const token = req.cookies.token;
    let payload = {
        nom: req.body.nom,
        titre: req.body.titre,
        parution: req.body.parution,
    }
    instance.patch(`/sondages/${req.params.id}`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `${req.body.nom} modifié`);
            res.redirect(`/sondages`)
        })
        .catch((error) => {
            console.log(error);
            res.send({ error: 'Cannot edit sondage' })
        })
}

exports.deleteSondage = (req, res) => {
    const token = req.cookies.token;
    instance.delete(`/sondages/${req.params.id}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            req.flash('message', `Sondage supprimé`);
            res.redirect(`/sondages`)
        })
        .catch((error) => {
            req.flash('message', `Impossible de supprimer le sondage`);
            res.redirect(`/sondages`)})
}

exports.editParution = (req, res) => {
    const token = req.cookies.token;
    instance.patch(`/sondages/parution/${req.params.id}/${req.params.boolean}`, {}, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            req.flash('message', `Parution du sondage modifiée`)
            res.redirect(`/profil-sondage?id=${req.params.id}`)
        })
        .catch((error) => {
            req.flash('message', `IMpossible de modifier la parution du sondage`)
            res.redirect(`/profil-sondage?id=${req.params.id}`)
        })
}