$(document).ready(function(){
        $.get({
            url: 'api/pacijenti/'+korisnickoIme+'/'+lozinka,
            contentType: 'application/json',
            success: function() {
                alert('Prijavili ste se!');
                window.location='pocetna.html';
            },
            error: function() {
                alert("Neuspešna prijava.")
            }
        });
});