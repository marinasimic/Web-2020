
function infoKorisnik(korisnik)
{
    return function(){
        // Get the modal
        var modal = document.getElementById("requestModal");
        var p = document.getElementById("requestUsername");
        p.innerHTML = "";
        p.append("Ime: " + korisnik.ime);
        p.append(document.createElement("br"));
        p.append("Prezime: " + korisnik.prezime);
        p.append(document.createElement("br"));
        p.append("Korisničko ime: " + korisnik.username);
        p.append(document.createElement("br"));
        p.append("E-mail: " + korisnik.email);
        p.append(document.createElement("br"));
        p.append("Razlog: ");
        p.append(document.createElement("br"));
        var textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.id = "rejectionReason";
        textbox.style.border="1px solid black";
        textbox.style.height = "40px"
        p.append(textbox);
        p.append(document.createElement("br"));
        p.append(document.createElement("br"));
        var btnPrihvati = document.createElement("BUTTON");
        btnPrihvati.classList.add("btn2", "btn--green");
        btnPrihvati.innerHTML = "Prihvati";
        btnPrihvati.onclick = function(){
            $.post({
                url: 'api/pacijenti/confirmRequest',
                data: korisnik.username,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert('Zahtjev za registraciju prihvacen!');
                    generisiZahteveZaRegistraciju();
                },
                error: function() {
                    alert("Prihvatanje zahtjeva za registraciju nije uspjelo!")
                }
            });
            modal.style.display = "none";
        }
        p.append(btnPrihvati);

        var btnOdbij = document.createElement("BUTTON");
        btnOdbij.classList.add("btn2", "btn--red");
        btnOdbij.innerHTML = "Odbij";
        btnOdbij.onclick = function(){
            if (document.getElementById("rejectionReason").value == "" ){
                alert("Morate unijeti razlog odbijanja");
                return;
            }
            $.post({
                url: 'api/pacijenti/rejectRequest',
                data: korisnik.username,
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert('Zahtjev za registraciju odbijen!');
                    generisiZahteveZaRegistraciju();
                },
                error: function() {
                    alert("Odbijanje zahtjeva za registraciju nije uspjelo!")
                }
            });
            modal.style.display = "none";
        }
        p.append(btnOdbij);
        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[1];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}


function generisiFormuZaNovogAdmina() {
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

            if(korisnickoIme === "" || lozinka === "" || lozinka_potvrda === "" || ime === "" || prezime === "" || email === ""){
                alert("Nijedno polje ne sme ostati prazno!")
                return
            }

            if( lozinka!=lozinka_potvrda){
                alert("Lozinke se ne poklapaju!")
                return
            }

            if(lozinka.length < 5){
                alert("Lozinka mora imati više od pet karaktera!")
                return
            }

            if(ime.length < 3){
                alert("Ime mora imati bar tri karaktera!")
                return
            }

            if(korisnickoIme.length < 5){
                alert("Korisnicko ime mora imati bar pet karaktera!")
                return
            }

            if(prezime.length < 3){
                alert("Prezime mora imati bar tri karaktera!")
                return

            }

            $.post({
                url: 'api/adminKC/signup',
                data: JSON.stringify({korisnickoIme, lozinka, ime, prezime, email}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Novi administrator uspjesno dodat.")
                },
                error: function() {
                    alert("Novi administrator nije dodat.")
                }
            });
        }
        content.appendChild(btnAdd);
    });
    $("#content").fadeIn(500);
}

function generisiZahteveZaRegistraciju() {
    document.getElementById("content").innerHTML = "";

    $.get({

        url:'api/pacijenti/getRequests',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
        },
        success: function(korisnici)
        {
            if( korisnici.length == 0)
            {
                document.getElementById("content").innerHTML = "";
                var textnode = document.createTextNode("Trenutno nema aktivnih zahtjeva za registraciju!");
                document.getElementById("content").appendChild(textnode);
            }
            else
            {
                for(let korisnik of korisnici)
                {
                    var btn = document.createElement("BUTTON");
                    btn.classList.add("btn-list", "btn--radius-2", "btn--light-blue");
                    btn.innerHTML = korisnik.ime + " " + korisnik.prezime;
                    btn.id = korisnik.username;
                    btn.onclick = infoKorisnik(korisnik);
                    document.getElementById("content").appendChild(btn);
                }
            }
        }

    });
}

function pocetnaAdminKlinickogCentra(korisnik) {
    //korisnik = ulogovan;
    var imeKorisnika = korisnik.ime + " " + korisnik.prezime;
    var nazivi = ["Zahtevi za registraciju", "Registruj klinike", "Sifarnik", "Dodaj administratora", imeKorisnika];

    for(let naziv of nazivi) {
        //pravljenje dugmadi
        var btn = document.createElement("BUTTON");
        btn.classList.add("btn", "btn--radius-2", "btn--light-blue");
        btn.innerHTML = naziv;
        document.getElementById("navbar").appendChild(btn);
        //dodjela specificnih id-jeva dugmadima
        switch (naziv) {
            case "Zahtevi za registraciju":
                btn.id = "zahtevZaRegistracijuBtn"
                break;
            case "Registruj klinike":
                btn.id = "registracijaKlinikaBtn"
                break;
            case "Sifarnik":
                btn.id = "sifarnikBtn"
                break;
            case imeKorisnika:
                btn.id = "profilBtn"
                break;
            case "Dodaj administratora":
                btn.id = "dodajAdministratoraBtn"
                break;
        }
    }
}

function generisiFormuZaNovuKliniku() {
    $("#content").fadeOut(100, function(){
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
        varNaziv.appendChild(txtNaziv);
        prviRed.appendChild(varNaziv);
        content.appendChild(prviRed);

        var drugiRed = document.createElement("var");
        drugiRed.classList.add("row", "wrapper--w680")
        var varLokacija = document.createElement("var");
        varLokacija.classList.add("col-2", "input-group");
        var lokacija = document.createTextNode("Lokacija");
        varLokacija.appendChild(lokacija);
        varLokacija.appendChild(document.createElement("br"));
        var txtLokacija = document.createElement('input');
        txtLokacija.type = 'text';
        txtLokacija.id = "lokacija";
        txtLokacija.classList.add("input--style-4");
        txtLokacija.style.height = "40px";
        txtLokacija.style.width = "250px";
        varLokacija.appendChild(txtLokacija);
        drugiRed.appendChild(varLokacija);
        content.appendChild(drugiRed);

        var treciRed = document.createElement("var");
        treciRed.classList.add("row", "wrapper--w680")
        var varOpis = document.createElement("var");
        varOpis.classList.add("col-2", "input-group");
        var opis = document.createTextNode("Opis");
        varOpis.appendChild(opis);
        varOpis.appendChild(document.createElement("br"));
        var txtOpis = document.createElement('input');
        txtOpis.type = 'text';
        txtOpis.id = "opis";
        txtOpis.classList.add("input--style-4");
        txtOpis.style.height = "80px";
        txtOpis.style.width = "250px";
        varOpis.appendChild(txtOpis);
        treciRed.appendChild(varOpis);
        content.appendChild(treciRed);

        var btnAdd = document.createElement("BUTTON");
        btnAdd.classList.add("btn2", "btn--light-blue");
        btnAdd.innerHTML = "Dodaj kliniku";
        btnAdd.onclick = function () {
            var naziv=$('#naziv').val();
            var lokacija=$('#lokacija').val();
            var opis=$('#opis').val();

            if(naziv === ""){
                alert("Morate uneti naziv klinike!");
                return;
            } else if (naziv.length < 5) {
                alert("Naziv klinike mora imati bar pet karaktera!");
                return;
            }

            if(lokacija === ""){
                alert("Morate uneti lokaciju klinike!");
                return;
            } else if(lokacija.length < 2){
                alert("Lokacija klinike mora imati bar dva karaktera!");
                return;
            }

            $.post({
                url: 'api/klinike/dodajKliniku',
                data: JSON.stringify({naziv, lokacija, opis}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Nova klinika je uspešno dodata!");

                },
                error: function() {
                    alert("Greška prilikom dodavanja klinike!");
                }
            });
        }
        content.appendChild(btnAdd);


    });
    $("#content").fadeIn(500);
}

function generisiFormuZaSifanik() {
    $("#content").fadeOut(100, function(){
        var content = document.getElementById("content");
        content.innerHTML = "";

        var textnode = document.createTextNode("- - - Dodaj lek - - -");
        document.getElementById("content").appendChild(textnode);

        var prviRed = document.createElement("var");
        prviRed.classList.add("row", "wrapper--w680");
        var varSifraLeka = document.createElement("var");
        varSifraLeka.classList.add("col-2", "input-group");
        var sifraLeka = document.createTextNode("Sifra leka");
        varSifraLeka.appendChild(sifraLeka);
        varSifraLeka.appendChild(document.createElement("br"));
        var txtSifraLeka = document.createElement('input');
        txtSifraLeka.type = 'text';
        txtSifraLeka.id = "sifraLeka";
        txtSifraLeka.classList.add("input--style-4");
        txtSifraLeka.style.height = "40px";
        txtSifraLeka.style.width = "250px";
        varSifraLeka.appendChild(txtSifraLeka);
        prviRed.appendChild(varSifraLeka);

        var varNazivLeka = document.createElement("var");
        varNazivLeka.classList.add("col-2", "input-group");
        var nazivLeka = document.createTextNode("Naziv leka");
        varNazivLeka.appendChild(nazivLeka);
        varNazivLeka.appendChild(document.createElement("br"));
        var txtNazivLeka = document.createElement('input');
        txtNazivLeka.type = 'text';
        txtNazivLeka.id = "nazivLeka";
        txtNazivLeka.classList.add("input--style-4");
        txtNazivLeka.style.height = "40px";
        txtNazivLeka.style.width = "250px";
        varNazivLeka.appendChild(txtNazivLeka);
        prviRed.appendChild(varNazivLeka);

        content.appendChild(prviRed);

        var btnDodajLek = document.createElement("BUTTON");
        btnDodajLek.classList.add("btn2", "btn--light-blue");
        btnDodajLek.innerHTML = "Dodaj lek";
        btnDodajLek.onclick = function(){
            var sifraLeka=$('#sifraLeka').val();
            var nazivLeka=$('#nazivLeka').val();

            if(sifraLeka === "" && nazivLeka === ""){
                alert("Da biste uneli lek sifra i naziv leka ne smeju biti prazni!");
                return;
            }

            if(sifraLeka === ""){
                alert("Morate uneti sifru leka!");
                return;
            } else if (sifraLeka.length < 3){
                alert("Sifra leka mora imati bar tri karaktera!");
                return;
            }

            if(nazivLeka === ""){
                alert("Morate uneti naziv leka!");
                return;
            } else if (nazivLeka.length < 5) {
                alert("Naziv leka mora imati bar pet karaktera");
                return;
            }

            $.post({
                url: 'api/lekovi/dodajLek',
                data: JSON.stringify({sifraLeka, nazivLeka}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Novi lek je uspesno dodat!");
                    return;
                },
                error: function() {
                    alert("Greska prilikom dodavanja leka! Pokusajte ponovo.");
                    return;
                }
            });


        }

        content.appendChild(btnDodajLek);


        var drugiRed = document.createElement("var");
        drugiRed.classList.add("row", "wrapper--w680");
        var textnode = document.createTextNode("- - - Dodaj dijagnozu - - -");
        drugiRed.appendChild(textnode);
        content.appendChild(drugiRed);

        var treciRed = document.createElement("var");
        treciRed.classList.add("row", "wrapper--w680");

        var varSifraDijagnoze = document.createElement("var");
        varSifraDijagnoze.classList.add("col-2", "input-group");
        var sifraDijagnoze = document.createTextNode("Sifra dijagnoze");
        varSifraDijagnoze.appendChild(sifraDijagnoze);
        varSifraDijagnoze.appendChild(document.createElement("br"));
        var txtSifraDijagnoze = document.createElement('input');
        txtSifraDijagnoze.type = 'text';
        txtSifraDijagnoze.id = "sifraDijagnoze";
        txtSifraDijagnoze.classList.add("input--style-4");
        txtSifraDijagnoze.style.height = "40px";
        txtSifraDijagnoze.style.width = "250px";
        varSifraDijagnoze.appendChild(txtSifraDijagnoze);
        treciRed.appendChild(varSifraDijagnoze);

        var varNazivDijagnoze = document.createElement("var");
        varNazivDijagnoze.classList.add("col-2", "input-group");
        var nazivDijagnoze = document.createTextNode("Naziv dijagnoze");
        varNazivDijagnoze.appendChild(nazivDijagnoze);
        varNazivDijagnoze.appendChild(document.createElement("br"));
        var txtNazivDijagnoze = document.createElement('input');
        txtNazivDijagnoze.type = 'text';
        txtNazivDijagnoze.id = "nazivDijagnoze";
        txtNazivDijagnoze.classList.add("input--style-4");
        txtNazivDijagnoze.style.height = "40px";
        txtNazivDijagnoze.style.width = "250px";
        varNazivDijagnoze.appendChild(txtNazivDijagnoze);
        treciRed.appendChild(varNazivDijagnoze);

        content.appendChild(treciRed);

        var btnDodajLek = document.createElement("BUTTON");
        btnDodajLek.classList.add("btn2", "btn--light-blue");
        btnDodajLek.innerHTML = "Dodaj dijagnozu";
        btnDodajLek.onclick = function() {
            var sifraDijagnoze=$('#sifraDijagnoze').val();
            var nazivDijagnoze=$('#nazivDijagnoze').val();

            if(sifraDijagnoze === "" && nazivDijagnoze === ""){
                alert("Da biste uneli dijagnozu sifra i njen naziv ne smeju ostati prazni!");
                return;
            }

            if(sifraDijagnoze === ""){
                alert("Morate uneti sifru dijagnoze!");
                return;
            } else if (sifraDijagnoze.length < 2){
                alert("Sifra dijagnoze mora imati bar dva karaktera!");
                return;
            }

            if(nazivDijagnoze === ""){
                alert("Morate uneti naziv dijagnoze!");
                return;
            } else if (nazivDijagnoze.length < 3){
                alert("Naziv dijagnoze mora imati barem tri karaktera!");
                return;
            }

            $.post({
                url: 'api/dijagnoze/dodajDijagnozu',
                data: JSON.stringify({sifraDijagnoze, nazivDijagnoze}),
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt'))
                },
                success: function() {
                    alert("Nova dijagnoza je uspesno dodata.");
                    return;
                },
                error: function() {
                    alert("Greska prilikom dodavanja dijagnoze! Pokusajte ponovo.");
                    return;
                }

            });
        }

        content.appendChild(btnDodajLek);


    });
    $("#content").fadeIn(500);

}
