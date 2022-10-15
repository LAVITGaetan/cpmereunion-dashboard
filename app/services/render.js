const axios = require('axios')
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.login = async (req, res) => {
    res.render('pages/login', { title: 'Connexion', message: req.flash('message') })
}

exports.homeRoutes = async (req, res) => {
    const token = req.cookies.token;
    try {
        const adherents = await instance.get('/adherents', {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/accueil', { title: 'Accueil', adherents: adherents.data, message: req.flash('message') })
    } catch (error) {
        res.redirect('/');
    }
}

// Adhérents
exports.getAdherents = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/adherents`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherents/liste', { title: 'Liste des adhérents', adherents: fetch.data, message: req.flash('message') })
    } catch (error) {
        res.redirect('/');
    }
}

exports.getAdherent = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_contacts = await instance.get(`/contacts/adherent/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherents/profil', { title: 'Profil adhérent', adherent: fetch.data, contacts: fetch_contacts.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.addAdherent = (req, res) => {
    res.render('pages/adherents/add', { title: 'Ajouter un adhérent' })
}

exports.editAdherent = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherents/edit', { title: 'Modifier un adhérent', adherent: fetch.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.addAdherentContact = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/adherents/add-contact', { title: 'Ajouter un contact', adherent: fetch.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.editAdherentContact = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/adherents/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })

        console.log('contact id:' + req.query.contact);
        let fetch_contact = await instance.get(`/contacts/${req.query.contact}`, {
            headers: {
                'auth-token': token
            }
        })


        res.render('pages/adherents/edit-contact', { title: 'Modifier un contact', adherent: fetch.data, contact: fetch_contact.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

// Mandats 
exports.getMandats = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/mandats`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await instance.get(`/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandats/liste', { title: 'Liste des mandats', mandats: fetch.data, representations: fetch_representations.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.getMandat = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_mandat = await instance.get(`/mandats/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_mandataires = await instance.get(`/mandataires`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await instance.get(`/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandats/profil', { title: 'Profil mandat', mandat: fetch_mandat.data, mandataires: fetch_mandataires.data, representations: fetch_representations.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.addMandat = (req, res) => {
    res.render('pages/mandats/add', { title: 'Ajouter un mandat' })
}

exports.editMandat = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/mandats/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandats/edit', { title: 'Modifier un mandat', mandat: fetch.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

// Mandataires 
exports.getMandataires = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/mandataires`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await instance.get(`/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandataires/liste', { title: 'Liste des mandataires', mandataires: fetch.data, representations: fetch_representations.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.getMandataire = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_mandataire = await instance.get(`/mandataires/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_mandats = await instance.get(`/mandats`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_representations = await instance.get(`/representations`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandataires/profil', { title: 'Profil mandataire', mandataire: fetch_mandataire.data, mandats: fetch_mandats.data, representations: fetch_representations.data, message: req.flash('message') })

    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.addMandataire = (req, res) => {
    res.render('pages/mandataires/add', { title: 'Ajouter un mandataire' })
}

exports.editMandataire = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/mandataires/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/mandataires/edit', { title: 'Modifier un mandataire', mandataire: fetch.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

// Sondages
exports.getSondages = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch = await instance.get(`/sondages`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/sondages/liste', { title: 'Liste des sondages', sondages: fetch.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.getSondage = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_sondage = await instance.get(`/sondages/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_questions = await instance.get(`/sondages/${req.query.id}/questions`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_reponses = await instance.get(`/sondages/${req.query.id}/reponses`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/sondages/profil', { title: 'Profil sondage', sondage: fetch_sondage.data, questions: fetch_questions.data, reponses: fetch_reponses.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.addSondage = (req, res) => {
    res.render('pages/sondages/add', { title: 'Nouveau sondage' })
}

exports.editSondage = async (req, res) => {
    const token = req.cookies.token;
    try {
        let fetch_sondage = await instance.get(`/sondages/${req.query.id}`, {
            headers: {
                'auth-token': token
            }
        })
        let fetch_questions = await instance.get(`/sondages/${req.query.id}/questions`, {
            headers: {
                'auth-token': token
            }
        })
        res.render('pages/sondages/edit', { title: 'ProfEditer un sondage', sondage: fetch_sondage.data, questions: fetch_questions.data, message: req.flash('message') })
    } catch (error) {
        req.flash('message', 'Connectez-vous pour accéder à cette page')
        res.redirect('/')
    }
}

exports.resultSondage = (req, res) => {
    const token = req.cookies.token;
    res.render('pages/sondage/result', { title: 'Réponses au sondage' })
}

exports.publicLogin = (req, res) => {
    res.render('pages/public/login-sondage', { message: req.flash('message'), title:'Connexion' })
}

exports.publicSondages = async (req, res) => {
    try {
        let fetch = await instance.get(`/sondages`)
        res.render('pages/public/liste-sondages', { sondages: fetch.data, message: req.flash('message'), title:'Sondages' })
    } catch (error) {
        console.log(error);
        req.flash('message', 'Une erreur est survenue')
        res.redirect('/public')
    }
}


exports.publicSondage = async (req, res) => {
    try {
        let fetch = await instance.get(`/sondages/${req.params.id}`)
        let fetch_questions = await instance.get(`/sondages/${req.params.id}/questions`)
        res.render('pages/public/sondage', { sondage: fetch.data, questions: fetch_questions.data, message: req.flash('message'), title:'Sondage' })
    } catch (error) {
        console.log(error);
        req.flash('message', 'Une erreur est survenue')
        res.redirect('/public/sondages')
    }
}