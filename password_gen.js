const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector('[data-passwordDisplay]');
const dataCopyBtn=document.querySelector('[data-copy]');
const dataCopyMsg=document.querySelector('[data-copyMsg]');
const lowercaseCheck=document.querySelector('#uppercase');
const uppercaseCheck=document.querySelector('#lowercase');
const numbersCheck=document.querySelector('#numbers');
const symbolCheck=document.querySelector('#symbol');
const indicator=document.querySelector('[data-indicator]');
const generateBtn=document.querySelector('.generate-btn');
const allCheckBox=document.querySelectorAll('input[type=checkbox]');

let symbols='_+-*/&^%$#@!{}[]|\.:,';
let password='';
let passwordLength=10;
let checkCount=1;
handleSlider();

//set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor =color;
    indicator.style.boxShadow="10px 20px 30px gray"
}

function getRndInteger(min,max){
   Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0-9);
}
function generateLowerCase(){
    return  String.fromCharCode(getRndInteger(97,122));
}
function generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,90));
}
function generateSymbol(){
    const randNum= getRndInteger(0,symbols.length)
    return symbolCheck.charAt(randNum);
}
function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasNumber=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(symbolCheck.checked) hasSymbol=true;
    if(numbersCheck.checked) hasNumber=true;


    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicator("#0f0");     
    } else if(
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength>=6
    )   {
        setIndicator("#ff0");
    }else {
        setIndicator("#f00");
    }
}

