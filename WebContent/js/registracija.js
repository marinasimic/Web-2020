$(document).ready(function(){

    $("#password, #password_confirm").keyup(checkPasswordMatch);

    $('#formaZaRegistraciju').submit(function(event){
        event.preventDefault();

        var korisnickoIme=$('#username').val();
        var lozinka=$('#password').val();
        var lozinka_potvrda=$('#password_confirm').val();
        var ime=$('#first_name').val();
        var prezime=$('#last_name').val();
        var email=$('#email').val();
        var datumRodjenja=$('#birthday').val();
        var jbo=$('#jbo').val();

        if(korisnickoIme === "" || jbo === "" || lozinka === "" || ime === "" || prezime === "" || email === "" || datumRodjenja === ""){
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
            url: 'api/pacijenti/signup',
            data: JSON.stringify({korisnickoIme, lozinka, ime, prezime, email, datumRodjenja, jbo}),
            contentType: 'application/json',
            success: function() {
                window.location='afterReg.html';
            },
            error: function() {
                alert("Neuspešna registracija.")
            }
        });
    });

    //ZA DATEPICKER
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click',function(){
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();

            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });


    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }
});

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#password_confirm").val();

    if (password != confirmPassword)
        $('#password_confirm').addClass("error-class");

    else
        $('#password_confirm').removeClass("error-class");

    if(password.length < 5)
        $("#divCheckPasswordLength").html("Šifra mora imati više od 5 karaktera!");
    else
        $("#divCheckPasswordLength").html("");

}


