// Authrised User Can access this page
isAuthrised();

// url fetch data
url += "home.php" + ApiToken;

// Call server for update

if (isAuthrised()) {
  var data = new FormData();
  data.append("token", localStorage.getItem("token"));

  fetch(url, { method: "POST", body: data })
    .then((response) => response.text())
    .then((response) => user_data(response))
    .catch((err) => console.log(err));
}

function user_data(response) {
  console.log(response);
  if (typeof response === "string") {
    try {
      response = JSON.parse(response);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  if (response.status) {
    response = response.data;
    document.querySelector("#user-name").innerHTML = response.name;
    document.querySelector("#user-forms-count").innerHTML = response.formCount;
    document.querySelector("#user-join-date").innerHTML = response.joinOn;
    document.querySelector("#user-wallet-amount").innerHTML =
      "₹ " + response.walletAmount;

    loadTable(response.forms);
  }
}

function loadTable(data) {
  let parent = document.getElementById("tablebody");
  let elements = "";
  data.forEach(function (item) {
    console.log(item);
    elements += `<tr>
                        <th scope="col">${item.refId}</th>
                        <td>${item.name}</td>
                        <td>${item.phone}</td>
                        <td>${item.aadhar}</td>
                        <td>${item.applyDate}</td>
                    </tr>`;
  });

  parent.innerHTML = elements;
}
