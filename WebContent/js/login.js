$(document).ready(function () {
    $('#loginform').submit(function (event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        if (username === "") {
            alert("You have to enter your username!")
            return
        }
        if (password === "") {
            alert("You have to enter your password!")
            return
        }

        $.post({
            url: 'rest/users/login',
            data: JSON.stringify({ username, password }),
            contentType: 'application/json',
            success: function (data) {
                localStorage.setItem('jwt', JSON.stringify(data.accessToken));
                showMainPage();
            },
            error: function () {
                alert("Login failed.")
            }
        });
    });
});

function showMainPage() {
    $.get({

        url: 'rest/users/currentUser',
        contentType: 'application/json',
        success: function (user) {
            if (user.role == "HOST") {
                window.location = 'hostMainPage.html'
            }
            else {
                window.location = 'guestMainPage.html'
            }
        }
    });
}

function showProfile() {
    $.get({
        url: 'rest/users/currentUser',
        contentType: 'application/json',
        success: function (user) {
            if (user.role == "HOST") {
                window.location = 'hostProfile.html'
            }
            else {
                window.location = 'guestProfile.html'
            }
        }
    });
}