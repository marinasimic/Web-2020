$(document).ready(function(){

    $("#password").keyup(checkPasswordMatch);

    $('#signUp').submit(function(event){
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var gender = $('#gender').val();
        
        if (firstName === "" ) {
            alert("All fields must be filled!")
            return
        }
        
        if (firstName.length < 3) {
            alert("First name has to be at least 3 characters long!")
            return
        }
        
        if (lastName.length < 3) {
            alert("Last name has to be at least 3 characters long!")
            return

        }

        if (password != passwordConfirm) {
            $('#passwordConfirm').addClass("error-class")
            return
        }

        if (password.length < 5){
            alert("Password has to be at least 5 characters long!")
            return
        }

        if (username.length < 5) {
            alert("Username has to be at least 5 characters long!")
            return
        }

        $.post({
            url: 'rest/users/signup',
            data: JSON.stringify({username, password, firstName, lastName, gender}),
            contentType: 'application/json',
            success: function() {
                window.location='login.html';
            },
            error: function() {
                alert("Username already exists!")
            }
        });
    });
});

function checkPasswordMatch() {
    var password = $("#password").val();

    if(password.length < 5)
        $("#divCheckPasswordLength").html("Password has to be at least 5 characters long!");
    else
        $("#divCheckPasswordLength").html("");
}