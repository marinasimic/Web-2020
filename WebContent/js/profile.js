$(document).ready(function(){
    var currentUser = JSON.parse(localStorage.getItem('user'));  
    
    document.getElementById("firstNameEdit").value = currentUser.firstName;
    document.getElementById("lastNameEdit").value = currentUser.lastName;
    document.getElementById("usernameEdit").value = currentUser.username;
    
    if (currentUser.gender == "MALE") {
	document.getElementById("genderEdit").value = 0;
    }
    else if (currentUser.gender == "FEMALE") {
	document.getElementById("genderEdit").value = 1;
    }
    else {
	document.getElementById("genderEdit").value = 2;
    }
    
    $("#firstNameEdit").keyup(validation);
    $("#lastNameEdit").keyup(validation);

    $('#changePassword').submit(changePass);
    $('body').on('click', '#save', function(e) {
        saveChanges(e);
    });
    $('body').on('click', '#logout', logout);
});

function validation() {
    if ($("#firstNameEdit").val() === ""){
	document.getElementById("firstNameCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("firstNameCheck").style.visibility = "hidden";
    }
    
    if ($("#lastNameEdit").val() === ""){
	document.getElementById("lastNameCheck").style.visibility = "visible";
    }
    else {
	document.getElementById("lastNameCheck").style.visibility = "hidden";
    }
}

function changePass(){
    var p = document.getElementById("content");
    p.innerHTML = "";
    
    // Old password label and input field
    var pw1 = document.createElement('div');
    pw1.classList.add("col-2", "input-group-top");
    var oldPassword = document.createElement('label');
    oldPassword.innerHTML = "Old password";
    oldPassword.classList.add("label");
    pw1.appendChild(oldPassword);
    var txtOldPassword = document.createElement('input');
    txtOldPassword.type = 'password';
    txtOldPassword.id = "oldPassword";
    txtOldPassword.classList.add("input--style-6");
    txtOldPassword.style.height = "40px";
    txtOldPassword.style.width = "250px";
    pw1.appendChild(txtOldPassword);
    p.appendChild(pw1);
    
    // Old password check
    var pwCheck1 = document.createElement('div');
    pwCheck1.classList.add("col-2", "input-group");
    var oldPasswordCheck = document.createElement('label');
    oldPasswordCheck.style.color = "red";
    oldPasswordCheck.style.visibility = "hidden";
    oldPasswordCheck.id = "oldPasswordCheck";
    pwCheck1.appendChild(oldPasswordCheck);
    p.appendChild(pwCheck1);
    
    // New password label and input field
    var pw2 = document.createElement('div');
    pw2.classList.add("col-2", "input-group-top")
    var newPassword = document.createElement('label');
    newPassword.innerHTML = "New password";
    newPassword.classList.add("label");
    pw2.appendChild(newPassword);
    var txtNewPassword = document.createElement('input');
    txtNewPassword.type = 'password';
    txtNewPassword.id = "newPassword";
    txtNewPassword.classList.add("input--style-6");
    txtNewPassword.style.height = "40px";
    txtNewPassword.style.width = "250px";
    pw2.appendChild(txtNewPassword);
    p.appendChild(pw2);
    
    // New password check
    var pwCheck2 = document.createElement('div');
    pwCheck2.classList.add("col-2", "input-group");
    var newPasswordCheck = document.createElement('label');
    newPasswordCheck.style.color = "red";
    newPasswordCheck.style.visibility = "hidden";
    newPasswordCheck.id = "newPasswordCheck";
    pwCheck2.appendChild(newPasswordCheck);
    p.appendChild(pwCheck2);
    
    // Confirm password label and input field
    var pw3 = document.createElement('div');
    pw3.classList.add("col-2", "input-group-top")
    var confirmNewPassword = document.createElement('label');
    confirmNewPassword.innerHTML = "Confirm password";
    confirmNewPassword.classList.add('label');
    pw3.appendChild(confirmNewPassword);
    var txtConfirmNewPassword = document.createElement('input');
    txtConfirmNewPassword.type = 'password';
    txtConfirmNewPassword.id = "confirmNewPassword";
    txtConfirmNewPassword.classList.add("input--style-6");
    txtConfirmNewPassword.style.height = "40px";
    txtConfirmNewPassword.style.width = "250px";
    pw3.appendChild(txtConfirmNewPassword);
    p.appendChild(pw3);
    
    // Confirm password check
    var pwCheck3 = document.createElement('div');
    pwCheck3.classList.add("col-2", "input-group");
    var confirmNewPasswordCheck = document.createElement('label');
    confirmNewPasswordCheck.style.color = "red";
    confirmNewPasswordCheck.style.visibility = "hidden";
    confirmNewPasswordCheck.id = "confirmNewPasswordCheck";
    pwCheck3.appendChild(confirmNewPasswordCheck);
    p.appendChild(pwCheck3);
    
    var saveBtn = document.createElement('button');
    saveBtn.classList.add("btn", "btn--blue");
    saveBtn.innerHTML = "Change";
    saveBtn.onclick = function(){
	if (!changePasswordFieldsValidation()) {
	    return;
	}
	
        var password = $("#newPassword").val();

        $.post({
            url: 'rest/users/changePassword',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: JSON.stringify({password}),
            contentType: 'application/json',
            success: function() {
                window.location='guestProfile.html'
            },
            error: function() {
                alert("Password change failed!")
            }
        });
    }
    p.append(saveBtn);
}

function logout(){
    $.post({
        url: 'rest/users/logout',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        contentType: 'application/json',
        success: function() {
            window.location='login.html'
        }
    });
}

function changePasswordFieldsValidation() {
    var currentUser = JSON.parse(localStorage.getItem('user'));
	
	if ($("#oldPassword").val() === "") {
	    document.getElementById("oldPasswordCheck").innerHTML = "This field is mandatory!";
	    document.getElementById("oldPasswordCheck").style.visibility = "visible";
	    return false;
	} 
	else {
	    document.getElementById("oldPasswordCheck").style.visibility = "hidden";
	}
	
	if ($("#oldPassword").val() !== currentUser.password) {
	    document.getElementById("oldPasswordCheck").innerHTML = "Wrong password!";
	    document.getElementById("oldPasswordCheck").style.visibility = "visible";
	    return false;
	} 
	else {
	    document.getElementById("oldPasswordCheck").style.visibility = "hidden";
	}
	
	if ($("#newPassword").val() === "") {
	    document.getElementById("newPasswordCheck").innerHTML = "This field is mandatory!";
	    document.getElementById("newPasswordCheck").style.visibility = "visible";
	    return false;
	} 
	else {
	    document.getElementById("newPasswordCheck").style.visibility = "hidden";
	}
	
	if ($("#confirmNewPassword").val() === "") {
	    document.getElementById("confirmNewPasswordCheck").innerHTML = "This field is mandatory!";
	    document.getElementById("confirmNewPasswordCheck").style.visibility = "visible";
	    return false;
	} 
	else {
	    document.getElementById("confirmNewPasswordCheck").style.visibility = "hidden";
	}
	
	
	if ($("#newPassword").val() !== $("#confirmNewPassword").val()) {
	    document.getElementById("confirmNewPasswordCheck").innerHTML = "Passwords are not the same!";
	    document.getElementById("confirmNewPasswordCheck").style.visibility = "visible";
	    return false;
	} 
	else {
	    document.getElementById("confirmNewPasswordCheck").style.visibility = "hidden";
	}
	
	if ($("#newPassword").val().length < 5) {
	    document.getElementById("newPasswordCheck").innerHTML = "Password has to be at least 5 characters long!";
	    document.getElementById("newPasswordCheck").style.visibility = "visible";
	    return false;
	} 
	else {
	    document.getElementById("newPasswordCheck").style.visibility = "hidden";
	}
	
	return true;
}


function saveChanges(e) {
    e.preventDefault();
    var firstName = $("#firstNameEdit").val();
    var lastName = $("#lastNameEdit").val();
    var gender = $("#genderEdit").val();
    
    $.post({
        url: 'rest/users/editProfile',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        data: JSON.stringify({firstName, lastName, gender}),
        contentType: 'application/json',
        success: function() {
            var currentUser = JSON.parse(localStorage.getItem('user'));
            
            currentUser.firstName = firstName;
            currentUser.lastName = lastName;
            
            if (gender == 0) {
        	currentUser.gender = "MALE";
            }
            else if (gender == 1) {
        	currentUser.gender = "FEMALE";
            }
            else {
        	currentUser.gender = "UNKNOWN";
            }
            
            localStorage.setItem('user', JSON.stringify(currentUser));
            window.location = 'guestProfile.html';
        },
        error: function(){
            alert("Profile wasn't updated!")
        }
    });
}