//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times

var $username = $("#username");
var $password = $("#password");
var $confirmPassword = $("#confirm_password");

//Hide hints
$("form span").hide();

function isUsernamePresent() {
  return $username.val().length > 0;
}

function isPasswordValid() {
  return $password.val().length > 8;
}

function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

function canSubmit() {
  return isPasswordValid() && arePasswordsMatching() && isUsernamePresent();
}

function usernameEvent() {
  //Find out if text entered
  if(isUsernamePresent()) {
    //if valid, hide hint
    $username.next().hide();    
  } else {
    //else show hint
    $username.next().show();    
  }
}

function passwordEvent() {
  //Find out if password is valid
  if(isPasswordValid()) {
  //if valid, hide hint
  $password.next().hide();
  } else {
  //else show hint  
  $password.next().show(); 
  }
}

function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if(arePasswordsMatching()) {
    //if match, hide hint
    $confirmPassword.next().hide();
  } else {
    //else show hint  
    $confirmPassword.next().show();    
  }
}

function enableSubmitEvent() {
  if(canSubmit()) {
    $("#submit").prop("disabled", false); 
  } else {
    $("#submit").prop("disabled", true);
  }
  
}

//When event happens on password input
$password.focus(passwordEvent).focus(usernameEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();