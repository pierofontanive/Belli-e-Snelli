const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');



var t = document.createElement("card");
app.appendChild(container);

// Begin accessing JSON data here


var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/esercizi', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    // console.log(data.length);
    let table = '<thead><tr><th>Immagine</th><th>Esercizio</th><th>Giorno</th></tr></thead><tbody>';
    let table_2 = '<thead><tr><th>Immagine</th><th>Esercizio</th><th>Giorno</th></tr></thead><tbody>';

    if (request.status >= 200 && request.status < 400) {
        data.forEach(esercizio => {
            // console.log(esercizio);
            if (esercizio.day == 1) {
                table += '<tr><td><img src="/Photo/'+esercizio.image+'" width="60" height="60"></td>';
                table += '<td>'+esercizio.gruppo_m+'\n'+esercizio.es+'\n'+esercizio.reps+'\n'+'</td>';
                table += '<td>'+esercizio.day+'</td></tr>';
            }
        }); table += '</tbody>';
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
    $('#mytable').empty().html(table);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(esercizio => {
            // console.log(esercizio);
            if (esercizio.day == 2) {
                table_2 += '<tr><td><img src="/Photo/'+esercizio.image+'" width="60" height="60"></td>';
                table_2 += '<td>'+esercizio.gruppo_m+'\n'+esercizio.es+'\n'+esercizio.reps+'\n'+'</td>';
                table_2 += '<td>'+esercizio.day+'</td></tr>';
            }
        }); table_2 += '</tbody>';
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `THE API IS NOT WORKING!`;
        app.appendChild(errorMessage);
    }
    $('#mytable_2').empty().html(table_2);
}
request.send();

