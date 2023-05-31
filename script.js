const dropList = document.querySelectorAll(".drop-list select");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_code){
        console.log(currency_code)
       
        let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
// 
    }
}

