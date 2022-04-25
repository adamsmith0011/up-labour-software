isAuthrised();

function seterror(id, error) {
  element = document.getElementById(id);
  element.innerHTML = error;
}

url += "submit_form.php" + ApiToken;

function submit_form(ele) {
  let name_input = document.querySelector("#name"),
    mobile_input = document.querySelector("#mobile"),
    aadhar_input = document.querySelector("#aadhar"),
    aadhar_front_input = document.querySelector("#aadhar-front-side-photo"),
    aadhar_back_input = document.querySelector("#aadhar-back-side-photo");

  let name = name_input.value,
    mobile = mobile_input.value,
    aadhar = aadhar_input.value,
    aadhar_front = aadhar_front_input.value,
    aadhar_back = aadhar_back_input.value;

  if (name == "") {
    name_input.style.borderColor = "red";
    seterror("name-error", "Please enter Name");
    return;
  } else {
    name_input.style.borderColor = "#ced4da";
    seterror("name-error", "");
  }

  if (mobile == "") {
    mobile_input.style.borderColor = "red";
    seterror("mobile-error", "Please enter mobile no");
    return;
  } else if (mobile.length != 10) {
    mobile_input.style.borderColor = "red";
    seterror("mobile-error", "Please enter 10 digit mobile number");
    return;
  } else {
    mobile_input.style.borderColor = "#ced4da";
    seterror("mobile-error", "");
  }

  if (aadhar == "") {
    aadhar_input.style.borderColor = "red";
    seterror("aadhar-error", "Please enter aadhar no");
    return;
  } else if (aadhar.length != 12) {
    aadhar_input.style.borderColor = "red";
    seterror("aadhar-error", "Please enter 12 digit aadhar number");
    return;
  } else {
    aadhar_input.style.borderColor = "#ced4da";
    seterror("aadhar-error", "");
  }

  if (aadhar_front_input.files.length == 0) {
    aadhar_front_input.style.borderColor = "red";
    seterror("aadhar-front-error", "Please upload aadhar front side photo");
    return;
  } else {
    aadhar_front_input.style.borderColor = "#ced4da";
    seterror("aadhar-front-error", "");
  }

  if (aadhar_back_input.files.length == 0) {
    aadhar_back_input.style.borderColor = "red";
    seterror("aadhar-back-error", "Please upload aadhar back side photo");
    return;
  } else {
    aadhar_back_input.style.borderColor = "#ced4da";
    seterror("aadhar-back-error", "");
  }

  ele.disabled = true;

  var data = new FormData();
  data.append("token", localStorage.getItem("token"));
  data.append("name", name);
  data.append("mobile", mobile);
  data.append("aadhar", aadhar);
  data.append("aadharFront", aadhar_front_input.files[0]);
  data.append("aadharBack", aadhar_front_input.files[0]);

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((response) => openWindow(response))
    .catch((err) => {
      ele.disabled = false;
    });
}

function openWindow(response) {
  if (response.status) {
    ipc.send("open-window", response.data);

    ipc.on("open-window-status", function (data) {
      window.location.reload();
    });
  } else {
    alertError(response.message);
    document.getElementById("submit-btn").disabled = false;
  }
}

function openForm() {
  ipc.send("win-load-form-complete");
}
