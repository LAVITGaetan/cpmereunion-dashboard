const express = require('express');
const app = express();
const services = require('./app/services/render');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const cors = require('cors')
const flash = require('connect-flash');
const authentication = require('./app/controllers/authentication');
const adherentRoutes = require('./app/routes/adherent')
const mandatRoutes = require('./app/routes/mandat')
const mandataireRoutes = require('./app/routes/mandataire')
const contactRoutes = require('./app/routes/contact')
const representationRoutes = require('./app/routes/representation')
const sondageRoutes = require('./app/routes/sondage')

// Security 
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/*"],
            "style-src": null,
        }
    }
}));
app.use(cors({
    origin: ['https://cpmereunion-api.herokuapp.com/']
}))

// Session && Cookies
app.use(cookieParser())
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

// Set view engine
app.set('view engine', 'ejs')

// Static Files
app.use(express.static('public'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication
app.post('/login', authentication.login)
app.get('/logout', authentication.logout)

// Routes api
app.use('/adherents', adherentRoutes);
app.use('/contacts', contactRoutes);
app.use('/mandats', mandatRoutes);
app.use('/mandataires', mandataireRoutes);
app.use('/representations', representationRoutes);
app.use('/sondages', sondageRoutes);

// Routes login && index
app.get('/', services.login);
app.get('/accueil', services.homeRoutes);

// Routes adherents
app.get('/adherents', services.getAdherents)
app.get('/profil-adherent', services.getAdherent)
app.get('/add-adherent', services.addAdherent)
app.get('/edit-adherent', services.editAdherent)
app.get('/add-contact', services.addAdherentContact)
app.get('/edit-contact', services.editAdherentContact)

// Routes mandats
app.get('/mandats', services.getMandats)
app.get('/profil-mandat', services.getMandat)
app.get('/add-mandat', services.addMandat)
app.get('/edit-mandat', services.editMandat)

// Routes mandataires
app.get('/mandataires', services.getMandataires)
app.get('/profil-mandataire', services.getMandataire)
app.get('/add-mandataire', services.addMandataire)
app.get('/edit-mandataire', services.editMandataire)

// Routes sondages
app.get('/sondages', services.getSondages)
app.get('/profil-sondage', services.getSondage)
app.get('/add-sondage', services.addSondage)
app.get('/edit-sondage', services.editSondage)

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`); })