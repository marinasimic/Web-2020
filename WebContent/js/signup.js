$(document).ready(function(){

    $("#firstName").keyup(firstNameValidate);
    $("#lastName").keyup(lastNameValidate);
    $("#username").keyup(usernameValidate);
    $("#password").keyup(passwordValidate);
    $("#passwordConfirm").keyup(passwordConfirmValidate);

    $('#signUp').submit(function(event){
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var gender = $('#gender').val();
        
        firstNameValidate();
        lastNameValidate();
        usernameValidate();
        passwordValidate();
        passwordConfirmValidate();
        
        if (firstName === "" || lastName ==="" || username === "" || password === "" || passwordConfirm === "" ) {
            return
        }

        if (password != passwordConfirm) {
            return
        }

        if (password.length < 5){
            return
        }

        $.post({
            url: 'rest/users/signup',
            data: JSON.stringify({username, password, firstName, lastName, gender}),
            contentType: 'application/json',
            success: function() {
                window.location='guestMainPage.html';
            },
            error: function() {
        	document.getElementById("usernameCheck").innerHTML = "This username already exists!"
        	document.getElementById("usernameCheck").style.visibility = "visible";
            }
        });
    });
});

function firstNameValidate() {
    if ($("#firstName").val() === ""){
	document.getElementById("firstNameCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("firstNameCheck").style.visibility = "hidden";
    }
}

function lastNameValidate() {
    if ($("#lastName").val() === ""){
	document.getElementById("lastNameCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("lastNameCheck").style.visibility = "hidden";
    }
}

function usernameValidate() {
    if ($("#username").val() === ""){
	document.getElementById("usernameCheck").innerHTML = "This field is mandatory!"
	document.getElementById("usernameCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("usernameCheck").style.visibility = "hidden";
    }
}

function passwordValidate() {
    if ($("#password").val() === ""){
	document.getElementById("passwordCheck").innerHTML = "This field is mandatory!";
	document.getElementById("passwordCheck").style.visibility = "visible";
	return;
    }
    else {
	document.getElementById("passwordCheck").style.visibility = "hidden";
    }
    
    if ($("#password").val().length < 5){
	document.getElementById("passwordCheck").innerHTML = "Password has to be at least 5 characters long!";
	document.getElementById("passwordCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("passwordCheck").style.visibility = "hidden";
    }
}

function passwordConfirmValidate() {
    if ($("#passwordConfirm").val() === ""){
	document.getElementById("passwordConfirmCheck").innerHTML = "This field is mandatory!";
	document.getElementById("passwordConfirmCheck").style.visibility = "visible";
	return;
    }
    else {
	document.getElementById("passwordConfirmCheck").style.visibility = "hidden";
    }
    
    if ($("#password").val() != $("#passwordConfirm").val()){
	document.getElementById("passwordConfirmCheck").innerHTML = "Passwords are not the same!";
	document.getElementById("passwordConfirmCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("passwordConfirmCheck").style.visibility = "hidden";
    }
}