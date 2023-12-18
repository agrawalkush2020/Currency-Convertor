console.log("this is working !!");
const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropDowns){
    for(let currencyCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;

        if(select.name==='from' && currencyCode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==='to' && currencyCode==="INR"){
            newOption.selected="selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    })
}

const updateFlag=(element)=>{
    let currencyCode=element.value;
    let countryCode=countryList[currencyCode];
    let newScr=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newScr;
}

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1){
        amount.value=1;
        amountVal=1;
    }

    const URL=`${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[to.value.toLowerCase()];

    let finalAmount=amountVal*rate;
    msg.innerText=`${amountVal} ${from.value}=${finalAmount} ${to.value}`
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
})