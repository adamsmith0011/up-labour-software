window.ipc = require("electron").ipcRenderer;
const window_url = window.location.href.split("?")[0].split("#")[0];
let registration_url1 =
    "https://www.uplmis.in/MobileApp/Forms/Registration.aspx",
  registration_url2 = "https://uplmis.in/MobileApp/Forms/Registration.aspx";

window.addEventListener("DOMContentLoaded", () => {
  // Hide logout button form portal
  let ele = document.querySelector("#lnkButtonSignOut1");
  if (ele != null) {
    ele = ele.parentElement.remove();
  }

  if (
    window_url == "https://www.uplmis.in/MobileApp/frm_Error.aspx" ||
    window_url == "https://uplmis.in/MobileApp/frm_Error.aspx"
  ) {
    window.location.href =
      "https://www.uplmis.in/MobileApp/NewUser/frm_CreateLogin.aspx";
  }

  logoutAndClose();
  enable_form_fields();

  ipc.on("window-form-data", (event, data) => {
    sessionStorage.setItem("payload", JSON.stringify(data));
    console.log(data);
    if (data.hasOwnProperty("aadhar")) {
      fillData("ContentPlaceHolder1_txtAadharNo", data.aadhar);
    }

    if (data.hasOwnProperty("mobile")) {
      fillData("ContentPlaceHolder1_txtMobileNo", data.mobile);
    }
  });

  registration_logout();
});

window.addEventListener("keydown", (event) => {
  if (event.code === "KeyC" && event.ctrlKey && event.shiftKey) {
    enable_form_fields();
  }

  if (event.code === "KeyR" && event.ctrlKey) {
    window.location.reload();
  }

  if (event.code === "KeyW" && event.ctrlKey) {
    sessionStorage.setItem("logout", true);
    javascript: __doPostBack("ctl00$lnkButtonSignOut1", "");
    ipc.send("win-close");
  }

  if (event.code === "Digit1" && event.ctrlKey) {
    ipc.send("win-hide");
  }

  if (event.code === "F11") {
    ipc.send("win-full");
  }
});

function registration_logout() {
  if (registration_url1 == window_url || registration_url2 == window_url) {
    let registration_no = document.getElementById(
        "ContentPlaceHolder1_txtRegNo"
      ),
      clint_name = document.getElementById("txtLabourEng");
    if (
      registration_no != null &&
      registration_no.value != "" &&
      clint_name != null &&
      clint_name != ""
    ) {
      let payload = {
        registrationNo: registration_no.value,
        clintName: clint_name.value,
      };

      let userData = sessionStorage.getItem("payload");
      userData = userData != null ? JSON.parse(userData) : {};

      Object.assign(payload, userData);

      sessionStorage.setItem("logout", true);
      sessionStorage.setItem("payload", JSON.stringify(payload));
      javascript: __doPostBack("ctl00$lnkButtonSignOut1", "");
    }
  }
}

function enable_form_fields() {
  enable("ContentPlaceHolder1_txtAadharNo");
  enable("txtRegDate");
  enable("ContentPlaceHolder1_txtMobile");
  enable("ContentPlaceHolder1_txtAnsh");
  enable("ContentPlaceHolder1_txtRegFeeAmt");
}

function logoutAndClose() {
  if (
    window_url ==
      "https://www.uplmis.in/MobileApp/NewUser/frm_CreateLogin.aspx" ||
    window_url == "https://uplmis.in/MobileApp/NewUser/frm_CreateLogin.aspx"
  ) {
    let logout = sessionStorage.getItem("logout");

    if (logout != null && logout == "true") {
      let payload = sessionStorage.getItem("payload");
      payload = payload != null ? payload : {};
      payload = JSON.parse(payload);

      if (
        payload.hasOwnProperty("registrationNo") &&
        payload.registrationNo != null
      ) {
        ipc.send("win-load-form-complete", payload);
      } else {
        ipc.send("win-close");
      }
    }
  }
}

function enable(id) {
  var eleman = document.getElementById(id);
  if (eleman != null) {
    eleman.removeAttribute("disabled");
  }
}

function fillData(id, data) {
  var eleman = document.getElementById(id);
  if (eleman != null) {
    eleman.value = data;
  }
}
