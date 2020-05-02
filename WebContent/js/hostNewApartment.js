$(document).ready(function () {
    var currentUser = JSON.parse(localStorage.getItem('user'));

    $("#guestNo").keyup(guestNoValidate);
    $("#roomNo").keyup(roomNoValidate);
    $("#street").keyup(streetValidate);
    $("#streetNo").keyup(streetNoValidate);
    $("#place").keyup(placeValidate);
    $("#postalCode").keyup(postalCodeValidate);
    $("#latitude").keyup(latitudeValidate);
    $("#longitude").keyup(longitudeValidate);

    $('#saveApartment').submit(function (event) {
        event.preventDefault();

        guestNoValidate();
        roomNoValidate();
        streetValidate();
        streetNoValidate();
        placeValidate();
        postalCodeValidate();
        latitudeValidate();
        longitudeValidate();

        if (!guestNoValidate() || !roomNoValidate() || !streetValidate()
            || !streetNoValidate() || !placeValidate() || !postalCodeValidate()
            || !latitudeValidate() || !longitudeValidate()) {
            return;
        }

        var apartmentType = $("#apartmentType").val();
        var guestNo = $("#guestNo").val();
        var roomNo = $("#roomNo").val();
        var street = $("#street").val();
        var streetNo = $("#streetNo").val();
        var place = $("#place").val();
        var postalCode = $("#postalCode").val();
        var longitude = $("#latitude").val();
        var latitude = $("#latitude").val();

        $.post({
            url: 'rest/apartments/add',
            data: JSON.stringify({ apartmentType, guestNo, roomNo, street, streetNo, place, postalCode, longitude, latitude }),
            contentType: 'application/json',
            success: function (data) {
                localStorage.setItem('jwt', JSON.stringify(data.accessToken));
                showMainPage();
            },
            error: function () {
                alert("Adding new apartment failed!")
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

function guestNoValidate() {
    if ($("#guestNo").val() === "") {
        document.getElementById("guestNoCheck").innerHTML = "Invalid format!";
        document.getElementById("guestNoCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("guestNoCheck").style.visibility = "hidden";
    }

    var guestNo = $("#guestNo").val();

    if (guestNo < 1) {
        document.getElementById("guestNoCheck").innerHTML = "Minimal number of guests is 1!";
        document.getElementById("guestNoCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("guestNoCheck").style.visibility = "hidden";
    }

    return true;
}

function roomNoValidate() {
    if ($("#roomNo").val() === "") {
        document.getElementById("roomNoCheck").innerHTML = "Invalid format!";
        document.getElementById("roomNoCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("roomNoCheck").style.visibility = "hidden";
    }

    var roomNo = $("#roomNo").val();

    if (roomNo < 1) {
        document.getElementById("roomNoCheck").innerHTML = "Minimal number of rooms is 1!";
        document.getElementById("roomNoCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("roomNoCheck").style.visibility = "hidden";
    }

    return true;
}

function streetValidate() {
    if ($("#street").val() === "") {
        document.getElementById("streetCheck").innerHTML = "This field is mandatory!";
        document.getElementById("streetCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("streetCheck").style.visibility = "hidden";
    }

    return true;
}

function streetNoValidate() {
    if ($("#streetNo").val() === "") {
        document.getElementById("streetNoCheck").innerHTML = "Invalid format!";
        document.getElementById("streetNoCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("streetNoCheck").style.visibility = "hidden";
    }

    var streetNo = $("#streetNo").val();

    if (streetNo < 1) {
        document.getElementById("streetNoCheck").innerHTML = "Street number can't be smaller than 1!";
        document.getElementById("streetNoCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("streetNoCheck").style.visibility = "hidden";
    }

    return true;
}

function placeValidate() {
    if ($("#place").val() === "") {
        document.getElementById("placeCheck").innerHTML = "This field is mandatory!";
        document.getElementById("placeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("placeCheck").style.visibility = "hidden";
    }

    return true;
}

function postalCodeValidate() {
    if ($("#postalCode").val() === "") {
        document.getElementById("postalCodeCheck").innerHTML = "Invalid format!";
        document.getElementById("postalCodeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("postalCodeCheck").style.visibility = "hidden";
    }

    var postalCode = $("#postalCode").val();

    if (postalCode < 1) {
        document.getElementById("postalCodeCheck").innerHTML = "Postal code is invalid!";
        document.getElementById("postalCodeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("postalCodeCheck").style.visibility = "hidden";
    }

    return true;
}

function latitudeValidate() {
    if ($("#latitude").val() === "") {
        document.getElementById("latitudeCheck").innerHTML = "This field is mandatory!";
        document.getElementById("latitudeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("latitudeCheck").style.visibility = "hidden";
    }

    var latitude = parseFloat($("#latitude").val());
    if (isNaN(latitude)) {
        document.getElementById("latitudeCheck").innerHTML = "Latitude has to be a number!";
        document.getElementById("latitudeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("latitudeCheck").style.visibility = "hidden";
    }

    return true;
}

function longitudeValidate() {
    if ($("#longitude").val() === "") {
        document.getElementById("longitudeCheck").innerHTML = "This field is mandatory!";
        document.getElementById("longitudeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("longitudeCheck").style.visibility = "hidden";
    }

    var longitude = parseFloat($("#longitude").val());
    if (isNaN(longitude)) {
        document.getElementById("longitudeCheck").innerHTML = "Longitude has to be a number!";
        document.getElementById("longitudeCheck").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("longitudeCheck").style.visibility = "hidden";
    }

    return true;
}