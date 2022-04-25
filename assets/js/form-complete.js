ipc.on("window-load-form-complete-data", (event, payload) => {
  const formData = new FormData();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

  let url =
    "http://uplabourservices.com/application/v2/update-form.php?apiToken=xVpgLX7NwKSdwYcgPyp3Lxn42CGmvY";

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((responce) => responce.json())
    .then((responce) => {
      alert(responce.message);
      ipc.send("win-close");
    });
});

function closeApp() {
  ipc.send("win-close");
}
