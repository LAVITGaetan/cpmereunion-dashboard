const axios = require('axios')
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.login = async (req, res) => {
    instance.post(`/users/login`, {
        email: req.body.email,
        identifiant: req.body.identifiant
    })
        .then((response) => {
            if(response.data.token) {
                res.cookie('token', response.data.token, {
                    secure: true,
                    httpOnly: true,
                    maxAge: 3600 * 60 * 24,
                }).redirect('/accueil')
            }
            else {
                req.flash('message', 'Erreur lors de la connexion, vérifiez vos informations.');
                res.redirect('/')
            }

        })
        .catch((err) => {
            req.flash('message', 'Une erreur est survenue. Réesayez');
            res.redirect('/')
        })
}

exports.logout = (req, res) => {
    req.flash('message', 'Deconnexion réussie.');
    res.clearCookie('token').redirect('/')
}