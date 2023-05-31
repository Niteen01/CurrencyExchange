const dropList = document.querySelectorAll(".drop-list select"),
getbtn=document.querySelector("form"),
fromcurr=document.querySelector(".from select"),
tocurr=document.querySelector(".to select");


for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_code){
       
        let selected;
        if (i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i == 1){
            selected = currency_code == "INR"? "selected" : "";
        }
       
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
// 
    }
}

getbtn.addEventListener("click" , e=>{
        e.preventDefault(); //prevent form from submitting
        getExchangeRate();
});
function getExchangeRate(){
    const amount = document.querySelector(".form input");
    let amountVal = amount.value;

    if(amountVal == 0 || amountVal == ""){
        amount.value= "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/e3ce425802e4dbe9b7bcf309/latest/${fromcurr.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[tocurr.value];
        let finalamount = (amountVal * exchangeRate).toFixed(2);
        console.log(finalamount);
        exchangeRate = document.querySelector(".outcome");
        exchangeRate.innerText= `${amountVal} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
    })
}