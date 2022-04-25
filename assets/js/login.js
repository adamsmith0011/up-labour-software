// Url
url += "login.php" + ApiToken;

function singInUser(btn) {
  btn.innerHTML = `<div class="button-loader-inline"><div class="loader"></div> Please Wait</div>`;

  // Email verifaction start
  let email = document.querySelector("#email");
  let email_error = document.querySelector("#email-error");

  if (email.value == "") {
    email.style.borderColor = "red";
    email.focus();
    email_error.innerHTML = "Enter your email address";
    btn.innerHTML = "Submit";
    return;
  } else {
    email.style.borderColor = "#ced4da";
    email_error.innerHTML = "";
    btn.innerHTML = "Submit";
  }

  //  password verifaction start
  let pass = document.querySelector("#pass");
  let pass_error = document.querySelector("#pass-error");
  if (pass.value == "") {
    pass.style.borderColor = "red";
    pass.focus();
    pass_error.innerHTML = "Enter your password";
    btn.innerHTML = "Submit";
    return;
  } else {
    pass.style.borderColor = "#ced4da";
    pass_error.innerHTML = "";
  }

  var data = new FormData();
  data.append("email", email.value);
  data.append("password", pass.value);

  fetch(url, { method: "POST", body: data })
    .then((response) => response.json())
    .then((response) => loginResponse(response))
    .catch((err) => console.log(err));
}

function loginResponse(response) {
  if (response.status) {
    console.log(response);
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      alertInfo("You are logged in successfully");
      window.location.replace("index.html");
    }
  } else {
    alertError(response.message);
  }
}

if (isAuthrised(false)) {
  window.location.replace("index.html");
}
