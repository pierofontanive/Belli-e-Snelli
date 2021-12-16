var test = require('tape');
var request = require('supertest');
var app = require('../index');

// Test per la GET esercizi
test('TEST1: GET degli esercizi', function(assert) {
    request(app)
        .get('/api/esercizi')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err,res) => {
            console.log(res.body.length);
            var numero_esercizi = res.body.length;
            var risultato = false;
            if (numero_esercizi==0) risultato = true;
            assert.error(err, 'Nessun errore');
            assert.notEqual(true, risultato, 'Esercizi ottenuti Correttamente');
            assert.end();
        });
});

// Test per la GET prenotazioni
test('TEST2: GET delle prenotazioni', function(assert) {
    request(app)
        .get('/api/prenotazioni')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err,res) => {
            console.log(res.body.length);
            var numero_prenotazioni = res.body.length;
            var risultato = false;
            if (numero_prenotazioni==0) risultato = true;
            assert.error(err, 'Nessun errore');
            assert.notEqual(true, risultato, 'Prenotazioni ottenute Correttamente');
            assert.end();
        });
});

// Test per il POST login
test('TEST3: POST del login', function(assert) {
    request(app)
        .post('/login')
        .send({
            "username": "test@unitn.it",
            "password": "ingegneriadelsoftware2021"
        })
        .end((err,res) => {
            console.log(res.status);
            var risultato = false;

            // Controllo se l'API mi ridà i codici di errore delle credenziali
            // 401: la password è errata
            // 402: la mail è errata
            if (res.status==401 || res.status==402) risultato = true;

            assert.error(err, 'Nessun errore');
            if (!risultato) assert.notEqual(true, risultato, 'Login effettuato Correttamente');
            else if (res.status==401) assert.isEqual(true, risultato, 'Credenziali del login Errate (Password)');
            else if (res.status==402) assert.isEqual(true, risultato, 'Credenziali del login Errate (Email errata)');
            assert.end();
        })
})

// Test per il POST nuova/elimina consulenza
test('TEST4: POST creazione/eliminazione di una consulenza', function(assert) {
    request(app)
        .post('/new_consulenza')
        .send({
            "nome_allenatore": "Mario Rossi",
            "data": "6/12/2021",
            "ora_da": "10:30",
            "ora_a": "11:30",
            "controller": "Elimina"
        })
        .end((err,res) => {
            console.log(res.status);
            var risultato = false;

            // Controllo se l'API mi ridà i codici di errore dell'inserimento dei parametri
            // 202: lo slot è già occupato
            // 208: la prenotazione è già stato effettuata dall'utente
            // 200: lo slot non è previsto
            // 209: la prenotazione che si vuole prenotare non è dell'utente
            if (res.status==202 || res.status==208 || res.status==200 || res.status==209) risultato = true;

            assert.error(err, 'Nessun errore');
            if (!risultato) {
                if (res.status==201) assert.notEqual(true, risultato, 'Prenotazione effettuato Correttamente');
                else if (res.status==207) assert.notEqual(true, risultato, 'Prenotazione annullata Correttamente');
            } else if (res.status==202) assert.isEqual(true, risultato, 'Errore di prenotazione: slot occupato');
            else if (res.status==208) assert.isEqual(true, risultato, 'Errore di prenotazione: già prenotato');
            else if (res.status==200) assert.isEqual(true, risultato, 'Errore di prenotazione/eliminazione: slot non previsto');
            else if (res.status==209) assert.isEqual(true, risultato, 'Errore di eliminazione: non autorizzato');
            assert.end();
        })
})