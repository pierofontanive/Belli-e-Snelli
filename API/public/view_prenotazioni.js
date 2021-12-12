const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');



var t = document.createElement("card");
app.appendChild(container);

// Begin accessing JSON data here


var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/prenotazioni', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    // console.log(data.length);
    let table = '<thead><tr><th>Giorno della Prenotazione</th><th>Nome Allenatore</th><th>Ora di Inizio</th><th>Ora di Fine</th></tr></thead><tbody>';

    if (request.status >= 200 && request.status < 400) {
        data.forEach(prenotazione => {
            // console.log(prenotazione);
            if (prenotazione.pr_da_utente == 1) {
                table += '<tr><td>'+prenotazione.giorno+'</td>';
                table += '<td>'+prenotazione.nome_allenatore+'</td>';
                table += '<td>'+prenotazione.ora_inizio+'</td>';
                table += '<td>'+prenotazione.ora_fine+'</td></tr>';
            }
        });
        table += '</tbody>';
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
    $('#mytable').empty().html(table);
}
request.send();

