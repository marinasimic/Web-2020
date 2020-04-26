
function pocetnaAdminKlinike(ulogovan) {
    korisnik = ulogovan;
    var imeKorisnika = korisnik.ime + " " + korisnik.prezime;
    var nazivi = ["Vasa klinika", "Rezervacije", "GO/Odsustva", "Dodaj lekara", "Tipovi pregleda", imeKorisnika];

    for(let naziv of nazivi) {
        //pravljenje dugmadi
        var btn = document.createElement("BUTTON");
        btn.classList.add("btn", "btn--radius-2", "btn--light-blue");
        btn.innerHTML = naziv;
        document.getElementById("navbar").appendChild(btn);
        //dodjela specificnih id-jeva dugmadima
        switch (naziv) {
            case "Vasa klinika":
                btn.id = "klinikaAdminaBtn"
                btn.onclick = generisiKlinikuAdmina();
                break;
            case "Rezervacije":
                btn.id = "zahteviBtn"
                break;
            case "GO/Odsustva":
                btn.id = "zahteviZaGoOdsBtn"
                break;
            case "Dodaj lekara":
                btn.id = "dodajLekaraBtn"
                btn.onclick = generisiFormuZaNovogLekara(ulogovan.klinika);
                break;
            case "Tipovi pregleda":
                btn.id = "tipoviPregledaBtn"
                break;
            case imeKorisnika:
                btn.id = "profilBtn"
                break;

        }
    }

}
function generisiKlinikuAdmina() {
    var ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    return function(){
        $.ajax
        ({
            type: "GET",
            url: 'api/korisnici/getKlinikaAdmina/'+ulogovan.id,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (klinika){
                $("#content").fadeOut(100, function() {
                    var content = document.getElementById("content");
                    content.innerHTML = "";

                    var prviRed = document.createElement("var");
                    prviRed.classList.add("row", "wrapper--w680");
                    var varNaziv = document.createElement("var");
                    varNaziv.classList.add("col-2", "input-group");
                    var naziv = document.createTextNode("Naziv");
                    varNaziv.appendChild(naziv);
                    varNaziv.appendChild(document.createElement("br"));
                    var txtNaziv = document.createElement('input');
                    txtNaziv.type = 'text';
                    txtNaziv.id = "naziv";
                    txtNaziv.classList.add("input--style-4");
                    txtNaziv.style.height = "40px";
                    txtNaziv.style.width = "250px";
                    txtNaziv.value = klinika.naziv;
                    varNaziv.appendChild(txtNaziv);
                    prviRed.appendChild(varNaziv);

                    var varLokacija = document.createElement("var");
                    varLokacija.classList.add("col-2", "input-group");
                    var lokacija = document.createTextNode("Lokacija");
                    varLokacija.appendChild(lokacija);
                    varLokacija.appendChild(document.createElement("br"));
                    var txtLokacija = document.createElement('input');
                    txtLokacija.type = 'text';
                    txtLokacija.id = "lokacija";
                    txtLokacija.classList.add("input--style-4");
                    txtLokacija.style.height = "40px"
                    txtLokacija.style.width = "250px"
                    txtLokacija.value = klinika.lokacija;
                    content.appendChild(txtLokacija);
                    varLokacija.appendChild(txtLokacija);
                    prviRed.appendChild(varLokacija);
                    content.appendChild(prviRed);

                    var drugiRed = document.createElement("var");
                    drugiRed.classList.add("row", "wrapper--w680");
                    var varOpis = document.createElement("var");
                    varOpis.classList.add("col-2", "input-group");
                    var opis = document.createTextNode("Opis");
                    varOpis.appendChild(opis);
                    varOpis.appendChild(document.createElement("br"));
                    var txtOpis = document.createElement('input');
                    txtOpis.type = 'text';
                    txtOpis.id = "opis";
                    txtOpis.classList.add("input--style-4");
                    txtOpis.style.height = "45px"
                    txtOpis.style.width = "565px"
                    txtOpis.style.marginLeft = "27px"
                    txtOpis.value = klinika.opis;
                    varOpis.appendChild(txtOpis);
                    drugiRed.appendChild(varOpis);
                    content.appendChild(drugiRed);

                    var treciRed = document.createElement("var");
                    treciRed.classList.add("row", "wrapper--w680");
                    var btnLekari = document.createElement('btn');
                    btnLekari.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    btnLekari.innerHTML = "Lekari";
                    btnLekari.id = "lekariBtn";
                    btnLekari.style.width = "250px"
                    btnLekari.style.marginLeft = "27px"
                    btnLekari.style.marginTop = "10px"
                    btnLekari.onclick = prikaziLekareKlinike(klinika);

                    var btnSale = document.createElement('btn');
                    btnSale.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    btnSale.innerHTML = "Sale";
                    btnSale.id = "saleBtn";
                    btnSale.style.marginTop = "10px"
                    btnSale.style.marginLeft = "57px"
                    btnSale.style.width = "250px"
                    btnSale.onclick = prikaziSaleKlinike(klinika);
                    treciRed.appendChild(btnLekari);
                    treciRed.appendChild(btnSale);
                    content.appendChild(treciRed);

                    /*var btnTermini = document.createElement('btn');
                    btnTermini.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    btnTermini.innerHTML = "Slobodni termini";
                    btnTermini.id = "slobodniTerminiBtn";
                    //btnTermini.onclick = generisiSlobodneTermine(klinika);
                    content.appendChild(document.createElement("br"));
                    content.appendChild(document.createElement("br"));
                    content.appendChild(btnTermini);*/

                    //****************************************************
                    var cetvrtiRed = document.createElement("var");
                    cetvrtiRed.classList.add("row", "wrapper--w680");
                    var btnTermini = document.createElement('btn');
                    btnTermini.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    btnTermini.innerHTML = "Slobodni termini";
                    btnTermini.id = "slobodniTerminiBtn";
                    btnTermini.style.width = "250px"
                    btnTermini.style.marginLeft = "27px"
                    btnTermini.style.marginTop = "10px"

                    var btnIzvestaj = document.createElement('btn');
                    btnIzvestaj.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    btnIzvestaj.innerHTML = "Izvestaj";
                    btnIzvestaj.id = "izvestajBtn";
                    btnIzvestaj.style.marginTop = "10px"
                    btnIzvestaj.style.marginLeft = "57px"
                    btnIzvestaj.style.width = "250px"
                    btnIzvestaj.onclick = prikaziIzvestajPoslovanja(klinika);
                    cetvrtiRed.appendChild(btnTermini);
                    cetvrtiRed.appendChild(btnIzvestaj);
                    content.appendChild(cetvrtiRed);
                    //******************************************

                    var btnIzmene = document.createElement('btn');
                    btnIzmene.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    btnIzmene.innerHTML = "Sacuvaj izmene";
                    btnIzmene.id = "izmeneBtn";
                    btnIzmene.onclick = function(){
                        var id = klinika.id;

                        var naziv = $('#naziv').val();
                        var opis = $('#opis').val();
                        var lokacija = $('#lokacija').val();
                        $.ajax({
                            url:'api/klinike/izmenaKlinike',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({id, naziv, opis, lokacija}),
                            headers: {
                                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                            },
                            success: function() {
                                alert("Uspešno izmenjena klinika.")

                            },
                            error: function() {
                                alert("Greška pri izmeni klinike.")
                            }
                        });
                    }
                    content.appendChild(document.createElement("br"));
                    content.appendChild(document.createElement("br"));
                    content.appendChild(btnIzmene);

                });
                $("#content").fadeIn(500);
            },
            error: function () {
                alert("Greska pri dobavljanju informacija o klinici.")
            }
        });


    }
}

function prikaziIzvestajPoslovanja(klinika) {
    return function () {
        $("#content").fadeOut(100, function(){
            var content = document.getElementById("content");
            content.innerHTML = "";

            var prviRed = document.createElement("var");
            prviRed.classList.add("row", "wrapper--w680");

            var varNaziv = document.createElement("var");
            varNaziv.classList.add("col-2", "input-group");
            var naziv = document.createTextNode("Naziv klinike: " + klinika.naziv);
            varNaziv.appendChild(naziv);
            varNaziv.appendChild(document.createElement("br"));
            prviRed.appendChild(varNaziv)

            var varOcena = document.createElement("var");
            varOcena.classList.add("col-2", "input-group");
            var ocena = document.createTextNode("Prosecna ocena klinike: " + klinika.prosecnaOcena);
            varOcena.appendChild(ocena);
            varOcena.appendChild(document.createElement("br"));
            prviRed.appendChild(varOcena);

            var drugiRed = document.createElement("var");
            drugiRed.classList.add("row", "wrapper--w680");

            var table = document.createElement('table');
            table.classList.add("tabela");
            var tableRef = document.createElement('tbody');

            var nasloviRed = tableRef.insertRow();
            var lekarNaslov = nasloviRed.insertCell(0);
            var lekarNaslovText = document.createTextNode("Ime i prezime lekara");
            lekarNaslov.appendChild(lekarNaslovText);

            var ocenaNaslov = nasloviRed.insertCell(1);
            var ocenaNaslovText = document.createTextNode("Prosecna ocena lekara");
            ocenaNaslov.appendChild(ocenaNaslovText);

            $.ajax({
                url:'api/klinike/getLekari/'+klinika.id,
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function(lekari) {
                    for (let lekar of lekari) {
                        var lekarRed = tableRef.insertRow();
                        var naziv = lekarRed.insertCell(0);
                        var nazivText = document.createTextNode(lekar.ime + " " + lekar.prezime);
                        naziv.appendChild(nazivText);

                        var ocenaLekara = lekarRed.insertCell(1);
                        var ocenaLekaraText = document.createTextNode(lekar.ocena);
                        ocenaLekara.appendChild(ocenaLekaraText);
                    }
                }
            });

            table.appendChild(tableRef);
            drugiRed.appendChild(table);

            var treciRed = document.createElement("var");
            treciRed.classList.add("row", "wrapper--w680");

            var varPocDatum = document.createElement("var");
            varPocDatum.classList.add("col-2", "input-group");
            var datumTxt = document.createTextNode("Pocetni datum prihoda klinike");
            varPocDatum.style.marginTop = "20px";
            varPocDatum.appendChild(datumTxt);
            varPocDatum.appendChild(document.createElement("br"));
            var datumPocetak = document.createElement('input');
            datumPocetak.type = 'date';
            datumPocetak.id = "datumPocetakPrihoda";
            datumPocetak.classList.add("input--style-4");
            datumPocetak.style.height = "40px";
            datumPocetak.style.width = "250px"
            datumPocetak.onchange = prihodiKlinike(klinika);
            varPocDatum.appendChild(datumPocetak);
            treciRed.appendChild(varPocDatum);

            var varKrajDatum = document.createElement("var");
            varKrajDatum.classList.add("col-2", "input-group");
            var datumTxt = document.createTextNode("Krajnji datum prihoda klinike");
            varKrajDatum.style.marginTop = "20px";
            varKrajDatum.appendChild(datumTxt);
            varKrajDatum.appendChild(document.createElement("br"));
            var datumKraj = document.createElement('input');
            datumKraj.type = 'date';
            datumKraj.id = "datumKrajPrihoda";
            datumKraj.classList.add("input--style-4");
            datumKraj.style.height = "40px";
            datumKraj.style.width = "250px"
            datumKraj.onchange = prihodiKlinike(klinika);
            varKrajDatum.appendChild(datumKraj);
            treciRed.appendChild(varKrajDatum);

            var varPrihodi = document.createElement("var");
            varPrihodi.classList.add("col-2", "input-group");
            var prihodi = document.createElement('input');
            prihodi.type = 'number';
            prihodi.disabled = true;
            prihodi.id = "prihodi";
            prihodi.classList.add("input--style-4");
            prihodi.style.height = "40px";
            prihodi.style.width = "250px"
            varPrihodi.appendChild(prihodi);

            var odrzaniPreglediBtn = document.createElement("BUTTON");
            odrzaniPreglediBtn.classList.add("btn-list", "btn--radius-2", "btn--light-blue");
            odrzaniPreglediBtn.innerHTML = "Održani pregledi";
            odrzaniPreglediBtn.style.marginTop = "20px"
            odrzaniPreglediBtn.id = "odrzaniPreglediBtn";
            //odrzaniPreglediBtn.onclick = prikazOdrzanihPregleda(klinika);

            content.appendChild(prviRed);
            content.appendChild(drugiRed);
            content.appendChild(treciRed);
            content.appendChild(varPrihodi);
            content.appendChild(odrzaniPreglediBtn);

        });

        $("#content").fadeIn(500);
    }
}

function prihodiKlinike(klinika) {
    return function(){
        var poc = $("#datumPocetakPrihoda").val();
        var kr = $("#datumKrajPrihoda").val();
        if( poc == "" || kr == ""){
            return;
        } else if(kr < poc){
            alert("Krajnji datum mora biti veći od početnog.")
            return;
        }

        var prihodi = 0;

        $.ajax({
            url:'api/klinike/getPregledi/'+klinika.id,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function(pregledi) {
                for( let pregled of pregledi){
                    if(pregled.obavljen && pregled.termin.pocetak > poc && pregled.termin.kraj < kr){
                        prihodi = prihodi + pregled.tipPregleda.cena;
                    }
                }
                var polje = $("#prihodi");
                polje.val(prihodi);
            }
        });


    }
}

function generisiKlinike() {

    $("#content").fadeOut(100, function(){
        document.getElementById("content").innerHTML = "";
        $.get({
            url:'api/klinike/getAll',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function(klinike)
            {

                for(let klinika of klinike)
                {
                    var btn = document.createElement("BUTTON");
                    btn.classList.add("btn-list", "btn--radius-2", "btn--light-blue");
                    btn.innerHTML = klinika.naziv;
                    btn.id = klinika.naziv;
                    btn.onclick = infoKlinike(klinika);
                    document.getElementById("content").appendChild(btn);
                }


            }

        });
    });

    $("#content").fadeIn(500);
}

function infoKlinike(klinika)
{
    return function(){
        // Get the modal
        var modal = document.getElementById("klinikaModal");
        var tableRef = document.getElementById('infoKlinike').getElementsByTagName('tbody')[0];
        tableRef.innerHTML="";
        var podaciKlinike   = tableRef.insertRow();

        var nazivKlinike  = podaciKlinike.insertCell(0);
        var nazivText  = document.createTextNode(klinika.naziv);
        nazivKlinike.appendChild(nazivText);

        var lokacijaKlinike  = podaciKlinike.insertCell(1);
        var lokacijaText  = document.createTextNode(klinika.lokacija);
        lokacijaKlinike.appendChild(lokacijaText);

        var brLekara  = podaciKlinike.insertCell(2);
        var brLekaraText  = document.createTextNode(klinika.brLekara);
        brLekara.appendChild(brLekaraText);

        var brSala  = podaciKlinike.insertCell(3);
        var brSalaText  = document.createTextNode(klinika.brSala);
        brSala.appendChild(brSalaText);

        // When the user clicks on the button, open the modal
        //modal.style.display = "block";
        $("#klinikaModal").fadeIn(500);

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                //modal.style.display = "none";
                $("#klinikaModal").fadeOut(100);
            }
        }
    }

}

function ukloniSalu(sala, idx) {
    return function () {
        if(!sala.slobodna || sala.rezervisana){
            alert("Nemoguće je trenutno obrisati salu!");
            return;
        }
        $.ajax({
            url:'api/sale/'+sala.id,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function() {
                document.getElementById("tabelaSala").deleteRow(idx);
            }
        });
    }

}

function infoSale(sala)
{
    return function() {
        var modal = document.getElementById("saleModal");
        modal.style.display = "none";
        $("#content").fadeOut(100, function(){

            $.get({

                url:'api/sale/getTermini/'+sala.id,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function(termini)
                {
                    var content = document.getElementById("content")
                    content.innerHTML = "";

                    var prviRed = document.createElement("var");
                    prviRed.classList.add("row", "wrapper--w680");

                    var varNaziv = document.createElement("var");
                    varNaziv.classList.add("col-2", "input-group");
                    var naziv = document.createTextNode("Naziv");
                    varNaziv.appendChild(naziv);
                    varNaziv.appendChild(document.createElement("br"));
                    var txtNaziv = document.createElement('input');
                    txtNaziv.type = 'text';
                    txtNaziv.id = "nazivSale";
                    txtNaziv.classList.add("input--style-4");
                    txtNaziv.style.height = "40px";
                    txtNaziv.style.width = "250px";
                    txtNaziv.value = sala.naziv;
                    if(!sala.slobodna || sala.rezervisana)
                        txtNaziv.disabled = "true";
                    varNaziv.appendChild(txtNaziv);
                    prviRed.appendChild(varNaziv);

                    var varBroj = document.createElement("var");
                    varBroj.classList.add("col-2", "input-group");
                    var broj = document.createTextNode("Broj sale");
                    varBroj.appendChild(broj);
                    varBroj.appendChild(document.createElement("br"));
                    var cifraBroj = document.createElement('input');
                    cifraBroj.type = 'number';
                    cifraBroj.id = "nazivSale";
                    cifraBroj.classList.add("input--style-4");
                    cifraBroj.style.height = "40px";
                    cifraBroj.style.width = "250px";
                    cifraBroj.value = sala.broj;
                    if(!sala.slobodna || sala.rezervisana)
                        cifraBroj.disabled = "true";
                    varBroj.appendChild(cifraBroj);
                    prviRed.appendChild(varBroj);
                    content.appendChild(prviRed);


                    var drugiRed = document.createElement("var");
                    drugiRed.classList.add("row", "wrapper--w680");

                    var varObrisi = document.createElement("var");
                    varObrisi.classList.add("col-2", "input-group");
                    varObrisi.appendChild(document.createElement("br"));
                    var btnObrisi = document.createElement('button');
                    btnObrisi.classList.add("btn2", "btn--light-blue");
                    btnObrisi.style.height = "35px"
                    btnObrisi.style.width = "250px"
                    btnObrisi.innerHTML = "Obrisi salu";
                    varObrisi.appendChild(btnObrisi);
                    varObrisi.appendChild(document.createElement("br"));

                    btnObrisi.onclick = function(){
                        if(sala.slobodna == false || sala.rezervisana == true){
                            alert("Nemoguće je trenutno obrisati salu!");
                            return;
                        }
                        $.ajax({
                            url:'api/sale/'+sala.id,
                            type: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                            },
                            success: function() {
                                window.location = "pocetna.html"
                            }
                        });
                    }

                    drugiRed.appendChild(varObrisi);

                    var sacuvajIzmjene = document.createElement("var");
                    sacuvajIzmjene.classList.add("col-2", "input-group");
                    sacuvajIzmjene.appendChild(document.createElement("br"));
                    var sacuvajIzmjeneBtn = document.createElement("BUTTON");
                    sacuvajIzmjeneBtn.classList.add("btn2", "btn--light-blue");
                    sacuvajIzmjeneBtn.innerHTML = "Sacuvaj izmjene";
                    sacuvajIzmjeneBtn.onclick = function(){
                        if(sala.slobodna == false ||sala.rezervisana == true){
                            alert("Nemoguće je trenutno izmeniti salu!");
                            return;
                        }
                        var id = sala.id;
                        var naziv = $('#nazivSale').val();
                        $.ajax({
                            url:'api/sale/izmenaSale',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({id, naziv}),
                            headers: {
                                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                            },
                            success: function() {
                                alert("Uspešno izmenjena sala.")
                            },
                            error: function() {
                                alert("Greška pri izmeni sale.")
                            }
                        });
                    }
                    sacuvajIzmjene.appendChild(sacuvajIzmjeneBtn);
                    sacuvajIzmjene.appendChild(document.createElement("br"));
                    drugiRed.appendChild(sacuvajIzmjene);
                    content.appendChild(drugiRed);

                    var treciRed = document.createElement("var");
                    treciRed.classList.add("row", "wrapper--w680");
                    var varRezervacije = document.createElement("var");
                    varRezervacije.classList.add("col-2", "input-group");
                    var rezervacije = document.createTextNode("Rezervacije");
                    varRezervacije.appendChild(rezervacije);
                    varRezervacije.appendChild(document.createElement("br"));
                    // Make a container element for the list
                    var listContainer = document.createElement('div')
                    // Make the list
                    var listElement = document.createElement('ul')
                    // Add it to the page
                    varRezervacije.appendChild(listContainer);
                    listContainer.appendChild(listElement);

                    for (let termin of termini) {
                        // create an item for each one
                        var listItem = document.createElement('li');
                        // Add the item text
                        listItem.innerHTML = termin.pocetak + " - " +termin.kraj;
                        // Add listItem to the listElement
                        listElement.appendChild(listItem);
                    }
                    treciRed.appendChild(varRezervacije);
                    content.appendChild(treciRed);

                }

            });
        });
        $("#content").fadeIn(500);
    }
}


function generisiSlobodneTermine(klinika) {
    $.get({

        url: 'api/klinike/getSlobodniTermini/' + klinika.naziv,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
        },
        success: function (termini) {
            $("#content").fadeOut(100, function () {
                var content = document.getElementById("content")
                content.innerHTML = "";

                var table = document.createElement('table');
                table.classList.add("tabela");
                var tableRef = document.createElement('tbody');

                for (let termin of termini) {
                    var podaciTermina = tableRef.insertRow();
                    var pocetakTermina = podaciTermina.insertCell(0);
                    var pocetakTerminaText = document.createTextNode(termin.pocetak);
                    pocetakTermina.appendChild(pocetakTerminaText);

                    var krajTermina = podaciTermina.insertCell(1);
                    var krajTerminaText = document.createTextNode(termin.kraj);
                    krajTermina.appendChild(krajTerminaText);

                    var ukloni = podaciTermina.insertCell(2);
                    var ukloniBtn = document.createElement("BUTTON");
                    ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    ukloniBtn.innerHTML = "-";
                    ukloniBtn.onclick = ukloniTermin(klinika, termin.id);
                    ukloni.appendChild(ukloniBtn);

                }
                table.appendChild(tableRef);
                content.appendChild(table);
                var dodajBtn = document.createElement("BUTTON");
                dodajBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                dodajBtn.innerHTML = "+";
                dodajBtn.onclick = dodajSlobodanTermin(klinika);
                content.appendChild(dodajBtn);
            });
            $("#content").fadeIn(500);
        }

    });

}
function dodajSlobodanTermin(klinika) {
    return function () {
        var modal = document.getElementById("slobodanTerminModal");
        modal.style.display = "block";

        var span = document.getElementById("closeTermini");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        var content = document.getElementById("slobodniTerminiDiv");
        content.innerHTML = "";

        var nultiRed = document.createElement("var");
        nultiRed.classList.add("row", "wrapper--w680");
        var varDatum = document.createElement("var");
        varDatum.classList.add("col-2", "input-group");
        var datumTxt = document.createTextNode("Datum");
        varDatum.appendChild(datumTxt);
        varDatum.appendChild(document.createElement("br"));
        var datum = document.createElement('input');
        datum.type = 'date';
        datum.id = "datum";
        datum.classList.add("input--style-4");
        datum.style.height = "40px";
        datum.style.width = "250px"
        varDatum.appendChild(datum);
        nultiRed.appendChild(varDatum);

        content.appendChild(nultiRed);

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var varPocetak = document.createElement("var");
        varPocetak.classList.add("col-2", "input-group");
        var pocetakTxt = document.createTextNode("Pocetak");
        varPocetak.appendChild(pocetakTxt);
        varPocetak.appendChild(document.createElement("br"));
        var pocetak = document.createElement('input');
        pocetak.type = 'time';
        pocetak.id = "pocetak";
        pocetak.classList.add("input--style-4");
        pocetak.style.height = "40px";
        pocetak.style.width = "250px"
        varPocetak.appendChild(pocetak);
        prviRed.appendChild(varPocetak);

        var varKraj = document.createElement("var");
        varKraj.classList.add("col-2", "input-group");
        var krajTxt = document.createTextNode("Kraj");
        varKraj.appendChild(krajTxt);
        varKraj.appendChild(document.createElement("br"));
        var kraj = document.createElement('input');
        kraj.type = 'time';
        kraj.id = "kraj";
        kraj.classList.add("input--style-4");
        kraj.style.height = "40px";
        kraj.style.width = "250px"
        varKraj.appendChild(kraj);
        prviRed.appendChild(varKraj);

        content.appendChild(prviRed);

        var drugiRed = document.createElement("var");
        drugiRed.classList.add("row", "wrapper--w680");

        var varOk = document.createElement("var");
        varOk.classList.add("col-2", "input-group");

        var okBtn = document.createElement("BUTTON");
        okBtn.innerText = "OK"
        okBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");

        varOk.appendChild(okBtn);
        drugiRed.appendChild(varOk);
        content.appendChild(drugiRed);

        okBtn.onclick = function(){
            datum = $('#datum').val();
            pocetak =  $('#pocetak').val();
            kraj =  $('#kraj').val();

            if(pocetak == "" || kraj == "" || datum == ""){
                alert("Popunite sva polja!");
                return;
            }

            pocetak = datum + " "  + pocetak +":00";
            kraj = datum + " "  + kraj +":00";


            $.ajax({
                url:'api/klinike/'+klinika.id+'/dodajSlobodanTermin',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({pocetak, kraj}),

                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    modal.style.display = "none";
                    generisiSlobodneTermine(klinika);
                }
            });
        }


    }
}

function ukloniTermin(klinika, terminId) {
    return function(){
        $.ajax({
            url:'api/klinike/deleteTermin/'+klinika.id+'/'+terminId,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function() {
                generisiSlobodneTermine(klinika);
            }
        });
    }
}

function prikaziSaleKlinike(klinika, flag, zahtev) {
    console.log(flag)
    return function(){
        $.get({

            url: 'api/klinike/getSale/' + klinika.naziv,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (sale) {
                var modal = document.getElementById("saleModal");
                modal.style.display = "block";

                var span = document.getElementById("closeSale");

                span.onclick = function () {
                    modal.style.display = "none";
                }

                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                var saleDiv = document.getElementById("saleDiv");
                saleDiv.innerHTML = "";
                var content = saleDiv;
                if(flag === "rezervacija"){
                    var naslov = document.createElement("HEADER");
                    naslov.innerText = "Rezervacija sale";
                    naslov.style.fontSize = "18px";
                    content.appendChild(naslov);
                    content.appendChild(document.createElement("br"));
                }
                var searchDiv = document.createElement("DIV");
                searchDiv.align = "center";
                var search = document.createElement("INPUT");
                search.type = "text";
                search.classList.add("input--style-4");
                search.id = "search";
                search.name = "search";

                //Ukoliko je za rezervaciju sale
                if(flag ==="rezervacija"){

                    var datumPocetak = document.createElement('input');
                    datumPocetak.type = 'date';
                    datumPocetak.id = "datumPoc";
                    datumPocetak.classList.add("input--style-4");
                    datumPocetak.style.height = "40px";
                    datumPocetak.style.width = "190px";
                    datumPocetak.value = zahtev.termin.pocetakDate.substr(0,10);
                    searchDiv.appendChild(search);
                    searchDiv.appendChild(datumPocetak);
                    content.append(searchDiv);
                    $('#search').keyup(function(){
                        search_tabela_sala($(this).val(), flag, zahtev);
                    });
                } else {
                    searchDiv.appendChild(search);
                    content.append(searchDiv);
                    //Ukoliko je obicna pretraga
                    $('#search').keyup(function(){
                        search_tabela_sala($(this).val());
                    });
                }


                var table = document.createElement('table');
                table.id = "tabelaSala";
                table.classList.add("tabela");
                var tableRef = document.createElement('tbody');
                var idx = 0;

                if(sale.length > 0){
                    for (let sala of sale) {
                        var podaciSale   = tableRef.insertRow();

                        var brojSale = podaciSale.insertCell(0);
                        var cifra = document.createTextNode("("+sala.broj+")");
                        brojSale.appendChild(cifra);

                        var nazivSale = podaciSale.insertCell(1);
                        var nazivSaleText = document.createTextNode(sala.naziv);
                        nazivSale.appendChild(nazivSaleText);

                        var izmeni = podaciSale.insertCell(2);
                        var izmeniBtn = document.createElement("BUTTON");
                        izmeniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                        izmeniBtn.innerHTML = "Izmeni";
                        izmeniBtn.onclick = infoSale(sala);
                        izmeni.appendChild(izmeniBtn);

                        var ukloni = podaciSale.insertCell(3);
                        var ukloniBtn = document.createElement("BUTTON");
                        ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                        ukloniBtn.innerHTML = "-";
                        ukloniBtn.onclick = ukloniSalu(sala, idx);
                        ukloni.appendChild(ukloniBtn);
                        idx = idx + 1;

                    }
                    table.appendChild(tableRef);
                    content.appendChild(table);
                    var dodajBtn = document.createElement("BUTTON");
                    dodajBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                    dodajBtn.innerHTML = "Dodaj novu salu";
                    dodajBtn.onclick = dodajSalu(klinika);
                    content.appendChild(dodajBtn);
                } else if (sale.length === 0) {
                    var textnode = document.createTextNode("Ne postoje sale u klinici.");
                    document.getElementById("saleDiv").appendChild(textnode);
                }
            }

        });
    }
}

function search_tabela_sala(value, flag, zahtev) {
    //PRVO REFRESH TABELE, BRISANJE DODAVANIH DUGMADI
    var table = document.getElementById("tabelaSala");
    for (var i = 0, row; row = table.rows[i]; i++) {
        if(row.cells[4] != null)
            row.deleteCell(4);
    }

    $('#tabelaSala tr').each(function () {
        var found = 'false';
        $(this).each(function () {
            if ($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                found = 'true';
            }
        });
        if (found === 'true') {
            if(flag === "rezervacija"){

                var poc = $('#datumPoc').val();
                var red = $(this).text();
                var brojSale = red[1].split(')');
                var redTabele = $(this)[0];

                if(poc !== ""){

                    $.get({
                        url: 'api/klinike/daLiJeRezervisanaSala/' + brojSale+'/'+poc,
                        contentType: 'application/json',
                        headers: {
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                        },
                        success: function (s) {
                            if(s === "SLOBODNA"){
                                if(!redTabele.contains(document.getElementById("rezervisiBtn" ))){
                                    if(redTabele.contains(document.getElementById("iduciDatumBtn"))){
                                        //redTabele.cells[4].removeChild(document.getElementById("iduciDatumBtn"));
                                        redTabele.deleteCell(4);
                                    }
                                    var btn = document.createElement('input');
                                    btn.type = "button";
                                    btn.id = "rezervisiBtn";
                                    btn.value = "Rezervisi";
                                    btn.classList.add("btn2", "btn--light-blue");
                                    btn.onclick = zakaziSaluZaPregled(zahtev, brojSale);
                                    var btnCell = redTabele.insertCell(4);
                                    btnCell.appendChild(btn);
                                }
                            } else {
                                if(!(redTabele.contains(document.getElementById("iduciDatumBtn")))){
                                    if(redTabele.contains(document.getElementById("rezervisiBtn"))){
                                        //redTabele.cells[4].removeChild(document.getElementById("iduciDatumBtn"));
                                        redTabele.deleteCell(4);
                                    }
                                    var btn = document.createElement('input');
                                    btn.type = "button";
                                    btn.id = "iduciDatumBtn";
                                    if(document.getElementById("saleDiv").contains(document.getElementById("rezervisiBtn"))){
                                        btn.disabled = "true";
                                        btn.style.backgroundColor = "gray";
                                    }
                                    btn.value = s;
                                    btn.classList.add("btn2", "btn--light-blue");
                                    btn.onclick = zakaziSaluZaPregledIduciTermin(zahtev, brojSale, s);
                                    var btnCell =  redTabele.insertCell(4);
                                    btnCell.appendChild(btn);
                                }
                            }

                        }
                    });
                }
            }

            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
function zakaziSaluZaPregledIduciTermin(pregled, brojSale, s) {
    return function () {
        var modal = document.getElementById("rezervacijaSaleModal");
        modal.style.display = "block";

        var span = document.getElementById("closeRezervacijaSale");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        var content = document.getElementById("rezervacijaSaleDiv");
        content.innerHTML = "";
        var naslov = document.createElement("HEADER");
        s = s + " 08:00:00";
        naslov.innerText = "Rezervisati salu " + brojSale +" za " + s + "?";
        naslov.style.fontSize = "15px";
        content.appendChild(naslov);
        content.appendChild(document.createElement("br"));

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var btnDa = document.createElement('input');
        btnDa.type = "button";
        btnDa.id = "btnDa";
        btnDa.value = "Da";
        btnDa.onclick = function () {
            $.post({
                url: 'api/sale/dodijeliSaluPregleduIduciTermin/' + brojSale +'/'+pregled.id,
                data: s,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function () {
                    alert("Sala rezervisana.");
                    modal.style.display = "none";
                    document.getElementById("saleModal").style.display = "none";
                    generisiZahteve();
                }
            });
        };
        btnDa.style.marginBottom = "10px";
        btnDa.classList.add("btn", "btn--light-blue");
        var btnNe = document.createElement('input');
        btnNe.type = "button";
        btnNe.id = "btnNe";
        btnNe.value = "Ne";
        btnNe.onclick = function(){
            modal.style.display = "none";
            content.innerHTML = "";
        }
        btnNe.classList.add("btn2", "btn--light-blue");
        prviRed.appendChild(btnDa);
        prviRed.appendChild(btnNe);
        content.appendChild(prviRed);
    }
}

function zakaziSaluZaPregled(pregled, brojSale) {

    return function () {

        var modal = document.getElementById("rezervacijaSaleModal");
        modal.style.display = "block";

        var span = document.getElementById("closeRezervacijaSale");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        var content = document.getElementById("rezervacijaSaleDiv");
        content.innerHTML = "";
        var naslov = document.createElement("HEADER");

        naslov.innerText = "Rezervisati salu " + brojSale +" za " + pregled.termin.pocetak + " - " + pregled.termin.kraj + "?";
        naslov.style.fontSize = "15px";
        content.appendChild(naslov);
        content.appendChild(document.createElement("br"));

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var btnDa = document.createElement('input');
        btnDa.type = "button";
        btnDa.id = "btnDa";
        btnDa.value = "Da";
        btnDa.onclick = function () {
            let id = pregled.id;
            $.post({
                url: 'api/sale/dodijeliSaluPregledu/' + brojSale,
                data: JSON.stringify({id}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function () {
                    alert("Sala rezervisana.");
                    modal.style.display = "none";
                    document.getElementById("saleModal").style.display = "none";
                    generisiZahteve();
                }
            });
        };
        btnDa.style.marginBottom = "10px";
        btnDa.classList.add("btn", "btn--light-blue");
        var btnNe = document.createElement('input');
        btnNe.type = "button";
        btnNe.id = "btnNe";
        btnNe.value = "Ne";
        btnNe.onclick = function(){
            modal.style.display = "none";
            content.innerHTML = "";
        }
        btnNe.classList.add("btn2", "btn--light-blue");
        prviRed.appendChild(btnDa);
        prviRed.appendChild(btnNe);
        content.appendChild(prviRed);
    }
}

function dodajSalu(klinika) {
    return function () {
        var modal = document.getElementById("dodajSaluModal");
        modal.style.display = "block";

        var span = document.getElementById("closeDodajSalu");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        var content = document.getElementById("dodajSaluDiv");
        content.innerHTML = "";

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var varNaziv = document.createElement("var");
        varNaziv.classList.add("col-2", "input-group");
        var naziv = document.createTextNode("Naziv");
        varNaziv.appendChild(naziv);
        varNaziv.appendChild(document.createElement("br"));
        var txtNaziv = document.createElement('input');
        txtNaziv.type = 'text';
        txtNaziv.id = "nazivSale";
        txtNaziv.classList.add("input--style-4");
        txtNaziv.style.height = "40px";
        txtNaziv.style.width = "250px";
        varNaziv.appendChild(txtNaziv);
        prviRed.appendChild(varNaziv);

        var varDodaj = document.createElement("var");
        varDodaj.classList.add("col-2", "input-group");
        varDodaj.appendChild(document.createElement("br"));
        var btnAdd = document.createElement('button');
        btnAdd.classList.add("btn2", "btn--light-blue");
        btnAdd.style.height = "35px"
        btnAdd.style.width = "250px"
        btnAdd.innerHTML = "Dodaj salu";

        btnAdd.onclick = function(){
            var naziv=$('#nazivSale').val();

            if(naziv === ""){
                alert("Polje ne sme ostati prazno.")
                return
            }

            if(naziv.length < 3){
                alert("Naziv mora imati više od tri karaktera!")
                return
            }

            var idKlinike = klinika.id;
            $.post({
                url: 'api/sale/dodajSalu',
                data: JSON.stringify({naziv, idKlinike}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Nova sala uspesno dodata.");
                    modal.style.display = "none";

                },
                error: function() {
                    alert("Greška pri dodavanju sale.");
                    modal.style.display = "none";
                }
            });
        }
        varDodaj.appendChild(btnAdd);
        varDodaj.appendChild(document.createElement("br"));
        prviRed.appendChild(varDodaj);
        content.appendChild(prviRed);
    }
}

function prikaziLekareKlinike(klinika) {
    return function(){
        $.get({

            url:'api/klinike/getLekari/'+klinika.id,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function(lekari)
            {
                var modal = document.getElementById("lekariModal");
                modal.style.display = "block";

                var span = document.getElementById("closeLekari");

                span.onclick = function() {
                    modal.style.display = "none";
                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

                var lekariDiv = document.getElementById("lekariDiv");
                lekariDiv.innerHTML = "";
                for(let lekar of lekari)
                {
                    var btn = document.createElement("BUTTON");
                    btn.classList.add("btn-list", "btn--radius-2", "btn--light-blue");
                    btn.innerHTML = lekar.ime + " " + lekar.prezime;
                    btn.onclick = prikazKorisnika(lekar);
                    lekariDiv.appendChild(btn);
                }

            }

        });
    }
}



function dodajTipPregleda(idKlinike) {
    return function(){

        var modal = document.getElementById("tipPregledaModal");
        modal.style.display = "block";

        var span = document.getElementById("closeTipPregleda");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        var content = document.getElementById("tipPregledaDiv");
        content.innerHTML = "";

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var varNaziv = document.createElement("var");
        varNaziv.classList.add("col-2", "input-group");
        var naziv = document.createTextNode("Naziv");
        varNaziv.appendChild(naziv);
        varNaziv.appendChild(document.createElement("br"));
        var txtNaziv = document.createElement('input');
        txtNaziv.type = 'text';
        txtNaziv.id = "naziv";
        txtNaziv.classList.add("input--style-4");
        txtNaziv.style.height = "40px";
        txtNaziv.style.width = "250px";
        varNaziv.appendChild(txtNaziv);
        prviRed.appendChild(varNaziv);

        var varCijena = document.createElement("var");
        varCijena.classList.add("col-2", "input-group");
        var cijena = document.createTextNode("Cena");
        varCijena.appendChild(cijena);
        varCijena.appendChild(document.createElement("br"));
        var cifra = document.createElement('input');
        cifra.type = 'number';
        cifra.id = "cena";
        cifra.style.height = "40px"
        cifra.style.width = "250px"
        content.appendChild(cifra);
        varCijena.appendChild(cifra);
        prviRed.appendChild(varCijena);
        content.appendChild(prviRed);


        var treciRed = document.createElement("var");
        treciRed.classList.add("row", "wrapper--w680");

        var varOk = document.createElement("var");
        varOk.classList.add("col-2", "input-group");

        var okBtn = document.createElement("BUTTON");
        okBtn.innerText = "OK"
        okBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");

        varOk.appendChild(okBtn);
        treciRed.appendChild(varOk);
        content.appendChild(treciRed);

        okBtn.onclick = function(){
            naziv =  $('#naziv').val();
            cena =  $('#cena').val();

            if(naziv == "" || cena == 0){
                alert("Popunite sva polja!");
                return;
            }

            $.ajax({
                url:'api/klinike/dodajTipPregleda',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({idKlinike, naziv, cena}),

                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    modal.style.display = "none";
                    generisiTipovePregleda();
                }
            });
        }

    }
}


function generisiTipovePregleda() {
    var ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    $.ajax
    ({
        type: "GET",
        url: 'api/korisnici/getKlinikaAdmina/' + ulogovan.id,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
        },
        success: function (klinika) {
            $("#content").fadeOut(100, function () {
                $.get({
                    url: 'api/klinike/getTipoviPregleda/' + klinika.id,
                    contentType: 'application/json',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                    },
                    success: function (tipoviPregleda) {
                        $("#content").fadeOut(100, function() {
                            var content = document.getElementById('content')
                            content.innerHTML = "";
                            var table = document.createElement('table');
                            table.classList.add("tabela");
                            var tableRef = document.createElement('tbody');

                            for(let tipPregleda of tipoviPregleda) {
                                var podaciPregleda   = tableRef.insertRow();
                                var nazivPregleda = podaciPregleda.insertCell(0);
                                var nazivPregledaText = document.createTextNode(tipPregleda.naziv);
                                nazivPregleda.appendChild(nazivPregledaText);

                                var cenaPregleda = podaciPregleda.insertCell(1);
                                var cenaPregledaText = document.createTextNode(tipPregleda.cena);
                                cenaPregleda.appendChild(cenaPregledaText);

                                var izmeni = podaciPregleda.insertCell(2);
                                var izmeniBtn = document.createElement("BUTTON");
                                izmeniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                izmeniBtn.innerHTML = "Izmeni";
                                izmeniBtn.onclick = izmeniTipPregleda(tipPregleda);
                                izmeni.appendChild(izmeniBtn);

                                var ukloni = podaciPregleda.insertCell(3);
                                var ukloniBtn = document.createElement("BUTTON");
                                ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                ukloniBtn.innerHTML = "-";
                                ukloniBtn.onclick = ukloniTipPregleda(klinika.id, tipPregleda.id);
                                ukloni.appendChild(ukloniBtn);

                            }
                            table.appendChild(tableRef);
                            content.appendChild(table);
                            var dodajBtn = document.createElement("BUTTON");
                            dodajBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                            dodajBtn.innerHTML = "+";
                            dodajBtn.onclick = dodajTipPregleda(klinika.id);
                            content.appendChild(dodajBtn);
                        });
                        $("#content").fadeIn(500);
                    }, error: function () {
                        console.log("Greska")
                    }

                });
            });
        }
    })
}

function izmeniTipPregleda(tipPregleda) {
    return function(){

        var modal = document.getElementById("tipPregledaModal");
        modal.style.display = "block";

        var span = document.getElementById("closeTipPregleda");

        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        var content = document.getElementById("tipPregledaDiv");
        content.innerHTML = "";

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var varNaziv = document.createElement("var");
        varNaziv.classList.add("col-2", "input-group");
        var naziv = document.createTextNode("Naziv");
        varNaziv.appendChild(naziv);
        varNaziv.appendChild(document.createElement("br"));
        var txtNaziv = document.createElement('input');
        txtNaziv.type = 'text';
        txtNaziv.id = "naziv";
        txtNaziv.classList.add("input--style-4");
        txtNaziv.style.height = "40px";
        txtNaziv.style.width = "250px";
        txtNaziv.value = tipPregleda.naziv;
        varNaziv.appendChild(txtNaziv);
        prviRed.appendChild(varNaziv);

        var varCijena = document.createElement("var");
        varCijena.classList.add("col-2", "input-group");
        var cijena = document.createTextNode("Cena");
        varCijena.appendChild(cijena);
        varCijena.appendChild(document.createElement("br"));
        var cifra = document.createElement('input');
        cifra.type = 'number';
        cifra.id = "cena";
        //cifra.classList.add("input--style-4");
        cifra.style.height = "40px"
        cifra.style.width = "250px"
        cifra.value = tipPregleda.cena;
        content.appendChild(cifra);
        varCijena.appendChild(cifra);
        prviRed.appendChild(varCijena);
        content.appendChild(prviRed);

        var okBtn = document.createElement("BUTTON");
        okBtn.innerText = "OK"
        okBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");

        content.appendChild(okBtn);
        okBtn.onclick = function(){

            id = tipPregleda.id;
            naziv =  $('#naziv').val();
            cena =  $('#cena').val();

            $.ajax({
                url:'api/klinike/izmeniTipPregleda',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({id, naziv, cena}),

                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    modal.style.display = "none";
                    generisiTipovePregleda();
                }
            });
        }

    }
}


function ukloniTipPregleda(klinikaId, tipPregledaId) {
    return function(){

        $.ajax({
            url:'api/klinike/deleteTipPregleda/'+klinikaId+'/'+tipPregledaId,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function() {
                generisiTipovePregleda();
            }
        });
    }
}


function generisiFormuZaNovogLekara(klinika) {
    return function () {
        $("#content").fadeOut(100, function(){
            var content = document.getElementById("content");
            content.innerHTML = "";

            var prviRed = document.createElement("var");
            prviRed.classList.add("row", "wrapper--w680");
            var varIme = document.createElement("var");
            varIme.classList.add("col-2", "input-group");
            var ime = document.createTextNode("Ime");
            varIme.appendChild(ime);
            varIme.appendChild(document.createElement("br"));
            var txtIme = document.createElement('input');
            txtIme.type = 'text';
            txtIme.id = "ime";
            txtIme.classList.add("input--style-4");
            txtIme.style.height = "40px";
            txtIme.style.width = "250px";
            varIme.appendChild(txtIme);
            prviRed.appendChild(varIme);
            var varPrezime = document.createElement("var");
            varPrezime.classList.add("col-2", "input-group");
            var prezime = document.createTextNode("Prezime");
            varPrezime.appendChild(prezime);
            varPrezime.appendChild(document.createElement("br"));
            var txtPrezime = document.createElement('input');
            txtPrezime.type = 'text';
            txtPrezime.id = "prezime";
            txtPrezime.classList.add("input--style-4");
            txtPrezime.style.height = "40px"
            txtPrezime.style.width = "250px"
            content.appendChild(txtPrezime);
            varPrezime.appendChild(txtPrezime);
            prviRed.appendChild(varPrezime);
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
            varEmail.appendChild(txtEmail);
            drugiRed.appendChild(varEmail);
            content.appendChild(drugiRed);

            var treciRed = document.createElement("var");
            treciRed.classList.add("row", "wrapper--w680");
            var varLozinka = document.createElement("var");
            varLozinka.classList.add("col-2", "input-group");
            var lozinka = document.createTextNode("Lozinka");
            varLozinka.appendChild(lozinka);
            varLozinka.appendChild(document.createElement("br"));
            var txtLozinka = document.createElement('input');
            txtLozinka.type = 'password';
            txtLozinka.id = "lozinka";
            txtLozinka.classList.add("input--style-4");
            txtLozinka.style.height = "40px"
            txtLozinka.style.width = "250px"
            varLozinka.appendChild(txtLozinka);
            treciRed.appendChild(varLozinka);
            var varLozinka2 = document.createElement("var");
            varLozinka2.classList.add("col-2", "input-group");
            var lozinka2 = document.createTextNode("Ponovite lozinku");
            varLozinka2.appendChild(lozinka2);
            varLozinka2.appendChild(document.createElement("br"));
            var txtLozinka2 = document.createElement('input');
            txtLozinka2.type = 'password';
            txtLozinka2.id = "lozinka2";
            txtLozinka2.classList.add("input--style-4");
            txtLozinka2.style.height = "40px"
            txtLozinka2.style.width = "250px"
            varLozinka2.appendChild(txtLozinka2);
            treciRed.appendChild(varLozinka2);
            content.appendChild(treciRed);
            content.appendChild(document.createElement("br"));
            content.appendChild(document.createElement("br"));

            var cetvrtiRed = document.createElement("var");
            cetvrtiRed.classList.add("row", "wrapper--w680");
            var varPocetak = document.createElement("var");
            varPocetak.classList.add("col-2", "input-group");
            var pocetak = document.createTextNode("Početak radnog vremena");
            varPocetak.appendChild(pocetak);
            varPocetak.appendChild(document.createElement("br"));
            var cifraPocetak = document.createElement('input');
            cifraPocetak.type = 'time';
            cifraPocetak.id = "pocRadnogVremena";
            cifraPocetak.classList.add("input--style-4");
            cifraPocetak.style.height = "40px"
            cifraPocetak.style.width = "250px"
            varPocetak.appendChild(cifraPocetak);
            cetvrtiRed.appendChild(varPocetak);
            var varKraj = document.createElement("var");
            varKraj.classList.add("col-2", "input-group");
            var lozinka2 = document.createTextNode("Ponovite lozinku");
            varKraj.appendChild(lozinka2);
            varKraj.appendChild(document.createElement("br"));
            var cifraKraj = document.createElement('input');
            cifraKraj.type = 'time';
            cifraKraj.id = "krRadnogVremena";
            cifraKraj.classList.add("input--style-4");
            cifraKraj.style.height = "40px"
            cifraKraj.style.width = "250px"
            varKraj.appendChild(cifraKraj);
            cetvrtiRed.appendChild(varKraj);
            content.appendChild(cetvrtiRed);

            var btnAdd = document.createElement("BUTTON");
            btnAdd.classList.add("btn2", "btn--light-blue");
            btnAdd.innerHTML = "Dodaj";
            btnAdd.onclick = function(){
                var korisnickoIme=$('#username').val();
                var lozinka=$('#lozinka').val();
                var lozinka_potvrda=$('#lozinka2').val();
                var ime=$('#ime').val();
                var prezime=$('#prezime').val();
                var email=$('#email').val();
                var idKlinike = klinika.id;
                var radnoVreme = $('#pocRadnogVremena').val() + " " +  $('#krRadnogVremena').val();

                if(korisnickoIme === "" || lozinka === "" || lozinka_potvrda === "" || ime === "" || prezime === "" || email === ""){
                    alert("Nijedno polje ne sme ostati prazno.");
                    return;
                }

                if( lozinka!=lozinka_potvrda){
                    alert("Lozinke se ne poklapaju!");
                    return;
                }

                if(lozinka.length < 5){
                    alert("Lozinka mora imati više od pet karaktera!");
                    return;
                }

                if(ime.length < 3){
                    alert("Ime mora imati bar tri karaktera!");
                    return;
                }

                if(korisnickoIme.length < 5){
                    alert("Korisnicko ime mora imati bar pet karaktera!");
                    return;
                }

                if(prezime.length < 3){
                    alert("Prezime mora imati bar tri karaktera!");
                    return;

                }

                $.post({
                    url: 'api/lekari/dodajLekara',
                    data: JSON.stringify({korisnickoIme, lozinka, ime, prezime, email, idKlinike, radnoVreme}),
                    contentType: 'application/json',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                    },
                    success: function() {
                        alert("Novi lekar uspesno dodat.")
                    },
                    error: function() {
                        alert("Novi lekar nije dodat.")
                    }
                });
            }
            content.appendChild(btnAdd);
        });
        $("#content").fadeIn(500);
    }
}

function generisiZahteve() {
    var ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    $.ajax
    ({
        type: "GET",
        url: 'api/korisnici/getKlinikaAdmina/' + ulogovan.id,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
        },
        success: function (klinika) {
            $("#content").fadeOut(100, function () {
                //ZA PREGLEDE**************************************************************************************
                $.get({

                    url: 'api/adminKlinike/getZahteviZaPreglede/' + klinika.id,
                    contentType: 'application/json',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                    },
                    success: function (pregledi) {

                        var content = document.getElementById("content");
                        content.innerHTML = "";
                        var naslov = document.createElement("HEADER");
                        naslov.innerText = "Pregledi";
                        naslov.style.fontSize = "18px";
                        content.appendChild(naslov);
                        content.appendChild(document.createElement("br"));

                        var table = document.createElement('table');
                        table.id = "tabelaPregleda";
                        table.classList.add("tabela");

                        var header = table.createTHead();
                        var row = header.insertRow(0);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        cell.innerHTML = "<b>Tip pregleda</b>";
                        cell1.innerHTML = "<b>Lekar</b>";
                        cell2.innerHTML = "<b>Pacijent</b>";
                        cell3.innerHTML = "<b>Termin</b>";
                        cell4.innerHTML = "<b>Prihvati</b>";
                        cell5.innerHTML = "<b>Odbij</b>";

                        var tableRef = document.createElement('tbody');
                        var idx = 0;

                        if (pregledi.length > 0) {
                            for (let zahtev of pregledi) {
                                var podaciZahteva = tableRef.insertRow();
                                var tipZahteva = podaciZahteva.insertCell(0);
                                var tipZahtevaText = document.createTextNode(zahtev.tipPregleda.naziv);
                                tipZahteva.appendChild(tipZahtevaText);

                                var lekar = podaciZahteva.insertCell(1);
                                var lekarText = document.createTextNode(zahtev.lekar.ime + " " + zahtev.lekar.prezime);
                                lekar.appendChild(lekarText);

                                var pacijent = podaciZahteva.insertCell(2);
                                var pacijentText = document.createTextNode(zahtev.pacijent.ime + " " + zahtev.pacijent.prezime);
                                pacijent.appendChild(pacijentText);

                                var termin = podaciZahteva.insertCell(3);
                                var terminText = document.createTextNode(zahtev.termin.pocetak + "-" + zahtev.termin.kraj);
                                termin.appendChild(terminText);

                                var prihvati = podaciZahteva.insertCell(4);
                                var prihvatiBtn = document.createElement("BUTTON");
                                prihvatiBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                prihvatiBtn.innerHTML = "&#10003;";
                                prihvati.onclick = prikaziSaleKlinike(klinika, "rezervacija", zahtev);
                                prihvati.appendChild(prihvatiBtn);

                                var ukloni = podaciZahteva.insertCell(5);
                                var ukloniBtn = document.createElement("BUTTON");
                                ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                ukloniBtn.innerHTML = "&times;";
                                ukloniBtn.onclick = ukloniZahtevZaPregled(klinika, zahtev.id);
                                ukloni.appendChild(ukloniBtn);
                                idx = idx + 1;

                            }
                            table.appendChild(tableRef);
                            content.appendChild(table);

                        } else if (pregledi.length === 0) {
                            var textnode = document.createTextNode("Ne postoje zahtevi za rezervaciju termina trenutno.");
                            content.appendChild(textnode);
                        }


                        //ZA OPERACIJE******************************************************************************
                        $.get({

                            url: 'api/adminKlinike/getZahteviZaOperacije/' + klinika.id,
                            contentType: 'application/json',
                            headers: {
                                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                            },
                            success: function (operacije) {

                                var content = document.getElementById("content");
                                content.appendChild(document.createElement("br"));
                                var naslov = document.createElement("HEADER");
                                naslov.innerText = "Operacije";
                                naslov.style.fontSize = "18px";
                                content.appendChild(naslov);
                                content.appendChild(document.createElement("br"));

                                var table = document.createElement('table');
                                table.id = "tabelaOperacija";
                                table.classList.add("tabela");

                                var header = table.createTHead();
                                var row = header.insertRow(0);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                var cell5 = row.insertCell(4);
                                cell1.innerHTML = "<b>Lekar</b>";
                                cell2.innerHTML = "<b>Pacijent</b>";
                                cell3.innerHTML = "<b>Termin</b>";
                                cell4.innerHTML = "<b>Prihvati</b>";
                                cell5.innerHTML = "<b>Odbij</b>";
                                var tableRef = document.createElement('tbody');
                                var idx = 0;

                                if (operacije.length > 0) {
                                    for (let zahtev of operacije) {
                                        var podaciZahteva = tableRef.insertRow();

                                        var lekar = podaciZahteva.insertCell(0);
                                        var lekarText = document.createTextNode(zahtev.lekar.ime + " " + zahtev.lekar.prezime);
                                        lekar.appendChild(lekarText);

                                        var pacijent = podaciZahteva.insertCell(1);
                                        var pacijentText = document.createTextNode(zahtev.pacijent.ime + " " + zahtev.pacijent.prezime);
                                        pacijent.appendChild(pacijentText);

                                        var termin = podaciZahteva.insertCell(2);
                                        var terminText = document.createTextNode(zahtev.termin.pocetak + "-" + zahtev.termin.kraj);
                                        termin.appendChild(terminText);

                                        var prihvati = podaciZahteva.insertCell(3);
                                        var prihvatiBtn = document.createElement("BUTTON");
                                        prihvatiBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                        prihvatiBtn.innerHTML = "&#10003;";
                                        prihvati.appendChild(prihvatiBtn);

                                        var ukloni = podaciZahteva.insertCell(4);
                                        var ukloniBtn = document.createElement("BUTTON");
                                        ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                        ukloniBtn.innerHTML = "&times;";
                                        ukloniBtn.onclick = ukloniZahtevZaOperaciju(klinika, zahtev.id);
                                        ukloni.appendChild(ukloniBtn);
                                    }
                                    table.appendChild(tableRef);
                                    content.appendChild(table);

                                } else if (operacije.length === 0) {
                                    var textnode = document.createTextNode("Ne postoje zahtevi za rezervaciju termina trenutno.");
                                    content.appendChild(textnode);
                                }
                            }
                        });

                    }
                });


            });
            $('#content').fadeIn(500);
        }
    });
}


function generisiZahteveZaGoOds() {
    var ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    $.ajax
    ({
        type: "GET",
        url: 'api/korisnici/getKlinikaAdmina/' + ulogovan.id,
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
        },
        success: function (klinika) {
            $("#content").fadeOut(100, function () {
                $.get({

                    url: 'api/klinike/getAllGoOds/' + klinika.id,
                    contentType: 'application/json',
                    headers: {
                        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                    },
                    success: function (goOds) {

                        var content = document.getElementById("content");
                        content.innerHTML = "";
                        var naslov = document.createElement("HEADER");
                        naslov.innerText = "Godisnji odmori/odsustva";
                        naslov.style.fontSize = "18px";
                        content.appendChild(naslov);
                        content.appendChild(document.createElement("br"));

                        var table = document.createElement('table');
                        table.id = "tabelaGodisnjhOdsustva";
                        table.classList.add("tabela");

                        var header = table.createTHead();
                        var row = header.insertRow(0);
                        var cell = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);

                        cell.innerHTML = "<b>Tip</b>";
                        cell1.innerHTML = "<b>Lekar</b>";
                        cell2.innerHTML = "<b>Pocetni termin</b>";
                        cell3.innerHTML = "<b>Krajnji termin</b>";
                        cell4.innerHTML = "<b>Prihvati</b>";
                        cell5.innerHTML = "<b>Odbij</b>";

                        var tableRef = document.createElement('tbody');
                        var idx = 0;

                        if (goOds.length > 0) {
                            for (let zahtev of goOds) {

                                var podaciZahteva = tableRef.insertRow();

                                var tipZahteva = podaciZahteva.insertCell(0);
                                var korisnikVar = podaciZahteva.insertCell(1);

                                if(zahtev.godisnji === true){
                                    var tipZahtevaText = document.createTextNode("Godisnji odmor");
                                    if(zahtev.medSestraGo != null){
                                        var korisnikText = document.createTextNode(zahtev.medSestraGo.ime + " " + zahtev.medSestraGo.prezime);
                                    } else {
                                        var korisnikText = document.createTextNode(zahtev.lekarGO.ime + " " + zahtev.lekarGO.prezime);
                                    }
                                    tipZahteva.appendChild(tipZahtevaText);
                                    korisnikVar.appendChild(korisnikText);

                                } else if (zahtev.odsustvo === true){
                                    var tipZahtevaText = document.createTextNode("Odsustvo");
                                    if(zahtev.medSestraOds != null){
                                        var korisnikText = document.createTextNode(zahtev.medSestraOds.ime + " " + zahtev.medSestraOds.prezime);
                                    } else {
                                        var korisnikText = document.createTextNode(zahtev.lekarOds.ime + " " + zahtev.lekarOds.prezime);
                                    }
                                    tipZahteva.appendChild(tipZahtevaText);
                                    korisnikVar.appendChild(korisnikText);

                                }

                                var pocetak = podaciZahteva.insertCell(2);
                                var pocetakDatum = document.createTextNode(zahtev.pocetak);
                                pocetak.appendChild(pocetakDatum);

                                var kraj = podaciZahteva.insertCell(3);
                                var krajDatum = document.createTextNode(zahtev.kraj);
                                kraj.appendChild(krajDatum);

                                var prihvati = podaciZahteva.insertCell(4);
                                var prihvatiBtn = document.createElement("BUTTON");
                                prihvatiBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                prihvatiBtn.innerHTML = "&#10003;";
                                prihvati.onclick = prihvatiOdbijGoOds(zahtev, true);
                                prihvati.appendChild(prihvatiBtn);

                                var ukloni = podaciZahteva.insertCell(5);
                                var ukloniBtn = document.createElement("BUTTON");
                                ukloniBtn.classList.add("btn", "btn--radius-2", "btn--light-blue");
                                ukloniBtn.innerHTML = "&times;";
                                ukloniBtn.onclick = prihvatiOdbijGoOds(zahtev, false);
                                ukloni.appendChild(ukloniBtn);
                                idx = idx + 1;

                            }
                            table.appendChild(tableRef);
                            content.appendChild(table);

                        } else if (goOds.length === 0) {
                            var textnode = document.createTextNode("Ne postoje zahtevi za rezervaciju trenutno.");
                            content.appendChild(textnode);
                        }

                    }
                });
            });
            $('#content').fadeIn(500);
        }
    });
}

function prihvatiOdbijGoOds(zahtev, odobren) {
    return function () {

            var modal = document.getElementById("zahtevZaGoOdsModal");
            modal.style.display = "block";

            var span = document.getElementById("closeZahtevZaGoOds");

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

            var content = document.getElementById("zahtevZaGoOdsDiv");
            content.innerHTML = "";
        if(!odobren){

            var naslov = document.createElement("HEADER");
            naslov.innerText = "Razlog odbijanja zahteva";
            naslov.style.fontSize = "18px";
            content.appendChild(naslov);
            content.appendChild(document.createElement("br"));
            var varRazlog = document.createElement("var");
            varRazlog.classList.add("col-2", "input-group");
            var tf = document.createElement('input');
            tf.type = 'text';
            tf.id = 'razlogOdbijanja';
            tf.classList.add("input--style-4");
            tf.style.height = "80px";
            varRazlog.append(tf);
            content.appendChild(varRazlog);
            var btnDa = document.createElement('input');
            btnDa.type = "button";
            btnDa.id = "posaljiBtn";
            btnDa.classList.add("btn", "btn--radius-2", "btn--light-blue");
            btnDa.value = "Posalji";
            content.appendChild(btnDa);
            btnDa.onclick = obradiZahtevGoOds(zahtev, odobren);
        } else {
            var naslov = document.createElement("HEADER");
            naslov.innerText = "Prihvatiti zahtev?";
            naslov.style.fontSize = "18px";
            content.appendChild(naslov);
            content.appendChild(document.createElement("br"));

            var btnDa = document.createElement('input');
            btnDa.type = "button";
            btnDa.id = "posaljiBtn";
            btnDa.classList.add("btn", "btn--radius-2", "btn--light-blue");
            btnDa.value = "Da";
            content.appendChild(btnDa);
            btnDa.onclick = obradiZahtevGoOds(zahtev, odobren);
        }


    }
}

function obradiZahtevGoOds(zahtev, odobren) {

    return function(){

        var razlogOdbijanja = "";
        if(!odobren){
            razlogOdbijanja = $('#razlogOdbijanja').val();
        }

        let id = zahtev.id;
        let pocetak = zahtev.pocetak;
        let kraj = zahtev.kraj;

        $.post({
            url: 'api/adminKlinike/posaljiGoOds',
            data: JSON.stringify({id, pocetak, kraj, odobren, razlogOdbijanja}),
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function () {
                alert("Uspešno obrađen zahtev.");
                document.getElementById("zahtevZaGoOdsModal").style.display = "none";
                generisiZahteveZaGoOds();
            }
        });
    }
}

function ukloniZahtevZaPregled(klinika, zahtevId) {
    return function () {
        $.ajax({
            url:'api/adminKlinike/ukloniZahtevZaPregled/'+klinika.id+'/'+zahtevId,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function() {
                generisiZahteve(klinika);
            }
        });

    }
}

function ukloniZahtevZaOperaciju(klinika, zahtevId) {
    return function () {
        $.ajax({
            url:'api/adminKlinike/ukloniZahtevZaOperaciju/'+klinika.id+'/'+zahtevId,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function() {
                generisiZahteve(klinika);
            }
        });

    }
}