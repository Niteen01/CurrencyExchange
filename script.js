const dropList = document.querySelectorAll("form select");
const getbtn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const exchangeIcon = document.querySelector("form .icon");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_code) {
    let selected;
    if (i === 0) {
      selected = currency_code === "USD" ? "selected" : "";
    } else if (i === 1) {
      selected = currency_code === "INR" ? "selected" : "";
    }

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", e => {
    changeFlag(e.target);
  });
}

function changeFlag(element) {
  for (code in country_code) {
    if (code === element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getbtn.addEventListener("click", e => {
  e.preventDefault(); //prevent form from submitting
  getExchangeRate();
});

exchangeIcon.addEventListener("click", () => {
  let tempCode = fromcurr.value;
  fromcurr.value = tocurr.value;
  tocurr.value = tempCode;
  loadFlag(fromcurr);
  loadFlag(tocurr);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  let amountVal = amount.value;

  if (amountVal == 0 || amountVal == "") {
    amount.value = "1";
    amountVal = 1;
  }

  const exchangeRateElement = document.querySelector("form .outcome");
  exchangeRateElement.innerText = "Getting exchange rate...";

  let url = `https://v6.exchangerate-api.com/v6/e3ce425802e4dbe9b7bcf309/latest/${fromcurr.value}`;

  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function(result) {
      let exchangeRate = result.conversion_rates[tocurr.value];
      let finalAmount = (amountVal * exchangeRate).toFixed(2);
      console.log(finalAmount);
      exchangeRateElement.innerText = `${amountVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
    },
    error: function(error) {
      console.log("An error occurred: ", error);
    }
  });
}
