

function pocetnaPacijent(ulogovan) {
    korisnik = ulogovan;
    var imeKorisnika = korisnik.ime + " " + korisnik.prezime;
    var nazivi = ["Klinike", "Vasa istorija", "Zdravstveni karton", imeKorisnika];

    for(let naziv of nazivi) {
        //pravljenje dugmadi
        var btn = document.createElement("BUTTON");
        btn.classList.add("btn", "btn--radius-2", "btn--light-blue");
        btn.innerHTML = naziv;
        document.getElementById("navbar").appendChild(btn);
        //dodjela specificnih id-jeva dugmadima
        switch (naziv) {
            case "Klinike":
                btn.id = "klinikeBtn"
                break;
            case "Vasa istorija":
                btn.id = "istorijaBtn"
                break;
            case "Zdravstveni karton":
                btn.id = "zdravstveniKartonBtn"
                break;
            case imeKorisnika:
                btn.id = "profilBtn"
                break;

        }
    }
}


function generisiIstoriju() {
    $("#content").fadeOut(100, function(){
        document.getElementById("content").innerHTML = "";
        var textnode = document.createTextNode("Jos uvijek nije dostupna istorija.");
        document.getElementById("content").appendChild(textnode);
    });
    $("#content").fadeIn(500);
}

function generisiZdravstveniKarton(korisnik) {
    $("#content").fadeOut(100, function(){
        document.getElementById("content").innerHTML = "";
        $.get({
            url: 'api/pacijenti/zdravstveniKarton/' + korisnik.id,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (zk) {
                var prviRed = document.createElement("var");
                prviRed.classList.add("row", "wrapper--w680");
                var varVisina = document.createElement("var");
                varVisina.classList.add("col-2", "input-group");
                var visina = document.createTextNode("Visina");
                varVisina.appendChild(visina);
                varVisina.appendChild(document.createElement("br"));
                var txtVisina = document.createElement('input');
                txtVisina.disabled = 'true';
                txtVisina.value = zk.visina + " cm";
                txtVisina.classList.add("input--style-4");
                txtVisina.style.height = "40px";
                txtVisina.style.width = "250px";
                varVisina.appendChild(txtVisina);
                prviRed.appendChild(varVisina);

                var varMasa = document.createElement("var");
                varMasa.classList.add("col-2", "input-group");
                var masa = document.createTextNode("Masa");
                varMasa.appendChild(masa);
                varMasa.appendChild(document.createElement("br"));
                var txtMasa = document.createElement('input');
                txtMasa.disabled = 'true';
                txtMasa.value = zk.masa + " kg";
                txtMasa.classList.add("input--style-4");
                txtMasa.style.height = "40px";
                txtMasa.style.width = "250px";
                varMasa.appendChild(txtMasa);
                prviRed.appendChild(varMasa);

                document.getElementById("content").appendChild(prviRed);

                var lblDijagnoze = document.createElement("H1");
                var t = document.createTextNode("Dijagnoze");
                lblDijagnoze.appendChild(t);
                document.getElementById("content").appendChild(lblDijagnoze);

                for (let d of zk.dijagnoze)
                {
                    var txtDijagnoza = document.createElement('input');
                    txtDijagnoza.disabled = 'true';
                    txtDijagnoza.value = d.naziv;
                    txtDijagnoza.classList.add("input--style-4");
                    txtDijagnoza.style.height = "40px";
                    txtDijagnoza.style.width = "250px";
                    document.getElementById("content").appendChild(txtDijagnoza);
                    document.getElementById("content").appendChild(document.createElement("br"));
                }

                var lblPregledi = document.createElement("H1");
                lblPregledi.appendChild(document.createTextNode("Pregledi"));
                document.getElementById("content").appendChild(lblPregledi);

                var txtP1 = document.createElement('input');
                txtP1.disabled = 'true';
                txtP1.value = "Tip pregleda";
                txtP1.style.height = "40px";
                txtP1.style.width = "200px";
                txtP1.style.textAlign = 'center';
                document.getElementById("content").appendChild(txtP1);
                var txtP2 = document.createElement('input');
                txtP2.disabled = 'true';
                txtP2.value = "Lekar";
                txtP2.style.height = "40px";
                txtP2.style.width = "200px";
                txtP2.style.textAlign = 'center';
                document.getElementById("content").appendChild(txtP2);
                var txtP3 = document.createElement('input');
                txtP3.disabled = 'true';
                txtP3.value = "Datum";
                txtP3.style.height = "40px";
                txtP3.style.width = "200px";
                txtP3.style.textAlign = 'center';
                document.getElementById("content").appendChild(txtP3);
                document.getElementById("content").appendChild(document.createElement("br"));

                for (let p of zk.pregledi)
                {
                    var txtPregled1 = document.createElement('input');
                    txtPregled1.disabled = 'true';
                    txtPregled1.value = p.tipPregleda.naziv;
                    txtPregled1.classList.add("input--style-4");
                    txtPregled1.style.height = "40px";
                    txtPregled1.style.width = "200px";
                    document.getElementById("content").appendChild(txtPregled1);
                    var txtPregled2 = document.createElement('input');
                    txtPregled2.disabled = 'true';
                    txtPregled2.value = p.lekar.ime + " " + p.lekar.prezime;
                    txtPregled2.classList.add("input--style-4");
                    txtPregled2.style.height = "40px";
                    txtPregled2.style.width = "200px";
                    document.getElementById("content").appendChild(txtPregled2);
                    var txtPregled3 = document.createElement('input');
                    txtPregled3.disabled = 'true';
                    txtPregled3.value = p.termin.pocetak.substr(0, 10);;
                    txtPregled3.classList.add("input--style-4");
                    txtPregled3.style.height = "40px";
                    txtPregled3.style.width = "200px";
                    document.getElementById("content").appendChild(txtPregled3);
                    document.getElementById("content").appendChild(document.createElement("br"));
                }
            }
        });
    });
    $("#content").fadeIn(500);
}

function generisiKlinike() {

   $.get({
        url:'api/klinike/getAll',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
        },
        success: function(klinike)
        {
            prikazKlinika(klinike);
        }
    });
}

function prikazKlinika(klinike)
{
    $("#content").fadeOut(100, function(){
        document.getElementById("content").innerHTML = "";
        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var varTip = document.createElement("var");
        varTip.classList.add("col-2", "input-group");
        var tip = document.createTextNode("Tip pregleda*");
        varTip.appendChild(tip);
        varTip.appendChild(document.createElement("br"));
        var txtTip = document.createElement('select');
        txtTip.id = 'tipPregleda';

        $.get({
            url:'api/tipovipregleda/getDistinct',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function(tipovi)
            {
                for(let tip of tipovi)
                {
                    var option = document.createElement('option');
                    option.value=tip;
                    option.innerHTML=tip;
                    txtTip.appendChild(option);
                }
            }
        });
        txtTip.classList.add("input--style-4");
        txtTip.style.height = "40px";
        txtTip.style.width = "250px";
        varTip.appendChild(txtTip);
        prviRed.appendChild(varTip);

        var varDan = document.createElement("var");
        varDan.classList.add("col-2", "input-group");
        var dan = document.createTextNode("Dan*");
        varDan.appendChild(dan);
        varDan.appendChild(document.createElement("br"));
        var txtDan = document.createElement('input');
        txtDan.setAttribute("type", "date");
        txtDan.id = 'datum';

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        txtDan.min = today;
        txtDan.value = today;

        txtDan.style.height = "40px";
        txtDan.style.width = "250px";
        txtDan.style.textAlign = 'center';
        varDan.appendChild(txtDan);
        prviRed.appendChild(varDan);

        var varLokacija = document.createElement("var");
        varLokacija.classList.add("col-2", "input-group");
        var lokacija = document.createTextNode("Lokacija");
        varLokacija.appendChild(lokacija);
        varLokacija.appendChild(document.createElement("br"));
        var txtLokacija = document.createElement('input');
        txtLokacija.id = 'lokacija';
        txtLokacija.setAttribute("type", "text");
        txtLokacija.style.height = "40px";
        txtLokacija.style.width = "250px";
        txtLokacija.classList.add("input--style-4");
        varLokacija.appendChild(txtLokacija);
        prviRed.appendChild(varLokacija);

        var varOcjena = document.createElement("var");
        varOcjena.classList.add("col-2", "input-group");
        var ocjena = document.createTextNode("Minimalna ocena");
        varOcjena.appendChild(ocjena);
        varOcjena.appendChild(document.createElement("br"));
        var txtOcjena = document.createElement('select');
        txtOcjena.id = 'ocjena';

        var ocjene = [ 1, 2, 3, 4, 5];

        for(let o of ocjene)
        {
            var op = document.createElement('option');
            op.value=o;
            op.innerHTML=o;
            txtOcjena.appendChild(op);
        }

        txtOcjena.style.height = "40px";
        txtOcjena.style.width = "250px";
        txtOcjena.classList.add("input--style-4");
        varOcjena.appendChild(txtOcjena);
        prviRed.appendChild(varOcjena);

        document.getElementById("content").appendChild(prviRed);

        var submit = document.createElement("BUTTON");
        submit.classList.add("btn", "btn--radius-2", "btn--light-blue");
        submit.innerHTML = "Pretrazi";
        submit.id = "pretrazi";
        submit.onclick = filtrirajKlinike();
        document.getElementById("content").appendChild(submit);

        for(let klinika of klinike)
        {
            var btn = document.createElement("BUTTON");
            btn.classList.add("btn-list", "btn--radius-2", "btn--light-blue");
            btn.innerHTML = klinika.naziv;
            btn.id = klinika.naziv;
            btn.onclick = infoKlinike(klinika);
            document.getElementById("content").appendChild(btn);
        }
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
        nazivKlinike.appendChild(document.createTextNode(klinika.naziv));

        var lokacijaKlinike  = podaciKlinike.insertCell(1);
        lokacijaKlinike.appendChild(document.createTextNode(klinika.lokacija));

        var brLekara  = podaciKlinike.insertCell(2);
        brLekara.appendChild(document.createTextNode(klinika.opis));

        var brSala  = podaciKlinike.insertCell(3);
        brSala.appendChild(document.createTextNode(klinika.prosecnaOcena));

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

function filtrirajKlinike() {
    return function(){
        tip = $('#tipPregleda').val();
        datum = $('#datum').val();

        if (datum === ""){
            alert("Unesite datum pregleda!");
            return;
        }

        lokacija = $('#lokacija').val();
        ocjena = $('#ocjena').val();

        if (lokacija === ""){
            lokacija = "NULL";
        }

        $.get({
            url: 'api/klinike/getKlinike/' + tip + '/' + datum + '/' + lokacija + '/' + ocjena,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
            },
            success: function (klinike) {
                prikazKlinika(klinike);
            }
        });
    }
}