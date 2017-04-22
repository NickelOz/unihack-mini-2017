/**
 * Script gets form information from registration and validates before it's sent to index.php
 * Created by Draga on 13/12/2016.
 */

//retrieve current user information (name, email) from database
var currentUsers = [];
getCurrentUsers();

function isAlpha(str) {
    return /^[a-zA-Z ]+$/.test(str);
}

function hasWhitespace(str) {
    return str.indexOf(' ') >= 0;
}

function userNameExists(potentialUserName) {
    for (var i = 0; i < currentUsers.length; i++) {
        var currentUser = currentUsers[i].split(',');
        var currentUsername = currentUser[0];
        if (potentialUserName == currentUsername) {
            return true;
        }
    }
    return false;
}

function isInvalidEmail(potentialEmail) {
    var indexOfAt = potentialEmail.indexOf('@');
    var indexOfDot = potentialEmail.indexOf('.');
    //checks that the email contains an @ and . symbol, which are neither the first nor the last index in the string
    if ((indexOfAt < 0 || indexOfAt == 0 || indexOfAt == potentialEmail.length - 1) || (indexOfDot < 0 || indexOfDot == 0 || indexOfDot == potentialEmail.length - 1)) {
        return true;
    }
    else {
        return false;
    }
}

function emailExists(potentialEmail) {
    for (var i = 0; i < currentUsers.length; i++){
        var currentUser = currentUsers[i].split(',');
        var currentUserEmail = currentUser[1];
        if (potentialEmail == currentUserEmail){
            return true;
        }
    }
    return false;
}

function validateRegistration() {
    var hasErrors = false;
    var errorMsg = "";

    var registrationForm = document.getElementById('registration');
    var potentialName = registrationForm.name.value;
    if (potentialName.trim().length == 0 || !isAlpha(potentialName)) {
        errorMsg = "Please enter a valid name containing only letters and spaces.";
        document.getElementById('nameError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else {
        document.getElementById('nameError').innerHTML = "";
    }

    var potentialUserName = registrationForm.username.value;
    if (potentialUserName.trim().length == 0) {
        errorMsg = "Your username cannot be blank.";
        document.getElementById('userNameError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else if (hasWhitespace(potentialUserName)) {
        errorMsg = "Your username cannot contain whitespace characters";
        document.getElementById('userNameError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else if (userNameExists(potentialUserName)) {
        errorMsg = "This username has already been registered.";
        document.getElementById('userNameError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else {
        document.getElementById('userNameError').innerHTML = "";
    }

    var potentialPassword = registrationForm.password.value;
    if (potentialPassword.length < 6) {
        errorMsg = "Your password must be at least 6 characters.";
        document.getElementById('passwordError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else if (hasWhitespace(potentialPassword)) {
        errorMsg = "Your password cannot contain spaces.";
        document.getElementById('passwordError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else {
        document.getElementById('passwordError').innerHTML = "";
    }

    var potentialEmail = registrationForm.email.value;
    if (potentialEmail.trim().length == 0) {
        errorMsg = "Please enter a valid email address";
        document.getElementById('emailError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else if (hasWhitespace(potentialEmail)) {
        errorMsg = "Your email address cannot contain spaces.";
        document.getElementById('emailError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else if (isInvalidEmail(potentialEmail)) {
        errorMsg = "Please enter a valid email address.";
        document.getElementById('emailError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else if (emailExists(potentialEmail)){
        errorMsg = "This email address has already been registered.";
        document.getElementById('emailError').innerHTML = errorMsg;
        hasErrors = true;
    }
    else {
        document.getElementById('emailError').innerHTML = "";
    }

    if (hasErrors == false){
        alert("New user registered! Please log in to access dashboard.");
    }
    return !hasErrors;
}

function getCurrentUsers() {
    var allAccounts=[];

    var userAccountRequest = new XMLHttpRequest();
    userAccountRequest.onload = function () {
        if (userAccountRequest.readyState == 4 && userAccountRequest.status == 200) {
            var allUsers = this.responseText.split('|');
            //remove trailing empty element before returning
            allAccounts = allUsers.slice(0, allUsers.length - 1);
            currentUsers = allAccounts;
        }
    };
    userAccountRequest.open("GET", "../../../booking-system/php/get_accounts.php", true);
    userAccountRequest.send();
}
