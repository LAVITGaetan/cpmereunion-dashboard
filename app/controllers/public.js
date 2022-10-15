const axios = require('axios')
require('dotenv').config();

const instance = axios.create({
    baseURL: process.env.API_URL,
})

exports.login = async (req, res) => {
    instance.post(`/adherents/login`, {
        email: req.body.email,
        identifiant: req.body.identifiant
    })
        .then((response) => {
            if (response.data.token) {
                res.cookie('token', response.data.token, {
                    secure: true,
                    httpOnly: true,
                    maxAge: 3600 * 60 * 24,
                }).redirect('/public/sondages')
            }
            else {
                req.flash('message', 'Erreur lors de la connexion, vérifiez vos informations.');
                res.redirect('/public')
            }

        })
        .catch((err) => {
            req.flash('message', 'Une erreur est survenue. Réesayez');
            res.redirect('/')
        })
}

exports.submit = async (req, res) => {
    const token = req.cookies.token
    try {
        instance.get(`/sondages/${req.params.id}/questions`)
            .then(response => {
                let array = []
                response.data.forEach(el => {
                    id = el._id;
                    let payload = {
                        question_id: id,
                        label: el.label,
                        form_id: req.params.id,
                        value: req.body[id],
                        auteur: 'anonym'
                    }
                    array.push(payload)

                })
                try {
                    axios.all(array.map((item) => instance.post(`/reponses`, item, {
                        headers: {
                            'auth-token': token
                        }
                    }).then(response => console.log(response.data))))
                } catch (error) {
                    console.log(error);
                }
                res.render('pages/public/result', { array: array, message: req.flash('message'), title: 'Vos réponses' })
            })
    } catch (error) {
        console.log(error);
        res.send({ error: 'some error happened' })
    }
}