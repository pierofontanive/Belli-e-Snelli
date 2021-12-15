var Express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

// Swagger Documentation
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express")
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Belli&Snelli API",
            description: "Questa pagina contiene tutte le API utilizzate nel Progetto di Ingegneria del Software 2021 'Belli&Snelli'.",
            version: "1.0.0"
        },
        servers: [{var Express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

// Swagger Documentation
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express")
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: "Belli&Snelli API",
            description: "Questa pagina contiene tutte le API utilizzate nel Progetto di Ingegneria del Software 2021 'Belli&Snelli'.",
            version: "1.0.0"
        },
    },
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = Express()

app.use(bodyParser.json())
app.use(Express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

var cors = require('cors')
app.use(cors())

// Stringa di connessione al database MongoDB
const CONNECTION_STRING = "mongodb+srv://unitntest:ingegneriadelsoftware2021@cluster0.f9qns.mongodb.net/IngSwProjectDB?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

// Controllo di connessione al database MongoDB
db.on("error", () => console.log("Errore nella connessione al database"))
db.once("open", () => console.log("Collegato con successo al database"))

// Pagina "index" dell'indirizoo localhost:3000
app.get("/", (req, res) => {
    return res.redirect("http://localhost:3000/login.html");
}).listen(3000)

// Creazione Swagger API-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Controllo delle credenziali di accesso inserite
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           default: test@unitn.it
 *           type: string
 *         password:
 *           default: ingegneriadelsoftware2021
 *           type: string
 * 
 * /login:
 *   post:
 *     tags:
 *       - API
 *     summary: http://localhost:3000/login
 *     description: Verifica le credenziali di accesso
 *     consumes:
 *       - application/json
 *     requestBody:
 *         description: Formato della richiesta contenente le credenziali di accesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 * 
 *     responses:
 *       '200':
 *         description: Login effettuato con successo
 *       '401':
 *         description: Errore nel login (password errata)
 *       '402':
 *         description: Errore nel login (email errata)
 */
app.post("/login", async (req, res) => {
    try {

        // Ottengo le credenziali inserite
        var username = req.body.username;
        var password = req.body.password;

        var userMongo = await db.collection("Utenti").findOne({ email: username });

        // Verifico se le credenziali sono corrette
        if (userMongo.password == password) {
            console.log("Utente verificato");
            res.redirect("home.html");
        }
        else {
            res.status("401").send("Password errata");
            console.log("Password errata");
        } 
    } catch (err) {
        res.status("402").send("Email errata");
        console.log("Email errata");
    }
})

// Ottengo i dati degli esercizi dal database MongoDB
/**
 * @openapi
 * /api/esercizi:
 *   get:
 *     tags:
 *       - API
 *     summary: http://localhost:3000/api/esercizi
 *     description: Ottengo i dati degli esercizi dal database MongoDB
 *     responses:
 *       '200':
 *         description: Elenco degli esercizi ottenuto con successo
 *         content:
 *           application/json: {}
 */
app.get('/api/esercizi', (req, res) => {
    db.collection("Esercizi").find({}).toArray((error, result) => {
        if (error) {console.log(error);}
        res.send(result);
    })
})

// Ottengo i dati delle prenotazioni dal database MongoDB
/**
 * @openapi
 * /api/prenotazioni:
 *   get:
 *     tags:
 *       - API
 *     summary: http://localhost:3000/api/prenotazioni
 *     description: Ottengo i dati delle prenotazioni dal database MongoDB
 *     responses:
 *       '200':
 *         description: Elenco delle prenotazioni ottenuto con successo
 *         content:
 *           application/json: {}
 */
app.get('/api/prenotazioni', (req,res) => {
    db.collection("Prenotazioni").find({}).toArray((err,result) => {
        if (err) {console.log(err);}
        res.send(result);
    })
})



// Inserimento, controllo ed eliminazione delle prenotazioni
/**
 * @swagger
 * components:
 *   schemas:
 *     prenotazione:
 *       type: object
 *       required:
 *         - nome_allenatore
 *         - data
 *         - ora_da
 *         - ora_a
 *         - controller
 *       properties:
 *         nome_allenatore:
 *           default: Mario Rossi
 *           type: string
 *         data:
 *           default: 6/12/2021
 *           type: string
 *         ora_da:
 *           default: 10:30
 *           type: string
 *         ora_a:
 *           default: 11:30
 *           type: string
 *         controller:
 *           default: Prenota
 *           type: string
 * 
 * /new_consulenza:
 *   post:
 *     tags:
 *       - API
 *     summary: http://localhost:3000//new_consulenza
 *     description: Inserimento, controllo ed eliminazione delle prenotazioni
 *     consumes:
 *       - application/json
 *     requestBody:
 *         description: Prenota/Disdici uno slot orario per una consulenza
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/prenotazione'
 * 
 *     responses:
 *       '201':
 *         description: "Prenotazione effettuata"
 *       '202':
 *         description: "Slot già occupato"
 *       '208':
 *         description: "Hai già prenotato questo slot"
 *       '200':
 *         description: "Slot non previsto"
 *       '207':
 *         description: "Prenotazione annullata"
 *       '209':
 *         description: "Stai provando ad eliminare una consulenza che non hai prenotato"
 */
app.post("/new_consulenza", async (req, res) => {
    try {

        // Ottengo le informazioni del giorno,ora di inizio e fine dalla pagina HTML
        var giorno = req.body.data;
        var nome_allenatore = req.body.nome_allenatore;
        var ora_da = req.body.ora_da;
        var ora_a = req.body.ora_a;

        // Ottengo il valore del bottone premuto
        var inputValue = req.body.controller;

        // Compongo i dati inseriti
        var data = { $set: { "giorno": giorno, "ora_inizio": ora_da, "ora_fine": ora_a, "nome_allenatore": nome_allenatore, "prenotato": true, "pr_da_utente": true }}
        var data_reset = { $set: { "giorno": giorno, "ora_inizio": ora_da, "ora_fine": ora_a, "nome_allenatore": nome_allenatore, "prenotato": false, "pr_da_utente": false }}

        // Verifico la disponibilità dell'allenatore
        var prMongo = await db.collection("Prenotazioni").findOne({ giorno: giorno, ora_inizio: ora_da, ora_fine: ora_a, nome_allenatore: nome_allenatore });

        console.log(prMongo);

        // Controllo quale dei due bottoni è stato premuto
        if (inputValue == "Prenota") {
            if (prMongo && (prMongo.giorno == giorno) && (prMongo.ora_inizio == ora_da) && (prMongo.ora_fine == ora_a) && (prMongo.nome_allenatore == nome_allenatore)) {

            // Verifico se lo slot è già stato prenotato dall'utente
            if (prMongo.pr_da_utente) {
                console.log("Hai già prenotato questo slot");
                res.status("208").send("Hai già prenotato questo slot");
            }

            // Verifico se lo slot è prenotato
            if (prMongo.prenotato) {
                console.log("Slot già occupato");
                res.status("202").send("Slot già occupato");
            }
            else {
                console.log("Slot libero");
                db.collection("Prenotazioni").updateOne(prMongo, data, (err,collection) => {
                    if (err) throw err;
                    console.log("Prenotazione effettuata per il giorno "+giorno+" dalle ore "+ora_da+" fino le "+ora_a+" con l'allenatore "+nome_allenatore);
                })
                res.status("201").send("Prenotazione effettuata per il giorno "+giorno+" dalle ore "+ora_da+" fino le "+ora_a+" con l'allenatore "+nome_allenatore);
            }
        } else {
            console.log("Slot non previsto");
            res.status("200").send("Slot non previsto");
        }
        } else if (inputValue == "Elimina") {
            if (prMongo && (prMongo.giorno == giorno) && (prMongo.ora_inizio == ora_da) && (prMongo.ora_fine == ora_a) && (prMongo.nome_allenatore == nome_allenatore) && (prMongo.prenotato) && (prMongo.pr_da_utente)) {
                await db.collection("Prenotazioni").updateOne(prMongo, data_reset, (err,collection) => {
                    if (err) throw err;
                    console.log("Prenotazione annullata ("+giorno+" - "+ora_da+" - "+ora_a+" - "+nome_allenatore+")");
                });
                res.status("207").send("Prenotazione annullata ("+giorno+" - "+ora_da+" - "+ora_a+" - "+nome_allenatore+")");
            } else {
                console.log("Stai provando ad eliminare una consulenza che non hai prenotato");
                res.status("209").send("Stai provando ad eliminare una consulenza che non hai prenotato");
            }
        }
        //res.send(res);
    } catch (err) {
        //cnsole.log(err);
    }
});

// Debug log
console.log("IN ASCOLTO SULLA PORTA 3000");
            url: "http://localhost:3000",
            description: "Server di prova utilizzato per il funzionamento dell'applicazione"
        }]
    },
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = Express()

app.use(bodyParser.json())
app.use(Express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

var cors = require('cors')
app.use(cors())

// Stringa di connessione al database MongoDB
const CONNECTION_STRING = "mongodb+srv://unitntest:ingegneriadelsoftware2021@cluster0.f9qns.mongodb.net/IngSwProjectDB?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

// Controllo di connessione al database MongoDB
db.on("error", () => console.log("Errore nella connessione al database"))
db.once("open", () => console.log("Collegato con successo al database"))

// Pagina "index" dell'indirizoo localhost:3000
app.get("/", (req, res) => {
    return res.redirect("http://localhost:3000/login.html");
}).listen(3000)

// Creazione Swagger API-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Controllo delle credenziali di accesso inserite
/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - API
 *     summary: http://localhost:3000/login
 *     description: Verifica le credenziali di accesso
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Utente
 *         description: Formato della richiesta contenente le credenziali di accesso
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               default: test@unitn.it
 *               type: string
 *             password:
 *               default: ingegneriadelsoftware2021
 *               type: string
 *     responses:
 *       '200':
 *         description: Login effettuato con successo
 *       '401':
 *         description: Errore nel login (password errata)
 *       '402':
 *         description: Errore nel login (email errata)
 */
app.post("/login", async (req, res) => {
    try {

        // Ottengo le credenziali inserite
        var username = req.body.username;
        var password = req.body.password;
        var userMongo = await db.collection("Utenti").findOne({ email: username });

        // Verifico se le credenziali sono corrette
        if (userMongo.password == password) {
            console.log("Utente verificato");
            res.redirect("home.html");
        }
        else {
            res.status("401").send("Password errata");
            console.log("Password errata");
        } 
    } catch (err) {
        res.status("402").send("Email errata");
        console.log("Email errata");
    }
})

// Ottengo i dati degli esercizi dal database MongoDB
/**
 * @openapi
 * /api/esercizi:
 *   get:
 *     tags:
 *       - API
 *     summary: http://localhost:3000/api/esercizi
 *     description: Ottengo i dati degli esercizi dal database MongoDB
 *     responses:
 *       '200':
 *         description: Elenco degli esercizi ottenuto con successo
 *         content:
 *           application/json: {}
 */
app.get('/api/esercizi', (req, res) => {
    db.collection("Esercizi").find({}).toArray((error, result) => {
        if (error) {console.log(error);}
        res.send(result);
    })
})

// Ottengo i dati delle prenotazioni dal database MongoDB
/**
 * @openapi
 * /api/prenotazioni:
 *   get:
 *     tags:
 *       - API
 *     summary: http://localhost:3000/api/prenotazioni
 *     description: Ottengo i dati delle prenotazioni dal database MongoDB
 *     responses:
 *       '200':
 *         description: Elenco delle prenotazioni ottenuto con successo
 *         content:
 *           application/json: {}
 */
app.get('/api/prenotazioni', (req,res) => {
    db.collection("Prenotazioni").find({}).toArray((err,result) => {
        if (err) {console.log(err);}
        res.send(result);
    })
})



// Inserimento, controllo ed eliminazione delle prenotazioni
/**
 * @swagger
 * /new_consulenza:
 *   post:
 *     tags:
 *       - API
 *     summary: http://localhost:3000//new_consulenza
 *     description: Inserimento, controllo ed eliminazione delle prenotazioni
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: prenotazione
 *         description: Prenota/Disdici uno slot orario per una consulenza
 *         schema:
 *           type: object
 *           required:
 *             - nome_allenatore
 *             - data
 *             - ora_da
 *             - ora_a
 *             - controller
 *           properties:
 *             nome_allenatore:
 *               default: Mario Rossi
 *               type: string
 *             data:
 *               default: 6/12/2021
 *               type: string
 *             ora_da:
 *               default: 10:30
 *               type: string
 *             ora_a:
 *               default: 11:30
 *               type: string
 *             controller:
 *               default: Prenota
 *               type: string
 *     responses:
 *       '201':
 *         description: "Prenotazione effettuata"
 *       '202':
 *         description: "Slot già occupato"
 *       '208':
 *         description: "Hai già prenotato questo slot"
 *       '200':
 *         description: "Slot non previsto"
 *       '207':
 *         description: "Prenotazione annullata"
 *       '209':
 *         description: "Stai provando ad eliminare una consulenza che non hai prenotato"
 */
app.post("/new_consulenza", async (req, res) => {
    try {

        // Ottengo le informazioni del giorno,ora di inizio e fine dalla pagina HTML
        var giorno = req.body.data;
        var nome_allenatore = req.body.nome_allenatore;
        var ora_da = req.body.ora_da;
        var ora_a = req.body.ora_a;

        // Ottengo il valore del bottone premuto
        var inputValue = req.body.controller;

        // Compongo i dati inseriti
        var data = { $set: { "giorno": giorno, "ora_inizio": ora_da, "ora_fine": ora_a, "nome_allenatore": nome_allenatore, "prenotato": true, "pr_da_utente": true }}
        var data_reset = { $set: { "giorno": giorno, "ora_inizio": ora_da, "ora_fine": ora_a, "nome_allenatore": nome_allenatore, "prenotato": false, "pr_da_utente": false }}
        
        // Verifico la disponibilità dell'allenatore
        var prMongo = await db.collection("Prenotazioni").findOne({ giorno: giorno, ora_inizio: ora_da, ora_fine: ora_a, nome_allenatore: nome_allenatore });

        // Controllo quale dei due bottoni è stato premuto
        if (inputValue == "Prenota") {
            if (prMongo && (prMongo.giorno == giorno) && (prMongo.ora_inizio == ora_da) && (prMongo.ora_fine == ora_a) && (prMongo.nome_allenatore == nome_allenatore)) {

            // Verifico se lo slot è già stato prenotato dall'utente
            if (prMongo.pr_da_utente) {
                console.log("Hai già prenotato questo slot");
                res.status("208").send("Hai già prenotato questo slot");
            }

            // Verifico se lo slot è prenotato
            if (prMongo.prenotato) {
                console.log("Slot già occupato");
                res.status("202").send("Slot già occupato");
            }
            else {
                console.log("Slot libero");
                db.collection("Prenotazioni").updateOne(prMongo, data, (err,collection) => {
                    if (err) throw err;
                    console.log("Prenotazione effettuata per il giorno "+giorno+" dalle ore "+ora_da+" fino le "+ora_a+" con l'allenatore "+nome_allenatore);
                })
                res.status("201").send("Prenotazione effettuata per il giorno "+giorno+" dalle ore "+ora_da+" fino le "+ora_a+" con l'allenatore "+nome_allenatore);
            }
        } else {
            console.log("Slot non previsto");
            res.status("200").send("Slot non previsto");
        }
        } else if (inputValue == "Elimina") {
            if (prMongo && (prMongo.giorno == giorno) && (prMongo.ora_inizio == ora_da) && (prMongo.ora_fine == ora_a) && (prMongo.nome_allenatore == nome_allenatore) && (prMongo.prenotato) && (prMongo.pr_da_utente)) {
                await db.collection("Prenotazioni").updateOne(prMongo, data_reset, (err,collection) => {
                    if (err) throw err;
                    console.log("Prenotazione annullata ("+giorno+" - "+ora_da+" - "+ora_a+" - "+nome_allenatore+")");
                });
                res.status("207").send("Prenotazione annullata ("+giorno+" - "+ora_da+" - "+ora_a+" - "+nome_allenatore+")");
            } else {
                console.log("Stai provando ad eliminare una consulenza che non hai prenotato");
                res.status("209").send("Stai provando ad eliminare una consulenza che non hai prenotato");
            }
        }
        //res.send(res);
    } catch (err) {
        //console.log(err);
    }
});

// Debug log
console.log("IN ASCOLTO SULLA PORTA 3000");
