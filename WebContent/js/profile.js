$(document).ready(function(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));    
    
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
    
    var pw1 = document.createElement('div');
    pw1.classList.add("col-2", "input-group")
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
    
    var pw2 = document.createElement('div');
    pw2.classList.add("col-2", "input-group")
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
    
    var pw3 = document.createElement('div');
    pw3.classList.add("col-2", "input-group")
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
    
    var saveBtn = document.createElement('button');
    saveBtn.classList.add("btn2", "btn--blue");
    saveBtn.innerHTML = "Change";
    saveBtn.onclick = function(){
        var password = document.getElementById("newPassword").value;

        $.post({
            url: 'rest/users/changePassword',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: JSON.stringify({password}),
            contentType: 'application/json',
            success: function() {
                alert(password);
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