$(document).ready(function(){
    $('#formaZaPrijavu').submit(function(event){
        event.preventDefault();

        var username=$('#username').val();
        var password=$('#password').val();

        if(username === "" || password === ""){
            alert("Nijedno polje ne sme ostati prazno!")
            return
        }

        $.post({
            url: 'api/korisnici/login',
            data: JSON.stringify({username, password}),
            contentType: 'application/json',
            success: function(data) {
                localStorage.setItem('jwt', JSON.stringify(data.accessToken))
                window.location='pocetna.html'
            },
            error: function() {
                alert("Neuspešna prijava.")
            }
        });

    });
});