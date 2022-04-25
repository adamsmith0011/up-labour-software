function isAuthrised(userLoginForce = true) {
  let token = localStorage.getItem("token");
  if (token != null) {
    return true;
  } else {
    if (userLoginForce) {
      window.location.replace("login.html");
    }
    return false;
  }
}

function appPath() {
  ipc.send();
}

function openPage(url) {
  window.location.replace(url);
}

function alertError(message, title = "Alert") {
  ipc.send("alert-box", { type: "error", title: title, message: message });
}

function alertWarning(message, title = "Warning") {
  ipc.send("alert-box", { title: "warning", title, message: message });
}

function alertInfo(message, title = "Info") {
  ipc.send("alert-box", { title: "info", title, message: message });
}
