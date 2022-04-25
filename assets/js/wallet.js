// Authrised User Can access this page
isAuthrised();

// url fetch data
url += "wallet.php" + ApiToken;

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

    document.querySelector("#wallet-amount").innerHTML =
      "₹ " + response.walletAmount;

    loadTable(response.transcations);
  }
}

function loadTable(data) {
  let parent = document.getElementById("tablebody");
  let elements = "";
  data.forEach(function (item) {
    console.log(item);
    elements += `<tr>
                        <th scope="col">${item.transId}</th>
                        <td>${item.amount}</td>
                        <td>${item.message}</td>
                        <td>${item.reason}</td>
                        <td>${item.type}</td>
                        <td>${item.date}</td>
                    </tr>`;
  });

  parent.innerHTML = elements;
}
