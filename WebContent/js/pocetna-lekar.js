
function pocetnaLekar(korisnik) {
    var imeKorisnika = korisnik.ime + " " + korisnik.prezime;
    var nazivi = ["Lista pacijenata",  "Radni kalendar", "GO/Odsustvo", imeKorisnika];

    for(let naziv of nazivi) {
        //pravljenje dugmadi
        var btn = document.createElement("BUTTON");
        btn.classList.add("btn", "btn--radius-2", "btn--light-blue");
        btn.innerHTML = naziv;
        document.getElementById("navbar").appendChild(btn);
        //dodjela specificnih id-jeva dugmadima
        switch (naziv) {
            case "Lista pacijenata":
                btn.id = "listaPacijenataBtn"
                break;
            case "Pregledi":
                btn.id = "lekarPreglediBtn"
                break;
            case "Radni kalendar":
                btn.id = "kalendarBtn"
                break;
            case imeKorisnika:
                btn.id = "profilBtn"
                break;
            case "GO/Odsustvo":
                btn.id = "zahtevGOBtn"
                break;
        }
    }

}

function generisiListuPacijenata() {
    $("#content").fadeOut(100, function() {


        $.ajax
        ({
            type: "GET",
            url: 'api/lekari/getPacijenti',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (pacijenti) {

                $("#content").fadeOut(100, function () {
                    var content = document.getElementById('content')
                    content.innerHTML = "";

                    var searchDiv = document.createElement("DIV");
                    searchDiv.align = "center";
                    var search = document.createElement("INPUT");
                    search.type = "text";
                    search.classList.add("input--style-4");
                    search.id = "search";
                    search.name = "search";

                    searchDiv.appendChild(search);
                    content.append(searchDiv);
                    $('#search').keyup(function(){
                        search_table($(this).val());
                    });
                    var naslov = document.createElement("header");
                    naslov.innerText = "Pacijenti";
                    naslov.fontSize = "35px"
                    content.appendChild(naslov);

                    var table = document.createElement('table');
                    table.classList.add("tabela");
                    table.id = "tabelaPacijenata";
                    var tableRef = document.createElement('tbody');

                    for (let pacijent of pacijenti) {
                        var podaciPacijenta = tableRef.insertRow();
                        var imePacijenta = podaciPacijenta.insertCell(0);
                        var imePacijentaText = document.createTextNode(pacijent.ime);
                        imePacijenta.appendChild(imePacijentaText);

                        var prezimePacijenta = podaciPacijenta.insertCell(1);
                        var prezimePacijentaText = document.createTextNode(pacijent.prezime);
                        prezimePacijenta.appendChild(prezimePacijentaText);

                        /*var datRodjenja = podaciPacijenta.insertCell(2);
                        var datum = document.createTextNode(pacijent.datumRodjenja);
                        datRodjenja.appendChild(datum);*/

                        var jbo = podaciPacijenta.insertCell(2);
                        var jboText = document.createTextNode(pacijent.jbo);
                        jbo.appendChild(jboText);

                        var email = podaciPacijenta.insertCell(3);
                        var emailPacijentaText = document.createTextNode(pacijent.email);
                        email.appendChild(emailPacijentaText);

                        var profilPacijenta = podaciPacijenta.insertCell(4);
                        var profilPacijentaBtn = document.createElement("BUTTON");
                        profilPacijentaBtn.classList.add("btn--radius", "btn--light-blue", "btn--tabela");
                        profilPacijentaBtn.innerText = "Profil";
                        profilPacijentaBtn.style.color = "white";
                        profilPacijentaBtn.style.fontSize = "15px"
                        profilPacijentaBtn.style.height = "30px"
                        profilPacijentaBtn.onclick = prikaziProfilPacijenta(pacijent.id);
                        profilPacijenta.appendChild(profilPacijentaBtn);

                    }
                    table.appendChild(tableRef);
                    content.appendChild(table);
                });
                $("#content").fadeIn(500);
            }
        });

    });
}

function prikaziProfilPacijenta(pacijentId) {
    return function(){
        $("#content").fadeOut(100, function(){
            $.get({
                url: 'api/pacijenti/pacijent/' + pacijentId,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function (korisnik) {
                    var content = document.getElementById("content");
                    content.innerHTML = "";

                    var prviRed = document.createElement("var");
                    prviRed.classList.add("row", "wrapper--w680");
                    var varIme = document.createElement("var");
                    varIme.classList.add("col-2", "input-group");
                    var ime = document.createTextNode("Ime i prezime");
                    varIme.appendChild(ime);
                    varIme.appendChild(document.createElement("br"));
                    var txtIme = document.createElement('input');
                    txtIme.type = 'text';
                    txtIme.id = "ime";
                    txtIme.classList.add("input--style-4");
                    txtIme.style.height = "40px";
                    txtIme.style.width = "250px";
                    txtIme.value = korisnik.ime + " " + korisnik.prezime;
                    txtIme.disabled = "true";
                    varIme.appendChild(txtIme);
                    prviRed.appendChild(varIme);
                    var varJBO = document.createElement("var");
                    varJBO.classList.add("col-2", "input-group");
                    var jbo = document.createTextNode("JBO");
                    varJBO.appendChild(jbo);
                    varJBO.appendChild(document.createElement("br"));
                    var txtJBO = document.createElement('input');
                    txtJBO.type = 'text';
                    txtJBO.id = "jbo";
                    txtJBO.classList.add("input--style-4");
                    txtJBO.style.height = "40px"
                    txtJBO.style.width = "250px"
                    txtJBO.value = korisnik.jbo;
                    txtJBO.disabled = "true";
                    varJBO.appendChild(txtJBO);
                    prviRed.appendChild(varJBO);
                    content.appendChild(prviRed);

                    var drugiRed = document.createElement("var");
                    drugiRed.classList.add("row", "wrapper--w680");
                    var varUsername = document.createElement("var");
                    varUsername.classList.add("col-2", "input-group");
                    var username = document.createTextNode("Korisničko ime");
                    varUsername.appendChild(username);
                    varUsername.appendChild(document.createElement("br"));
                    var txtUsername = document.createElement('input');
                    txtUsername.type = 'text';
                    txtUsername.id = "username";
                    txtUsername.classList.add("input--style-4");
                    txtUsername.style.height = "40px"
                    txtUsername.style.width = "250px"
                    txtUsername.value = korisnik.username;
                    txtUsername.disabled = "true";
                    varUsername.appendChild(txtUsername);
                    drugiRed.appendChild(varUsername);
                    var varEmail = document.createElement("var");
                    varEmail.classList.add("col-2", "input-group");
                    var email = document.createTextNode("E-mail");
                    varEmail.appendChild(email);
                    varEmail.appendChild(document.createElement("br"));
                    var txtEmail = document.createElement('input');
                    txtEmail.type = 'email';
                    txtEmail.id = "email";
                    txtEmail.classList.add("input--style-4");
                    txtEmail.style.height = "40px"
                    txtEmail.style.width = "250px"
                    txtEmail.value = korisnik.email;
                    txtEmail.disabled = "true";
                    varEmail.appendChild(txtEmail);
                    drugiRed.appendChild(varEmail);
                    content.appendChild(drugiRed);

                    var treciRed = document.createElement("var");
                    treciRed.classList.add("row", "wrapper--w680");
                    var varZdrK = document.createElement("var");
                    varZdrK.classList.add("col-2", "input-group");
                    var zdarvstveniKartonBtn = document.createElement("BUTTON");
                    zdarvstveniKartonBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    zdarvstveniKartonBtn.innerHTML = "Zdravstveni karton";
                    zdarvstveniKartonBtn.onclick = zdravstveniKarton(pacijentId, korisnik.ime + " " + korisnik.prezime);
                    varZdrK.appendChild(zdarvstveniKartonBtn);
                    treciRed.appendChild(varZdrK);
                    var varZapocni = document.createElement("var");
                    varZapocni.classList.add("col-2", "input-group");
                    var zapocniBtn = document.createElement("BUTTON");
                    zapocniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    zapocniBtn.innerHTML = "Zapocni pregled";
                    zapocniBtn.onclick = zapocniPregled(korisnik);
                    varZapocni.appendChild(zapocniBtn);
                    treciRed.appendChild(varZapocni);
                    content.appendChild(treciRed);

                    /*var treciRed = document.createElement("var");
                    treciRed.classList.add("row", "wrapper--w680");
                    var varDatumRodjenja = document.createElement("var");
                    varDatumRodjenja.classList.add("col-2", "input-group");
                    var datumRodjenja = document.createTextNode("Datum rođenja");
                    varDatumRodjenja.appendChild(datumRodjenja);
                    varDatumRodjenja.appendChild(document.createElement("br"));
                    var txtDatumRodjenja = document.createElement('input');
                    txtDatumRodjenja.type = 'text';
                    txtDatumRodjenja.id = "datumRodjenja";
                    txtDatumRodjenja.classList.add("input--style-4");
                    txtDatumRodjenja.style.height = "40px"
                    txtDatumRodjenja.style.width = "250px"
                    txtDatumRodjenja.value = korisnik.datumRodjenja.substr(0, 10);
                    txtDatumRodjenja.disabled = "true";
                    varDatumRodjenja.appendChild(txtDatumRodjenja);
                    treciRed.appendChild(varDatumRodjenja);
                    var varVisinaTezina = document.createElement("var");
                    varVisinaTezina.classList.add("col-2", "input-group");
                    var visinaTezina = document.createTextNode("Visina|tezina");
                    varVisinaTezina.appendChild(visinaTezina);
                    varVisinaTezina.appendChild(document.createElement("br"));
                    var visinaTezinaTxt = document.createElement('input');
                    visinaTezinaTxt.type = 'email';
                    visinaTezinaTxt.id = "visinaTezina";
                    visinaTezinaTxt.classList.add("input--style-4");
                    visinaTezinaTxt.style.height = "40px"
                    visinaTezinaTxt.style.width = "250px"
                    visinaTezinaTxt.value = korisnik.visina + "cm | " + korisnik.tezina + "kg";
                    visinaTezinaTxt.disabled = "true";
                    varVisinaTezina.appendChild(visinaTezinaTxt);
                    treciRed.appendChild(varVisinaTezina);
                    content.appendChild(treciRed);*/



                }
            });
        });
        $("#content").fadeIn(500);
    }
}

function zapocniPregled(pacijent) {
    return function () {
        var modal = document.getElementById("zapocniPregledModal");
        modal.style.display = "block";

        var span = document.getElementById("closeZapocniPregled");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        var content = document.getElementById("zapocniPregledDiv");
        content.innerHTML = "";

        var naslov = document.createElement("Header");
        naslov.innerText = "Pregled za pacijenta: " + pacijent.ime + " " + pacijent.prezime;
        naslov.style.fontSize = "20px";
        naslov.style.marginTop = "10px";
        naslov.style.marginBottom = "10px";
        content.appendChild(naslov);
        content.appendChild(document.createElement("br"));


        var odaberiNaslov = document.createElement("Header");
        odaberiNaslov.innerText = "Zakazivanje sljedećeg pregleda/operacije";
        odaberiNaslov.style.fontSize = "15px";
        odaberiNaslov.style.marginTop = "10px";
        odaberiNaslov.style.marginBottom = "10px";
        content.appendChild(odaberiNaslov);

        /*********************CHECKBOXOVI*************************/

        var forma = document.createElement("form");
        var divPregled = document.createElement("div");
        divPregled.classList.add("divGo");
        var pregledBtn = document.createElement("input");
        pregledBtn.type = "checkbox";
        pregledBtn.id = "pregled";
        var pregledLabel = document.createElement("label");
        pregledLabel.for = "godisnji";
        pregledLabel.innerText = "Pregled";
        divPregled.appendChild(pregledBtn);
        divPregled.appendChild(pregledLabel);
        forma.appendChild(divPregled);
        content.appendChild(forma);
        var divOperacija = document.createElement("div");
        divOperacija.classList.add("divOds");
        var operacijaBtn = document.createElement("input");
        operacijaBtn.type = "checkbox";
        operacijaBtn.id = "operacija";
        var operacijaLabel = document.createElement("label");
        operacijaLabel.for = "operacija";
        operacijaLabel.innerText = "Operacija";
        divOperacija.appendChild(operacijaBtn);
        divOperacija.appendChild(operacijaLabel);
        forma.appendChild(divOperacija);
        content.appendChild(forma);

        pregledBtn.addEventListener('change', (event) => {
            if (event.target.checked) {
                operacijaBtn.checked = false;

                var divTipPregleda = document.createElement("div");
                divTipPregleda.id = "divTp";
                divTipPregleda.classList.add("divOds");
                var selectTipPregleda = document.createElement('select');

                $.ajax({
                    url: 'api/klinike/getTipoviPregleda',
                    type: 'GET',
                    contentType: 'application/json',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                    },
                    success: function (tipoviPregleda) {
                        var array = [];
                        for(let tp of tipoviPregleda){
                            array.push(tp.naziv);
                        }
                        selectTipPregleda.id = "selectTipPregleda";
                        //Create and append the options
                        for (var i = 0; i < array.length; i++) {
                            var option = document.createElement("option");
                            option.value = array[i];
                            option.text = array[i];
                            selectTipPregleda.appendChild(option);
                        }
                        var tpLabel = document.createElement("label");
                        tpLabel.for = "selectTipPregleda";
                        tpLabel.innerText = "Tip pregleda";
                        divTipPregleda.appendChild(tpLabel);
                        divTipPregleda.appendChild(selectTipPregleda);
                        if(!forma.contains(document.getElementById("selectTipPregleda"))){
                            forma.appendChild(divTipPregleda);
                        }
                    }
                });


            }
        })
        operacijaBtn.addEventListener('change', (event) => {
            if (event.target.checked) {
                pregledBtn.checked = false;
                if(forma.contains(document.getElementById("divTp"))){
                    forma.removeChild(document.getElementById("divTp"));
                }
            }
        })



        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Pošalji");
        s.classList.add("btn2", "btn--light-blue");
        s.style.height = "35px"
        s.style.width = "250px"

        var treciRed = document.createElement("var");
        treciRed.classList.add("row", "wrapper--w680");
        var varPocDatum = document.createElement("var");
        varPocDatum.classList.add("col-2", "input-group");
        var datumTxt = document.createTextNode("Vrijeme početka");
        varPocDatum.style.marginTop = "20px";
        varPocDatum.appendChild(datumTxt);
        varPocDatum.appendChild(document.createElement("br"));
        var datumPocetak = document.createElement('input');
        datumPocetak.type = 'datetime-local';
        datumPocetak.id = "datumPoc";
        datumPocetak.classList.add("input--style-4");
        datumPocetak.style.height = "40px";
        datumPocetak.style.width = "270px"

        varPocDatum.appendChild(datumPocetak);
        treciRed.appendChild(varPocDatum);
        var varKrajDatum = document.createElement("var");
        varKrajDatum.classList.add("col-2", "input-group");
        var datumTxt = document.createTextNode("Vrijeme kraja");
        varKrajDatum.style.marginTop = "20px";
        varKrajDatum.appendChild(datumTxt);
        varKrajDatum.appendChild(document.createElement("br"));
        var datumKraj = document.createElement('input');
        datumKraj.type = 'datetime-local';
        datumKraj.id = "datumKr";
        datumKraj.classList.add("input--style-4");
        datumKraj.style.height = "40px";
        datumKraj.style.width = "270px"
        varKrajDatum.appendChild(datumKraj);
        treciRed.appendChild(varKrajDatum);
        forma.appendChild(treciRed);

        datumPocetak.onchange = function(){
            var poc = $("#datumPoc").val();
            var kr = $("#datumKr").val();
            if( poc == "" || kr == ""){
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            } else if(kr < poc){
                alert("Krajnji datum mora biti veći od početnog.");
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            } else if(poc.substr(0,10) != kr.substr(0,10)){
                alert("Datumi se ne poklapaju.");
                return;
            }
            forma.appendChild(s);

        }
        datumKraj.onchange = function(){
            var poc = $("#datumPoc").val();
            var kr = $("#datumKr").val();

            if( poc == "" || kr == ""){
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            } else if(kr < poc){
                alert("Krajnji datum mora biti veći od početnog.");
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            } else if(poc.substr(0,10) != kr.substr(0,10)){
                alert("Datumi se ne poklapaju.");
                return;
            }
            forma.appendChild(s);

        }
        content.appendChild(forma);

        forma.onsubmit = function (event) {
            event.preventDefault();

            var pregled;
            var operacija;

            if(pregledBtn.checked){
                pregled = true;
                operacija = false;
            }
            else if(operacijaBtn.checked){
                pregled = false;
                operacija = true;
            }

            if(!pregledBtn.checked && !operacijaBtn.checked){
                alert("Morate čekirati jednu od navedenih stavki.");
                return;
            }
            var pocetak = $("#datumPoc").val();
            var kraj = $("#datumKr").val();

            var tipPregleda = "";
            var urlString = "";
            var pacijentId = pacijent.id;

            if(pregled){
                tipPregleda = $("#selectTipPregleda :selected").text();
                urlString = 'api/lekari/napraviTerminZaPregled/'+tipPregleda;
            } else if(operacija){
                urlString = 'api/lekari/napraviTerminZaOperaciju';
            }

            $.post({
                url: urlString,
                data: JSON.stringify({pocetak, kraj, pacijentId}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Rezervcija poslata.")
                },
                error: function() {
                    alert("Greška.")
                }
            });
        }

    }
}

function zdravstveniKarton(pacijentId, imeIPrezimePacijenta) {
    return function(){
        $("#content").fadeOut(100, function(){
            $.get({
                url: 'api/pacijenti/zdravstveniKarton/' + pacijentId,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function (zk) {

                    var modal = document.getElementById("zdravsteniKartonModal");
                    modal.style.display = "block";

                    var span = document.getElementById("closeZdravsteniKarton");

                    span.onclick = function () {
                        modal.style.display = "none";
                    }

                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    var content = document.getElementById("zdravsteniKartonDiv");
                    content.innerHTML = "";

                    var naslov = document.createElement("Header");
                    naslov.innerText = "Zdravstveni karton za pacijenta: " + imeIPrezimePacijenta;
                    naslov.style.fontSize = "20px";
                    content.appendChild(naslov);
                    naslov.style.marginTop = "10px";
                    naslov.style.marginBottom = "10px";
                    content.appendChild(document.createElement("br"));

                    var treciRed = document.createElement("var");
                    treciRed.classList.add("row", "wrapper--w680");
                    var varVisina = document.createElement("var");
                    varVisina.classList.add("col-2", "input-group");
                    var visina = document.createTextNode("Visina pacijenta");
                    varVisina.appendChild(visina);
                    varVisina.appendChild(document.createElement("br"));
                    var txtVisina = document.createElement('input');
                    txtVisina.type = 'text';
                    txtVisina.id = "visina";
                    txtVisina.classList.add("input--style-4");
                    txtVisina.style.height = "40px"
                    txtVisina.style.width = "250px"
                    txtVisina.value = zk.visina + " cm";
                    txtVisina.disabled = "true";
                    varVisina.appendChild(txtVisina);
                    treciRed.appendChild(varVisina);
                    var varMasa = document.createElement("var");
                    varMasa.classList.add("col-2", "input-group");
                    var masa = document.createTextNode("Masa pacijenta");
                    varMasa.appendChild(masa);
                    varMasa.appendChild(document.createElement("br"));
                    var masaTxt = document.createElement('input');
                    masaTxt.type = 'masa';
                    masaTxt.id = "masa";
                    masaTxt.classList.add("input--style-4");
                    masaTxt.style.height = "40px"
                    masaTxt.style.width = "250px"
                    masaTxt.value = zk.masa + " kg";
                    masaTxt.disabled = "true";
                    varMasa.appendChild(masaTxt);
                    treciRed.appendChild(varMasa);
                    content.appendChild(treciRed);



                }
            });
        });
        $("#content").fadeIn(500);
    }
}
function search_table(value) {
    $('#tabelaPacijenata tr').each(function () {
        var found = 'false';
        $(this).each(function () {
            if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                found = 'true';
            }
        });
        if (found == 'true') {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function generisiFormuZaGO(ulogovan) {

    $("#content").fadeOut(100, function(){

        var content = document.getElementById('content')
        content.innerHTML = "";

        /*********************CHECKBOXOVI*************************/

        var forma = document.createElement("form");
        var divGo = document.createElement("div");
        divGo.classList.add( "divGo");
        var goBtn = document.createElement("input");
        goBtn.type = "checkbox";
        goBtn.id = "godisnji";
        var goLabel = document.createElement("label");
        goLabel.for = "godisnji";
        goLabel.innerText = "Godisnji odmor";
        divGo.appendChild(goBtn);
        divGo.appendChild(goLabel);
        forma.appendChild(divGo);
        content.appendChild(forma);
        var divOds = document.createElement("div");
        divOds.classList.add("divOds") ;
        var odsBtn = document.createElement("input");
        odsBtn.type = "checkbox";
        odsBtn.id = "odsustvo";
        var odsLabel = document.createElement("label");
        odsLabel.for = "odsustvo";
        odsLabel.innerText = "Odsustvo";
        divOds.appendChild(odsBtn);
        divOds.appendChild(odsLabel);
        forma.appendChild(divOds);
        content.appendChild(forma);

        goBtn.addEventListener('change', (event) => {
            if (event.target.checked) {
                odsBtn.checked = false;
            }
        })
        odsBtn.addEventListener('change', (event) => {
            if (event.target.checked) {
                goBtn.checked = false;
            }
        })


        var s = document.createElement("input"); //input element, Submit button
        s.setAttribute('type',"submit");
        s.setAttribute('value',"Pošalji");
        s.classList.add("btn2", "btn--light-blue");
        s.style.height = "35px"
        s.style.width = "250px"

        var treciRed = document.createElement("var");
        treciRed.classList.add("row", "wrapper--w680");
        var varPocDatum = document.createElement("var");
        varPocDatum.classList.add("col-2", "input-group");
        var datumTxt = document.createTextNode("Pocetni datum");
        varPocDatum.style.marginTop = "20px";
        varPocDatum.appendChild(datumTxt);
        varPocDatum.appendChild(document.createElement("br"));
        var datumPocetak = document.createElement('input');
        datumPocetak.type = 'datetime-local';
        datumPocetak.id = "datumPoc";
        datumPocetak.classList.add("input--style-4");
        datumPocetak.style.height = "40px";
        datumPocetak.style.width = "270px"

        varPocDatum.appendChild(datumPocetak);
        treciRed.appendChild(varPocDatum);
        var varKrajDatum = document.createElement("var");
        varKrajDatum.classList.add("col-2", "input-group");
        var datumTxt = document.createTextNode("Krajnji datum");
        varKrajDatum.style.marginTop = "20px";
        varKrajDatum.appendChild(datumTxt);
        varKrajDatum.appendChild(document.createElement("br"));
        var datumKraj = document.createElement('input');
        datumKraj.type = 'datetime-local';
        datumKraj.id = "datumKr";
        datumKraj.classList.add("input--style-4");
        datumKraj.style.height = "40px";
        datumKraj.style.width = "270px"
        varKrajDatum.appendChild(datumKraj);
        treciRed.appendChild(varKrajDatum);
        forma.appendChild(treciRed);

        datumPocetak.onchange = function(){
            var poc = $("#datumPoc").val();
            var kr = $("#datumKr").val();
            if( poc == "" || kr == ""){
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            } else if(kr < poc){
                alert("Krajnji datum mora biti veći od početnog.");
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            }
            forma.appendChild(s);

        }
        datumKraj.onchange = function(){
            var poc = $("#datumPoc").val();
            var kr = $("#datumKr").val();

            if( poc == "" || kr == ""){
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            } else if(kr < poc){
                alert("Krajnji datum mora biti veći od početnog.");
                if(forma.contains(s))
                    forma.removeChild(s);
                return;
            }
            forma.appendChild(s);
        }

        forma.onsubmit = function (event) {
            event.preventDefault();

            var godisnji;
            var odsustvo;

            if(goBtn.checked){
                godisnji = true;
                odsustvo = false;
            }
            else if(odsBtn.checked){
                godisnji = false;
                odsustvo = true;
            }

            if(!goBtn.checked && !odsBtn.checked){
                alert("Morate čekirati jednu od navedenih stavki.");
                return;
            }
            var pocetak = $("#datumPoc").val();
            var kraj = $("#datumKr").val();
            $.post({
                url: 'api/lekari/rezervisiGoOds',
                data: JSON.stringify({pocetak, kraj, godisnji, odsustvo}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Uspješna rezervacija.")
                    var body = document.getElementsByTagName("BODY")[0];
                },
                error: function() {
                    alert("Greška.")
                }
            });
        }

        var prikaziBtn = document.createElement("BUTTON");
        prikaziBtn.innerText = "Rezervisano";
        prikaziBtn.id = "rezervisanoBtn";
        prikaziBtn.classList.add("btn2", "btn--light-blue");
        prikaziBtn.style.height = "35px";
        prikaziBtn.style.width = "250px";
        prikaziBtn.onclick = generisiGoOds(ulogovan);
        content.appendChild(prikaziBtn);

    });
    $("#content").fadeIn(500);
}

function generisiGoOds() {
    return function () {
        var ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
        $.get({
            url: 'api/lekari/getGoOds/' + ulogovan.id,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (goOds) {
                console.log(goOds)
                var content = document.getElementById('content')

                if(content.contains(document.getElementById("tabelaGoOds")))
                    content.removeChild(document.getElementById("tabelaGoOds"));

                var table = document.createElement('table');
                table.id = "tabelaGoOds";
                table.classList.add("tabela");

                var tableRef = document.createElement('tbody');

                for(let termin of goOds) {
                    var podaciGoOds   = tableRef.insertRow();
                    var pocetak = podaciGoOds.insertCell(0);
                    var pocetakTermin = document.createTextNode(termin.pocetak);
                    pocetak.appendChild(pocetakTermin);

                    var kraj = podaciGoOds.insertCell(1);
                    var krajTermin = document.createTextNode(termin.kraj);
                    kraj.appendChild(krajTermin);

                    if(termin.godisnji){
                        var go = podaciGoOds.insertCell(2);
                        var goText = document.createTextNode("Godisnji odmor");
                        go.appendChild(goText);
                    } else if(termin.odsustvo){
                        var ods = podaciGoOds.insertCell(2);
                        var odsText = document.createTextNode("Odsustvo");
                        ods.appendChild(odsText);
                    }

                    var ukloni = podaciGoOds.insertCell(3);
                    var ukloniBtn = document.createElement("BUTTON");
                    ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    ukloniBtn.innerHTML = "-";
                    ukloniBtn.onclick = ukloniGoOds(termin.id, ulogovan);
                    ukloni.appendChild(ukloniBtn);

                }
                table.appendChild(tableRef);
                content.appendChild(table);


            }, error: function () {
                console.log("Greska")
            }

        });
    }
}

function ukloniGoOds(terminId, ulogovan) {
    return function(){

        $.ajax({
            url: 'api/lekari/deleteGoOds/' + terminId,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (goOds) {
                alert("Obrisana rezervacija.")
            }
        });
    }
}