$(document).ready(function(){
    $(document).on('keydown', function(event) {
        const key = event.key;
        let $tabelica = $("#tablaZaIgru");
        
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
          event.preventDefault();
          switch (key) {
            case 'ArrowUp':
                pravac = -2;
                break;
            case 'ArrowDown':
                pravac = 2;
                break;
            case 'ArrowLeft':
                pravac = -1;
                break;
            case 'ArrowRight':
                pravac = 1;
                break;
          }
      
        }
      });
      
});


let zmija=[]
let glava;
let vockica;
let pravac = 1;  // -1 levo 1 desno  2 dole -2 gore na pocetku ide desno
let velicina = 10;
let tezina;
let superVockica  = "";
let brzina = 500;
let best = 0;
let trenutniRezultat = {
    ime: "_",
    rezultat: "_"
}

let nizRezultata = [
    {
        ime: "_",
        rezultat: "_"
    }
]
let lboard = [    {
    ime: "_",
    rezultat: "_"
}]

function leaderBoard() {
    trenutni = JSON.parse(localStorage.getItem("trenutni"));
    rezultati = localStorage.getItem("rezultat");
    if(rezultati != null) {
        lboard = JSON.parse(rezultati); 
    }
    velic = lboard.length;


    const tbl = document.getElementById("rezzz");
    const tblBody = document.createElement("tbody");
    tblBody.id = "tabelaRezultata";
    let red  = document.createElement("tr");
    red.id = "rez0";
    let cell = document.createElement("td");
    cell.id = "0,0";
    let cellText = document.createTextNode("Ime igrača");
    cell.style = "background-color: green";
    cell.appendChild(cellText);
    red.appendChild(cell);
    cell = document.createElement("td");
    cell.id ="0,1";
    cellText= document.createTextNode("Broj poena");
    cell.style = "background-color:green"
    cell.appendChild(cellText);
    red.appendChild(cell);
    tblBody.appendChild(red);
    for (let i = velic-1; i > 0; i--) {
        let ime = lboard[i].ime;
        let rez = lboard[i].rezultat;
        const row = document.createElement("tr");
        row.id = "rez" + (velic-i).toString();
        cell = document.createElement("td");
        cell.id = (velic-i).toString() + ",0";
        let cellText = document.createTextNode(ime);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.id = (velic-i).toString() + ",1";
        cellText = document.createTextNode(rez.toString());
        cell.appendChild(cellText);
        row.appendChild(cell);
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody)
    let pl = document.getElementById("pliz");
    pl.appendChild(tbl);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    const mojR = document.createElement("table");
    mojR.id = "stanje";
    let red1 =  document.createElement("tr");
    red1.id  = "redTrenutnog"
    let cell1 = document.createElement("td");
    let cellT = document.createTextNode("ime: " + (trenutni.ime).toString());
    cell1.appendChild(cellT);
    red1.appendChild(cell1);
    cell1 = document.createElement("td");
    cellT = document.createTextNode("score: \t "+ (trenutni.rezultat).toString());
    cell1.appendChild(cellT);
    red1.appendChild(cell1);
    mojR.appendChild(red1);
    let divo = document.getElementById("mojRez");
    divo.appendChild(mojR);

    //mozda izmeniti
    trenutniRezultat = {
        ime: "_",
        rezultat: "_"
    }
    localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
    // kreirajTabeluRez(lboard)
}


function chng1() {
    brzina = 600;
    localStorage.setItem("brzina", JSON.stringify(brzina));
    document.getElementsByName("radio2")[0].checked = false;
    document.getElementsByName("radio3")[0].checked = false;
}
function chng2() {
    brzina = 450;
    localStorage.setItem("brzina", JSON.stringify(brzina));
    document.getElementsByName("radio1")[0].checked = false;
    document.getElementsByName("radio3")[0].checked = false;
}
function chng3() {
    brzina = 250;
    localStorage.setItem("brzina", JSON.stringify(brzina));
    document.getElementsByName("radio1")[0].checked = false;
    document.getElementsByName("radio2")[0].checked = false;
}


function ucitajVal() {
    velicina = parseInt(document.getElementById("myRange").value)*5 + 5;
    document.getElementById("outVal").innerHTML = "Veličina table: " + velicina.toString() + "&nbsp&nbsp&nbsp&nbsp";
}

function ucitaj() {
    // localStorage.clear();
    // tez = document.forma.tezina.checked
    velicina = parseInt(document.getElementById("myRange").value)*5 + 5; //od 10 do 30

    localStorage.setItem("velicina", velicina);

}

function inicijalizujPodatke() {
    rezultati = localStorage.getItem("rezultat"); 
    best = 0
    // alert(rezultati.length)
    if(rezultati != null) {
        nizRezultata = JSON.parse(rezultati); 
        rez = nizRezultata[length].rezultat.toString();
    } else {
        localStorage.setItem("rezultat",JSON.stringify(nizRezultata));
    }
}

function kreirajTablu() {
    inicijalizujPodatke();
    let brzinaZmije  = parseInt(JSON.parse(localStorage.getItem("brzina")));
    localStorage.setItem("trenutni",JSON.stringify(trenutniRezultat));
    velicina = localStorage.getItem("velicina");
    const tbl = document.createElement("table");
    tbl.id = "igraigra";
    const tblBody = document.createElement("tbody");
    tblBody.id = "tablaZaIgru";
    if(velicina > 30) {
        document.getElementById("igraigra").style = "height: 30%";
    }
    for (let i = 0; i < velicina; i++) {
        const row = document.createElement("tr");
        row.id = "red" + i.toString();
        for (let j=0; j<velicina; j++) {
            cell = document.createElement("td");
            cell.id = i.toString() + "," + j.toString();
            const cellText = document.createTextNode(``);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    ig = document.getElementById("igra");
    tbl.appendChild(tblBody);
    ig.appendChild(tbl);
    tbl.setAttribute("border", "2");
    kreirajZmiju(tblBody);
    kreirajVocku(tblBody);
    // kreirajSuperVocku(tblBody);
    setTimeout(3000)
    myInterval = setInterval(pomerajse, brzinaZmije, tblBody);
    // kreirajSuperVocku(tblBody)
    vockaInterval = setInterval(kreirajSuperVocku,10000, tblBody);
    unistiVocku = setInterval(unistiSuperVocku,13000, tblBody);
}



function kreirajZmiju(tblBody) {
    zmija  = []
    let koord1  = Math.floor(Math.random()*(velicina-1));
    let koord2  = Math.floor(Math.random()*(velicina-1));
    let k = koord1.toString() + "," + koord2.toString();
    let elem = document.getElementById(k);
    elem.style = "background-color: green";
    zmija.push(elem.id);
    glava = elem.id;
}

function unistiSuperVocku(tblBody) {
    if (superVockica== "") {
        return;
    }
    let elem = document.getElementById(superVockica);
    elem.style = " background-color: rgb(30, 47, 0);";
}

function kreirajSuperVocku(tblBody) {
    let flag = 1;
    let k = ","
    while(flag == 1 ) {
        flag = 0;
        let koord1  = Math.floor(Math.random()*(velicina-1));
        let koord2  = Math.floor(Math.random()*(velicina-1));
        k = koord1.toString() + "," + koord2.toString();
        for (let i = 0; i < zmija.length; i++) {
            if (zmija[i] == k) {
                flag = 1;
                break;
            }
        }
    }
    let elem2 = document.getElementById(k);
    elem2.style = "border-radius: 50%; background-color: gold";
    superVockica = elem2.id;
}

function kreirajVocku(tblBody) {
    let flag = 1;
    let k = ","
    while(flag == 1 ) {
        flag = 0;
        let koord1  = Math.floor(Math.random()*(velicina-1));
        let koord2  = Math.floor(Math.random()*(velicina-1));
        k = koord1.toString() + "," + koord2.toString();
        for (let i = 0; i < zmija.length; i++) {
            if (zmija[i] == k) {
                flag = 1;
                break;
            }
        }
    }
    let elem2 = document.getElementById(k);
    elem2.style = "border-radius: 50%; background-color: red";
    vockica = elem2.id;
}

let score = 0;
function pomerajse(tblBody) {  

    voce = vockica.split(",");
    voce[0] = parseInt(voce[0]);
    voce[1] = parseInt(voce[1]);
    if(superVockica != "") {
        superVoce = superVockica.split(",");
        superVoce [0] = parseInt(superVoce [0]);
        superVoce [1] = parseInt(superVoce [1]);
    }
    jot = parseInt(glava.split(",")[1]);
    it = parseInt(glava.split(",")[0]);
    staraGlava  = glava;
    stariScore= score;
        switch (pravac) {
            case 1:
                if(jot < velicina-1) {
                    jot++;
                    glava = it.toString() + "," + jot.toString();
                    for(let i = 0; i< zmija.length; i++) {
                        if (glava == zmija[i]) {
                            let name = prompt("GAME OVER \n Upisite svoje ime: ");
                            trenutniRezultat = {ime:name, rezultat:score};
                            localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                            if(nizRezultata.length > 10) {
                                for(let s = 0; s< 10; s++) {
                                    if(score > nizRezultata[s].rezultat) {
                                        nizRezultata[s].ime = name;
                                        nizRezultata[s].rezultat = score;
                                        const length = nizRezultata.length;
                                        for (let i = 0; i < length - 1; i++) {
                                          for (let j = 0; j < length - i - 1; j++) {
                                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                              // Swap elements
                                              tmp = nizRezultata[j].rezultat
                                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                              nizRezultata[j+1].rezultat = tmp;
                                              tmp = nizRezultata[j].ime
                                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                                              nizRezultata[j+1].ime = tmp;
                                            }
                                          }
                                        }
                                        break;
                                    }
                                }
                            }
                            else {
                                nizRezultata.push({ime:name,rezultat:score});
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                            }
                            localStorage.setItem("rezultat", JSON.stringify(nizRezultata) );
                            clearInterval(myInterval);
                            clearInterval(unistiVocku);
                            clearInterval(vockaInterval);
                            if(name) {
                                window.location = "zmijica-rezultati.html"
                            }
                            return;
                        }
                    }
                    // glava = it.toString() + "," + jot.toString();
                    if (it == voce[0] && jot== voce[1]) {
                        score+=1;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        kreirajVocku(tblBody);
                    }
                    if(superVockica != "") {
                        if (it == superVoce[0] && jot== superVoce[1]) {
                        score+=10;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        superVockica = "";
                        }
                    }
                    let elem = document.getElementById(glava);
                    elem.style = "background-color: green";
                    if(stariScore == score) {
                        zmija.reverse()
                        elem = zmija.pop()
                        zmija.reverse()
                        let elem1 = document.getElementById(elem);
                        elem1.style = "background-color: rgb(30, 47, 0);";
                    }
                    zmija.push(glava)
                    
                }
                else {
                    let name = prompt("GAME OVER \n Upisite svoje ime: ");
                    trenutniRezultat = {ime:name, rezultat:score};
                    localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                    if(nizRezultata.length > 10) {
                        for(let s = 0; s< 10; s++) {
                            if(score > nizRezultata[s].rezultat) {
                                nizRezultata[s].ime = name;
                                nizRezultata[s].rezultat = score;
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else {
                        nizRezultata.push({ime:name,rezultat:score});
                        const length = nizRezultata.length;
                        for (let i = 0; i < length - 1; i++) {
                          for (let j = 0; j < length - i - 1; j++) {
                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                              // Swap elements
                              tmp = nizRezultata[j].rezultat
                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                              nizRezultata[j+1].rezultat = tmp;
                              tmp = nizRezultata[j].ime
                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                              nizRezultata[j+1].ime = tmp;
                            }
                          }
                        }
                    }
                    localStorage.setItem("rezultat", JSON.stringify(nizRezultata));
                    clearInterval(myInterval);
                    clearInterval(unistiVocku);
                    clearInterval(vockaInterval);
                    if(name) {
                        window.location = "zmijica-rezultati.html"
                    }
                    return;
                }
                break;
            case 2:
                if(it < velicina-1) {
                    it++;
                    glava = it.toString() + "," + jot.toString();
                    for(let i = 0; i< zmija.length; i++) {
                        if (glava == zmija[i]) {
                            let name = prompt("GAME OVER \n Upisite svoje ime: ");
                            trenutniRezultat = {ime:name, rezultat:score};
                            localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                            if(nizRezultata.length > 10) {
                                for(let s = 0; s< 10; s++) {
                                    if(score > nizRezultata[s].rezultat) {
                                        nizRezultata[s].ime = name;
                                        nizRezultata[s].rezultat = score;
                                        const length = nizRezultata.length;
                                        for (let i = 0; i < length - 1; i++) {
                                          for (let j = 0; j < length - i - 1; j++) {
                                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                              // Swap elements
                                              tmp = nizRezultata[j].rezultat
                                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                              nizRezultata[j+1].rezultat = tmp;
                                              tmp = nizRezultata[j].ime
                                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                                              nizRezultata[j+1].ime = tmp;
                                            }
                                          }
                                        }
                                        break;
                                    }
                                }
                            }
                            else {
                                nizRezultata.push({ime:name,rezultat:score});
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                            }
                            localStorage.setItem("rezultat", JSON.stringify(nizRezultata));
                            clearInterval(myInterval);
                            clearInterval(unistiVocku);
                            clearInterval(vockaInterval);
                            if(name) {
                                window.location = "zmijica-rezultati.html"
                            }
                            return;
                        }
                    }
                    // glava = it.toString() + "," + jot.toString();
                    if (it == voce[0] && jot== voce[1]) {
                        score+=1;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        kreirajVocku(tblBody);
                    }
                    if(superVockica != "") {
                        if (it == superVoce[0] && jot== superVoce[1]) {
                        score+=10;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        superVockica = "";
                        }
                    }
                    let elem = document.getElementById(glava);
                    elem.style = "background-color: green";
                    if(stariScore == score) {
                        zmija.reverse()
                        elem = zmija.pop()
                        zmija.reverse()
                        let elem1 = document.getElementById(elem);
                        elem1.style = "background-color: rgb(30, 47, 0);";
                    }
                    zmija.push(glava)
                    
                }
                else {
                    let name = prompt("GAME OVER \n Upisite svoje ime: ");
                    trenutniRezultat = {ime:name, rezultat:score};
                    localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                    if(nizRezultata.length > 10) {
                        for(let s = 0; s< 10; s++) {
                            if(score > nizRezultata[s].rezultat) {
                                nizRezultata[s].ime = name;
                                nizRezultata[s].rezultat = score;                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else {
                        nizRezultata.push({ime:name,rezultat:score});
                        const length = nizRezultata.length;
                        for (let i = 0; i < length - 1; i++) {
                          for (let j = 0; j < length - i - 1; j++) {
                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                              // Swap elements
                              tmp = nizRezultata[j].rezultat
                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                              nizRezultata[j+1].rezultat = tmp;
                              tmp = nizRezultata[j].ime
                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                              nizRezultata[j+1].ime = tmp;
                            }
                          }
                        }
                    }
                    localStorage.setItem("rezultat", JSON.stringify(nizRezultata)) ;
                    clearInterval(myInterval);
                    clearInterval(unistiVocku);
                    clearInterval(vockaInterval);
                    if(name) {
                        window.location = "zmijica-rezultati.html"
                    }
                    return;
                }
                break;
            case -1:
                if(jot > 0) {
                    jot--;
                    glava = it.toString() + "," + jot.toString();
                    for(let i = 0; i< zmija.length; i++) {
                        if (glava == zmija[i]) {
                            let name = prompt("GAME OVER \n Upisite svoje ime: ");
                            trenutniRezultat = {ime:name, rezultat:score};
                            localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                            if(nizRezultata.length > 10) {
                                for(let s = 0; s< 10; s++) {
                                    if(score > nizRezultata[s].rezultat) {
                                        nizRezultata[s].ime = name;
                                        nizRezultata[s].rezultat = score;
                                        const length = nizRezultata.length;
                                        for (let i = 0; i < length - 1; i++) {
                                          for (let j = 0; j < length - i - 1; j++) {
                                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                              // Swap elements
                                              tmp = nizRezultata[j].rezultat
                                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                              nizRezultata[j+1].rezultat = tmp;
                                              tmp = nizRezultata[j].ime
                                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                                              nizRezultata[j+1].ime = tmp;
                                            }
                                          }
                                        }
                                        break;
                                    }
                                }
                            }
                            else {
                                nizRezultata.push({ime:name,rezultat:score});
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                            }
                            localStorage.setItem("rezultat", JSON.stringify(nizRezultata) );
                            clearInterval(myInterval);
                            clearInterval(unistiVocku);
                            clearInterval(vockaInterval);
                            if(name) {
                                window.location = "zmijica-rezultati.html"
                            }
                            return;
                        }
                    }
                    // glava = it.toString() + "," + jot.toString();
                    if (it == voce[0] && jot== voce[1]) {
                        score+=1;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        kreirajVocku(tblBody);
                    }
                    if(superVockica != "") {
                        if (it == superVoce[0] && jot== superVoce[1]) {
                        score+=10;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        superVockica = "";
                        }
                    }
                    let elem = document.getElementById(glava);
                    elem.style = "background-color: green";
                    if(stariScore == score) {
                        zmija.reverse()
                        elem = zmija.pop()
                        zmija.reverse()
                        let elem1 = document.getElementById(elem);
                        elem1.style = "background-color: rgb(30, 47, 0);";
                    }
                    zmija.push(glava)
                }
                else {
                    let name = prompt("GAME OVER \n Upisite svoje ime: ");
                    trenutniRezultat = {ime:name, rezultat:score};
                    localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                    if(nizRezultata.length > 10) {
                        for(let s = 0; s< 10; s++) {
                            if(score > nizRezultata[s].rezultat) {
                                nizRezultata[s].ime = name;
                                nizRezultata[s].rezultat = score;
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else {
                        nizRezultata.push({ime:name,rezultat:score});
                        const length = nizRezultata.length;
                        for (let i = 0; i < length - 1; i++) {
                          for (let j = 0; j < length - i - 1; j++) {
                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                              // Swap elements
                              tmp = nizRezultata[j].rezultat
                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                              nizRezultata[j+1].rezultat = tmp;
                              tmp = nizRezultata[j].ime
                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                              nizRezultata[j+1].ime = tmp;
                            }
                          }
                        }
                    }
                    localStorage.setItem("rezultat", JSON.stringify(nizRezultata) );
                    clearInterval(myInterval);
                    clearInterval(unistiVocku);
                    clearInterval(vockaInterval);
                    if(name) {
                        window.location = "zmijica-rezultati.html"
                    }
                    return;
                }
                break;
            case -2:
                if(it > 0) {
                    it--;
                    glava = it.toString() + "," + jot.toString();
                    for(let i = 0; i< zmija.length; i++) {
                        if (glava == zmija[i]) {
                            let name = prompt("GAME OVER \n Upisite svoje ime: ");
                            trenutniRezultat = {ime:name, rezultat:score};
                            localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                            if(nizRezultata.length > 10) {
                                for(let s = 0; s< 10; s++) {
                                    if(score > nizRezultata[s].rezultat) {
                                        nizRezultata[s].ime = name;
                                        nizRezultata[s].rezultat = score;
                                        const length = nizRezultata.length;
                                        for (let i = 0; i < length - 1; i++) {
                                          for (let j = 0; j < length - i - 1; j++) {
                                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                              // Swap elements
                                              tmp = nizRezultata[j].rezultat
                                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                              nizRezultata[j+1].rezultat = tmp;
                                              tmp = nizRezultata[j].ime
                                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                                              nizRezultata[j+1].ime = tmp;
                                            }
                                          }
                                        }
                                        break;
                                    }
                                }
                            }
                            else {
                                nizRezultata.push({ime:name,rezultat:score});
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                            }
                            localStorage.setItem("rezultat", JSON.stringify(nizRezultata) );
                            clearInterval(myInterval);
                            clearInterval(unistiVocku);
                            clearInterval(vockaInterval);
                            if(name) {
                                window.location = "zmijica-rezultati.html"
                            }
                            return;
                        }
                    }
                    // glava = it.toString() + "," + jot.toString();
                    if (it == voce[0] && jot== voce[1]) {
                        score+=1;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        kreirajVocku(tblBody);
                    }
                    if(superVockica != "") {
                        if (it == superVoce[0] && jot== superVoce[1]) {
                        score+=10;
                        document.getElementById("scoreNow").innerHTML = "Score: "+ score;
                        superVockica = "";
                        }
                    }
                    let elem = document.getElementById(glava);
                    elem.style = "background-color: green";
                    if(stariScore == score) {
                        zmija.reverse()
                        elem = zmija.pop()
                        zmija.reverse()
                        let elem1 = document.getElementById(elem);
                        elem1.style = "background-color: rgb(30, 47, 0);";
                    }
                    zmija.push(glava)
                    
                }
                else {
                    let name = prompt("GAME OVER \n Upisite svoje ime: ");
                    trenutniRezultat = {ime:name, rezultat:score};
                    localStorage.setItem("trenutni", JSON.stringify(trenutniRezultat));
                    if(nizRezultata.length > 10) {
                        for(let s = 0; s< 10; s++) {
                            if(score > nizRezultata[s].rezultat) {
                                nizRezultata[s].ime = name;
                                nizRezultata[s].rezultat = score;
                                const length = nizRezultata.length;
                                for (let i = 0; i < length - 1; i++) {
                                  for (let j = 0; j < length - i - 1; j++) {
                                    if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                                      // Swap elements
                                      tmp = nizRezultata[j].rezultat
                                      nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                                      nizRezultata[j+1].rezultat = tmp;
                                      tmp = nizRezultata[j].ime
                                      nizRezultata[j].ime =  nizRezultata[j+1].ime
                                      nizRezultata[j+1].ime = tmp;
                                    }
                                  }
                                }
                                break;
                            }
                        }
                    }
                    else {
                        nizRezultata.push({ime:name,rezultat:score});
                        const length = nizRezultata.length;
                        for (let i = 0; i < length - 1; i++) {
                          for (let j = 0; j < length - i - 1; j++) {
                            if (nizRezultata[j].rezultat > nizRezultata[j+1].rezultat) {
                              // Swap elements
                              tmp = nizRezultata[j].rezultat
                              nizRezultata[j].rezultat =  nizRezultata[j+1].rezultat
                              nizRezultata[j+1].rezultat = tmp;
                              tmp = nizRezultata[j].ime
                              nizRezultata[j].ime =  nizRezultata[j+1].ime
                              nizRezultata[j+1].ime = tmp;
                            }
                          }
                        }
                    }
                    localStorage.setItem("rezultat", JSON.stringify(nizRezultata) );
                    clearInterval(myInterval);
                    clearInterval(unistiVocku);
                    clearInterval(vockaInterval);
                    if(name) {
                        window.location = "zmijica-rezultati.html"
                    }
                    return;
                }
                break;
    }
}
