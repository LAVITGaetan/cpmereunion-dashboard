const axios = require('axios')
require('dotenv').config();
const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.addSondage = (req, res) => {
    const token = req.cookies.token;
    let payload = {
        nom: 'Nouveau sondage',
        titre: req.body.titre,
        parution: false,
    }
    instance.post(`/sondages`, payload, {
        headers: {
            'auth-token': token,
        }
    })
        .then((response) => {
            let question_payload = [];
            for (let i = 0; i < req.body.total; i++) {
                question = {
                    label: req.body[`label_${i}`],
                    description: req.body[`description_${i}`],
                    order: i + 1,
                    required: req.body[`required_${i}`] === 'on',
                    form_id: response.data._id,
                    type: req.body[`type_${i}`]
                }
                question_payload.push(question)
            }
            console.log(question_payload);
            try {
                axios.all(question_payload.map((item) => instance.post(`/questions`, item, {
                    headers: {
                        'auth-token': token
                    }
                }).then(response => console.log(response.data))))
            } catch (error) {
                console.log(error);
            }
            req.flash('message', `Nouveau sondage crée`);
            res.redirect(`/sondages`)
        })
        .catch((error) => {
            console.log(error);
            req.flash('message', `Une erreur est survenue lors de la création du sondage`);
            res.redirect('/sondages')
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
            'auth-token': token
        }
    }).then((response) => {
        let question_payload = [];
        for (let i = 0; i < req.body.total; i++) {
            question = {
                label: req.body[`label_${i}`],
                description: req.body[`description_${i}`],
                order: i + 1,
                required: req.body[`required_${i}`] === 'on',
                form_id: req.body.id,
                type: req.body[`type_${i}`],
                old: req.body[`old_${i}`],
                _id: req.body[`id_${i}`] || ''
            }
            question_payload.push(question)
        }
        let old_questions = question_payload.filter(el => el.old === 'true');
        let new_questions = question_payload.filter(el => el.old === 'false');
        try {
            axios.all(new_questions.map((item) => instance.post(`/questions`, item, {
                headers: {
                    'auth-token': token
                }
            }).then(response => console.log(response.data))))
        } catch (error) {
            console.log(error);
        }
        try {
            axios.all(old_questions.map((item) => instance.patch(`/questions/${item._id}`, item, {
                headers: {
                    'auth-token': token
                }
            }).then(response => console.log(response.data))))
        } catch (error) {
            console.log(error);
        }
        req.flash('message', `Sondage ${req.body.titre} modifié.`)
        return res.redirect(`/profil-sondage?id=${req.body.id}`)
    }).catch(err => console.log(err))

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
            res.redirect(`/sondages`)
        })
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