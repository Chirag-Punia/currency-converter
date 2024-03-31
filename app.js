
let select = document.querySelectorAll(".dropdown select");
let flagAPi = "https://flagsapi.com/IN/flat/64.png"
let BASEURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";


for(let code in countryList){
    for (let i = 0; i < 2; i++) {
        let x = document.createElement("option");
        x.value = code;
        x.innerHTML = code;
        select[i].append(x);
        if(select[i].name === "from" && code === "USD"){
            x.selected = true;
        }
        else if(select[i].name === "to" && code === "INR"){
            x.selected = true;
        }

    }
    select.forEach((t) => {
        t.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        })
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {
    let value = document.querySelector("input").value;
    let from = select[0].value.toLowerCase();
    let to = select[1].value.toLowerCase();
    let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
    let promise = await fetch(URL);
    let response = await promise.json();
    let msg = document.querySelector(".msg")
    msg.innerText = `${value} ${from.toUpperCase()} = ${response[`${from}`][`${to}`]*value} ${to.toUpperCase()}`;

}
let btn = document.querySelector("button");

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});