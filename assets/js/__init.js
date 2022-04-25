let url = "http://uplabourservices.com/application/v2/";
// let url =
// "http://localhost/root/growupnext/client/uplabourservices/server/application/";
let ApiToken = "?apiToken=xVpgLX7NwKSdwYcgPyp3Lxn42CGmvY";

const headerButton = document.querySelector("#header-button");
if (headerButton != null) {
  if (isAuthrised(false)) {
    headerButton.innerHTML = "Log Out";
  }

  headerButton.onclick = function () {
    if (isAuthrised(false)) {
      localStorage.clear();
    }
    window.location.href = "login.html";
  };
}
